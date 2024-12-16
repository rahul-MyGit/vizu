import prisma from "@/db";
import { Worker } from "bullmq";
import { transcribeVideoWithWisper } from "./whisperService";
import { generateQuestions } from "@/app/actions/quizActions";

const videoProcessingWorker = new Worker('videoProcessing', async (job) => {
    const {userId, videoUrl, originalFilename} = job.data;

    try {
        const transcript = await transcribeVideoWithWisper(videoUrl)

        const questions = await generateQuestions(transcript);

        const quiz = await prisma.quiz.create({
            data: {
                title: `Quiz from Upladed video: ${originalFilename}`,
                videoUrl,
                transcript,
                userId,
                question: {
                    create: questions.map((q: any) => ({
                        content: q.question,
                        explanation: q.explanation,
                        opions: {
                            create: q.options.map((opt: any) => ({
                                content: opt.content,
                                isCorrent: opt.isCorrect
                            }))
                        }
                    }))
                }
            },
            include: {
                question: {
                    include: {
                        options: true
                    }
                }
            }
        });

        await prisma.quizattempt.create({
            data: {
                quizId: quiz.id,
                userId,
                startedAt: new Date()
            }
        });

        console.log(`Quiz created successfully for user ${userId}`);

    } catch (error) {
        console.log('Error processing video', error);
    }
}, {
    connection: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT || '6379', 10)
    },
});

videoProcessingWorker.on('failed', (job,error) => {
    console.log(`Job failed: ${job?.id}`, error);
    
});

