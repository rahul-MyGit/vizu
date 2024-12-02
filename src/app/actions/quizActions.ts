'use server'

import { YoutubeTranscript } from "youtube-transcript";
import prisma from "@/db";
import { auth } from "@/lib/auth";
// import OpenAI from 'openai';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";

type QuizQuestion = {
    question: string;
    options: { content: string; isCorrect: boolean; }[];
    explanation: string;
}

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });
const genAI = new GoogleGenerativeAI(process.env.GOOLGE_GEMINI_API_KEY!)

export async function createQuizFromYoutube(youtubeUrl: string) {
    const session = await auth();
    if (!session?.user?.id) throw new Error('User not loggedIn');

    try {
        const videoId = extractVideoId(youtubeUrl);
        if (!videoId) {
            throw new Error('Video id not get extracted')
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
        });

        await prisma.quizattempt.create({
          data: {
              quizId: quiz.id,
              userId: quiz.userId,
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
        console.log(error);
        return {
            success: false,
            error: 'Failed to create the quiz'
        }
    }
}

function extractVideoId(url: string) {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

async function generateQuestions(transcript: string): Promise<QuizQuestion[]> {
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    const prompt = `
    Based on the transcript about creating a video subtitle generator using AI and Whisper, create 10 multiple-choice quiz questions that test comprehension and key details.

    IMPORTANT REQUIREMENTS:
    - Each question must have exactly 4 answer options
    - Only ONE option per question should be marked as correct (isCorrect: true)
    - Cover different aspects of the video: technical details, approaches, tools, and concepts
    - Explanations should be informative and reference specific parts of the transcript
    
    Provide the response in the following STRICT JSON format:
    [
      {
        "question": "String with the quiz question",
        "options": [
          {"content": "Option 1 text", "isCorrect": false},
          {"content": "Option 2 text", "isCorrect": true},
          {"content": "Option 3 text", "isCorrect": false},
          {"content": "Option 4 text", "isCorrect": false}
        ],
        "explanation": "Detailed explanation of why the correct answer is right"
      }
      // ... 9 more questions following same structure
    ]

    Transcript Context: ${transcript.substring(0, 4000)}
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || 
                      text.match(/```\n([\s\S]*?)\n```/) ||
                      [text, text];
    
    const content = jsonMatch[1].trim();
    
    const parsedQuestions = JSON.parse(content);
    
    const validQuestions = parsedQuestions.filter((q: any) => 
      q.question && 
      q.options && 
      q.options.length === 4 && 
      q.options.filter((opt: any) => opt.isCorrect).length === 1 &&
      q.explanation
    );

    if (validQuestions.length === 0) {
      throw new Error('No valid questions generated');
    }

    return validQuestions;

  } catch (error) {
    console.error('Error generating questions:', error);
    
    return [
      {
        question: "What is the main purpose of the video?",
        options: [
          {"content": "Teaching Docker", "isCorrect": false},
          {"content": "Creating a video subtitle generator", "isCorrect": true},
          {"content": "Explaining Python programming", "isCorrect": false},
          {"content": "Reviewing AI tools", "isCorrect": false}
        ],
        explanation: "The video demonstrates how to create an AI-powered video subtitle generator using Whisper AI."
      }
    ];
  }
}