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
        Bucket: process.env.S3_BUCKET_NAME!,
        Key: key,
        Body: Buffer.from(await file.arrayBuffer()),
        ContentType: file.type
    };

    const upload = await s3.upload(params).promise();
    return upload.Location;
}

export async function queueVideoForProcessing(userId: string, videoUrl: string, originalFilename: string){
    await videoProcessingQueue.add('processVideo', {
        userId,
        videoUrl,
        originalFilename
    });
}