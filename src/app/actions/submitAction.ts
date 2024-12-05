'use server'

import prisma from "@/db";
import { revalidatePath } from "next/cache";

export async function submitQuizAnswers(quizId: string, answers: Record<string, string>) {
    let quiz;
    try {
        quiz = await prisma.quiz.findUnique({
            where: { id: quizId },
            include: {
                question: {
                    include: {
                        options: true,
                    },
                },
            },
        });
        
        if (!quiz) {
            throw new Error('Quiz data not found')
        }

        let score = 0;
        quiz.question.forEach((question) => {
            const correctOption = question.options.find((option) => option.isCorrect);
            if (correctOption && answers[question.id] === correctOption.id) {
                score++;
            }
        });

        await prisma.quizattempt.update({
            where:{
                quizId
            },
            data: {
                score: score,
                completedAt: new Date(),
            },
        });
        revalidatePath('/dashboard')
        return { score, total: quiz.question.length };
    } catch (error: any) {
        return {
            score: 0,
            total: quiz?.question.length || 10
        }
    }

}