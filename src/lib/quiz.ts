import prisma from "@/db";
import { redirect } from "next/navigation";


export async function getQuizById(presentUserId: string) {
    const quiz = await prisma.quiz.findFirst({
        where: {
            userId: presentUserId,
        },
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            question: {
                include: {
                    options: {
                        select: {
                            id: true,
                            content: true,
                        }
                    }
                }
            }
        }
    })
    
    return quiz
}



export async function fetchQuizDataUsingQuizAttemptId(id: string) {
    try {
        const apiRes = await prisma.quizattempt.findUnique({
            where: {
                id,
            },
            include: {
                quiz: {
                    include: {
                        question: {
                            include: {
                                options: {
                                    select: {
                                        id: true,
                                        content: true,
                                        isCorrect: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        if (!apiRes) {
            console.log(`Quiz attempt with ID ${id} not found.`);
            return null;
        }

        return {quiz: apiRes.quiz};
    } catch (error) {
        console.error("Error fetching quiz data:", error);
        throw new Error("Failed to fetch quiz data");
    }
}