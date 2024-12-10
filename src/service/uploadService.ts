import AWS from 'aws-sdk'
import { Queue } from "bullmq";

import prisma from '@/db';

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.AWS_REGEION
});

const videoProcessingQueue = new Queue('videoProcessing', {
    connection: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT || '6379', 10)
    }
});

export async function uploadFileToS3(file:File) {
    const key = `video/${Date.now()}_${file.name}`;
    const params = {
        // Bucket
    }
}