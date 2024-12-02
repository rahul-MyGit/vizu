'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"

type Option = {
    id: string
    content: string
}

type Question = {
    id: string
    content: string
    options: Option[]
}

type Quiz = {
    id: string
    title: string
    question: Question[]
}

const QuizTest = ({ quiz }: { quiz: Quiz }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({})

    const handleNext = () => {
        if (currentQuestion < quiz.question.length - 1) {
            setCurrentQuestion(prev => prev + 1)
        }
    }

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1)
        }
    }

    const handleSubmit = async () => {
        // TODO: Implement submit functionality
        console.log('Submitted answers:', selectedAnswers)
    }

    const question = quiz.question[currentQuestion]

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-rose-500">Quiz Test</h1>
                <span className="text-gray-600">
                    Question {currentQuestion + 1} of {quiz.question.length}
                </span>
            </div>

            <Card className="p-6 bg-white shadow-lg rounded-xl">
                <h2 className="text-xl font-medium mb-6">
                    {question.content}
                </h2>

                <RadioGroup
                    value={selectedAnswers[question.id]}
                    onValueChange={(value) => {
                        setSelectedAnswers(prev => ({
                            ...prev,
                            [question.id]: value
                        }))
                    }}
                    className="space-y-4"
                >
                    {question.options.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2">
                            <RadioGroupItem 
                                value={option.id} 
                                id={option.id}
                                className="text-rose-500 border-gray-300"
                            />
                            <Label 
                                htmlFor={option.id}
                                className="text-gray-700 text-lg cursor-pointer"
                            >
                                {option.content}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </Card>

            <div className="flex justify-between pt-4">
                <Button
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    variant="outline"
                    className="w-[120px]"
                >
                    Previous
                </Button>

                {currentQuestion === quiz.question.length - 1 ? (
                    <Button
                        onClick={handleSubmit}
                        className="w-[120px] bg-rose-500 hover:bg-rose-600"
                    >
                        Submit
                    </Button>
                ) : (
                    <Button
                        onClick={handleNext}
                        className="w-[120px] bg-rose-500 hover:bg-rose-600"
                        disabled={!selectedAnswers[question.id]}
                    >
                        Next
                    </Button>
                )}
            </div>

            <div className="flex justify-center gap-2 pt-4">
                {quiz.question.map((_, index) => (
                    <div
                        key={index}
                        className={`w-3 h-3 rounded-full ${
                            index === currentQuestion 
                                ? 'bg-rose-500' 
                                : selectedAnswers[quiz.question[index].id]
                                    ? 'bg-rose-200'
                                    : 'bg-gray-200'
                        }`}
                    />
                ))}
            </div>
        </div>
    )
}

export default QuizTest