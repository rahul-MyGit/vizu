'use server'

import prisma from "@/db";

export async function submitQuizAnswers(quizId: string, answers: Record<string, string>) {
    try {
        if (quizId.length < 1) {
            throw new Error('Quizid is absent');
        }
        const quiz = await prisma.quiz.findUnique({
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

        return { score, total: quiz.question.length };
    } catch (error) {
        return {
            score: 0,
            total: 10    //hardcoding it for now, later'll change it
        }
    }

}