'use client'

import { createQuizFromYoutube } from "@/app/actions/quizActions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Youtube } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from 'sonner'


const UploadVideo = () => {
    const [videoFile, setVideoFile] = useState<File | null>(null)
    const [youtubeUrl, setYoutubeUrl] = useState("")
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const router = useRouter();

    const handleYoutubeSubmit = async () => {
        try {
            setLoading(true)
            setProgress(0);

            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 95) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + 1;
                });
            }, 300);

            const result = await createQuizFromYoutube(youtubeUrl);

            clearInterval(interval);
            setProgress(100);

            if (result.success) {
                router.push('/dashboard/quizstart')
                toast.success('BE READY, Starting the quizzz')
            } else {
                toast.error(result.error || "Failed to create quiz")
            }
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    const handleFileUpload = async () => {
        toast.info('File updated successfully')
    }
    return (
        <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-14 bg-white/50 rounded-xl p-1">
                <TabsTrigger
                    value="upload"
                    className="rounded-lg data-[state=active]:bg-rose-500 data-[state=active]:text-white
                    transition-all duration-300 text-gray-600 hover:text-rose-500"
                >
                    Upload Video
                </TabsTrigger>
                <TabsTrigger
                    value="youtube"
                    className="rounded-lg data-[state=active]:bg-rose-500 data-[state=active]:text-white
                    transition-all duration-300 text-gray-600 hover:text-rose-500"
                >
                    YouTube Link
                </TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-6 mt-6">
                <div className="space-y-3">
                    <Label htmlFor="video" className="text-lg font-medium text-gray-700">
                        Video File
                    </Label>
                    <div className="border-2 border-dashed border-rose-300 rounded-xl p-8 
                        hover:bg-white/50 transition-colors bg-white/30">
                        <Input
                            id="video"
                            type="file"
                            accept="video/*"
                            className="cursor-pointer file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-rose-50 file:text-rose-700
                            hover:file:bg-rose-100"
                            onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                        />
                        <p className="text-sm text-gray-500 mt-4 text-center">
                            Drag and drop or click to select a video file
                        </p>
                    </div>
                </div>
                <Button
                    className="w-full bg-rose-500 hover:bg-rose-600 h-12 rounded-xl
                    transform transition-all duration-300 hover:scale-[1.02] disabled:opacity-50
                    disabled:hover:scale-100 text-lg font-medium"
                    disabled={!videoFile || loading}
                    onClick={handleFileUpload}
                >
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2" />
                            Processing...
                        </div>
                    ) : (
                        <>
                            <Upload className="mr-2 h-5 w-5" />
                            Upload & Create Quiz
                        </>
                    )}
                </Button>
            </TabsContent>

            <TabsContent value="youtube" className="space-y-6 mt-6">
                <div className="space-y-3">
                    <Label htmlFor="youtube" className="text-lg font-medium text-gray-700">
                        YouTube URL
                    </Label>
                    <Input
                        id="youtube"
                        type="url"
                        placeholder="https://youtube.com/watch?v=..."
                        value={youtubeUrl}
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                        className="h-12 rounded-xl bg-white/50 border-rose-200 focus:border-rose-500
                        focus:ring-rose-500 transition-all duration-300"
                    />
                    <p className="text-sm text-gray-500">
                        Paste a valid YouTube video URL
                    </p>
                </div>
                {loading && (
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-rose-500 h-2 rounded-full"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                )}
                <Button
                    className="w-full bg-rose-500 hover:bg-rose-600 h-12 rounded-xl
                    transform transition-all duration-300 hover:scale-[1.02] disabled:opacity-50
                    disabled:hover:scale-100 text-lg font-medium"
                    disabled={!youtubeUrl || loading}
                    onClick={handleYoutubeSubmit}
                >
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2" />
                            Generating Quiz...
                        </div>
                    ) : (
                        <>
                            <Youtube className="mr-2 h-5 w-5" />
                            Generate Quiz
                        </>
                    )}
                </Button>
            </TabsContent>
        </Tabs>
    )
}

export default UploadVideo