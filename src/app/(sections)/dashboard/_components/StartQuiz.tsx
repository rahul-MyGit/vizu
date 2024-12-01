'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import UploadVideo  from "./UploadVideo"
import { useState } from "react"

const StartQuiz = () => {
    const [startQuiz, setStartQuiz] = useState(false);

    return (
        <>
            <div>
                <Button 
                    onClick={() => setStartQuiz(true)}
                    className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-full
                    transform transition-all duration-300 hover:scale-105 hover:shadow-lg
                    font-medium text-lg"
                >
                    Start Quiz
                </Button>
            </div>

            <Dialog open={startQuiz} onOpenChange={setStartQuiz}>
                <DialogContent className="sm:max-w-[500px] bg-[#feeed9] border-none shadow-xl
                    rounded-2xl p-6">
                    <DialogHeader className="space-y-4">
                        <DialogTitle className="text-3xl font-bold text-rose-500 text-center">
                            Create New Quiz
                        </DialogTitle>
                        <DialogDescription className="text-gray-600 text-center text-lg leading-relaxed">
                            Choose how you want to create your quiz. You can either upload a video file 
                            or provide a YouTube link, but not both.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-6">
                        <UploadVideo />
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default StartQuiz