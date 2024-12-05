'use server'

import prisma from "@/db";
import { auth } from "@/lib/auth";

export async function getQuizAttempts() {
    try {

        const session = await auth();
        if (!session?.user?.id) {
            throw new Error('User not logged in');
        }

        const userId = session.user.id;

        const quizAttempts = await prisma.quizattempt.findMany({
            where: { userId: userId },
            include: {
                quiz: true,
            },
            orderBy: {
                completedAt: 'desc',
            },
        });

        const formattedAttempts = quizAttempts.map(attempt => ({
            id: attempt.id,
            quizName: attempt.quiz.title,
            score: attempt.score || 0,
            totalQuestions: 10,      //hardcoding for now 
            completedAt: attempt.completedAt ? new Date(attempt.completedAt).toISOString() : '',
        }));

        console.log(formattedAttempts);
        
        return {
            success: true,
            data: formattedAttempts
        };
    } catch (error: any) {
        console.log('Error while fetching', error);
        return {
            success: false,
            data: []
        }
    }
}