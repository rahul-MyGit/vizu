'use server'

import { auth } from "@/lib/auth";
import prisma from "@/db";
import { revalidatePath } from "next/cache";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { writeFile } from "fs/promises";
import path from "path";

import { generateQuestions } from "./quizActions";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!)

export async function generateQuizFromUploadedVideo(formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error('User not logged in');
    }

    try {
        const videoFile = formData.get('video') as File;
        if (!videoFile || !(videoFile instanceof File)) {
            throw new Error('No video file uploaded');
        }

        const filename = `${Date.now()}_${videoFile.name}`; // IF EXIST
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        const filePath = path.join(uploadDir, filename);

        await writeFile(filePath, Buffer.from(await videoFile.arrayBuffer()));

        const subtitles = await generateSubtitles(videoFile);

        const questions = await generateQuestions(subtitles);

        const quiz = await prisma.quiz.create({
            data: {
                title: `Quiz From Uploaded Video: ${videoFile.name}`,
                videoUrl: filePath,
                transcript: subtitles,
                userId: session.user.id,
                question: {
                    create: questions.map((q: any) => ({
                        content: q.question,
                        explanation: q.explanation,
                        options: {
                            create: q.options.map((opt: any) => ({
                                content: opt.content,
                                isCorrect: opt.isCorrect,
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
                userId: session.user.id,
                startedAt: new Date(),
            },
        });


        revalidatePath('/dashboard/quizstart')
        revalidatePath('/dashboard')

        return {
            success: true,
            quizId: quiz.id
        }
    } catch (error: any) {
        console.error('Video upload and quiz creation error:', error);
        return {
            success: false,
            error: error.message || 'Failed to create the quiz'
        }
    }
}

async function generateSubtitles(videoFile: File): Promise<string> {
    try {
        // TODO: 
        // 1. Speech-to-text API (Whisper)
        // 2. Extract audio from video
        // 3. Process the audio to generate subtitles

        const prompt = `Generate a comprehensive summary or transcript for a video about ${videoFile.name}. 
        Provide a detailed overview that captures the key points, main ideas, and important details.`;
        
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        
        return text;
    } catch (error) {
        console.error('Subtitle generation error:', error);
        throw new Error('Could not generate subtitles');
    }
}