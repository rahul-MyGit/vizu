'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Youtube } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

const UploadVideo = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [youtubeUrl, setYoutubeUrl] = useState("")

  const router = useRouter();
  return (
    <Tabs defaultValue="upload" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="upload">Upload Video</TabsTrigger>
        <TabsTrigger value="youtube">YouTube Link</TabsTrigger>
      </TabsList>
      
      <TabsContent value="upload" className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="video">Video File</Label>
          <div className="border-2 border-dashed rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <Input
              id="video"
              type="file"
              accept="video/*"
              className="cursor-pointer"
              onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
            />
            <p className="text-sm text-muted-foreground mt-2 text-center">
              Drag and drop or click to select a video file
            </p>
          </div>
        </div>
        <Button className="w-full" disabled={!videoFile} onClick={() => router.push('/dashboard/quizstart')}>
          <Upload className="mr-2 h-4 w-4" />
          Upload & Create Quiz
        </Button>
      </TabsContent>

      <TabsContent value="youtube" className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="youtube">YouTube URL</Label>
          <Input
            id="youtube"
            type="url"
            placeholder="https://youtube.com/watch?v=..."
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
          />
          <p className="text-sm text-muted-foreground">
            Paste a valid YouTube video URL
          </p>
        </div>
        <Button className="w-full" disabled={!youtubeUrl} onClick={() => router.push('/dashboard/quizstart')}>
          <Youtube className="mr-2 h-4 w-4" />
          Generate Quiz
        </Button>
      </TabsContent>
    </Tabs>
  )
}

export default UploadVideo