'use server'

import { YoutubeTranscript } from "youtube-transcript";
import prisma from "@/db";
import { auth } from "@/lib/auth";


export async function createQuizFromYoutube(youtubeUrl: string) {
    const session = await auth();
    if(!session?.user?.id) throw new Error('User not loggedIn');

    try {
        const videoId = extractVideoId(youtubeUrl);
        if (!videoId) {
            throw new Error('Video not get extracted')
        }

        const transcript = await YoutubeTranscript.fetchTranscript(videoId)
        const transcriptText = transcript.map(t => t.text).join(' ');

        const questions = await generateQuestions(transcriptText);

        // const quiz = await prisma.quiz.create({})

    } catch (error) {

    }
}

function extractVideoId(url: string) {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}