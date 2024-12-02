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

    if(!quiz) redirect('/dashboard')

    return quiz
}