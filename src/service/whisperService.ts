import axios from 'axios'


export async function transcribeVideoWithWisper(videoUrl: string): Promise<string> {
    try {
        const response = await axios.post(`${process.env.WISPHER_API_URL}/transcribe`, {
            video_url: videoUrl,
        }, {
            headers: {
                Authorization: `Bearer ${process.env.WHISPER_API_KEY}`
            }
        });

        //TODO: check docs to remove ts-ignore
        if(response.data && (response.data as any).transcript) {
            return (response.data as any).transcript;
        } else{
            throw new Error('Invalid response from Whisper API');
        }
    } catch (error) {
        console.log('Error transcoding video', error);
        throw new Error('Could not generate subtitles');
    }
}

