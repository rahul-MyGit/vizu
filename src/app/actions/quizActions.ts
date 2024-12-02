'use server'

import { YoutubeTranscript } from "youtube-transcript";
import prisma from "@/db";
import { auth } from "@/lib/auth";
import OpenAI from 'openai';

type QuizQuestion = {
    question: string;
    options: { content: string; isCorrect: boolean; }[];
    explanation: string;
}

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function createQuizFromYoutube(youtubeUrl: string) {
    const session = await auth();
    if (!session?.user?.id) throw new Error('User not loggedIn');

    try {
        const videoId = extractVideoId(youtubeUrl);
        if (!videoId) {
            throw new Error('Video not get extracted')
        }

        const transcript = await YoutubeTranscript.fetchTranscript(videoId)
        const transcriptText = transcript.map(t => t.text).join(' ');

        const questions = await generateQuestions(transcriptText);

        const quiz = await prisma.quiz.create({
            data: {
                title: 'Quiz From Youtube',
                videoUrl: youtubeUrl,
                transcript: transcriptText,
                userId: session?.user?.id,
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
        })

    } catch (error) {

    }
}

function extractVideoId(url: string) {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

async function generateQuestions(transcript: string) : Promise<QuizQuestion[]> {
    const prompt = `
    Create 10 multiple choice questions based on this transcript. 
    Format your response as a JSON array of objects with the following structure:
    {
      "question": "question text",
      "options": [
        { "content": "option text", "isCorrect": boolean }
      ],
      "explanation": "explanation for the correct answer"
    }
    Each question should have exactly 4 options with only one correct answer.
    Transcript: ${transcript.substring(0, 4000)} // Limiting transcript length
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  const content = response.choices[0].message.content || '[]';
    return JSON.parse(content);
}