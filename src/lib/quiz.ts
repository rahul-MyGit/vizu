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


export async function fetchQuizDataUsingQuizId(id: string) {
    const apiRes = await prisma.quiz.findUnique({
        where: {
            id
        },
        include: {
            question: {
                include: {
                    options: {
                        select: {
                            id: true,
                            content: true,
                            isCorrect: true
                        }
                    }
                }
            }
        }
    })

    if(!apiRes){
        console.log(apiRes);
        
        redirect('/dashboard')
    }

    return apiRes;
}