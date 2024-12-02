"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Trophy } from 'lucide-react'
import { useEffect, useState } from "react"
import { getQuizAttempts } from "@/app/actions/userActions"
import StartQuiz from "./StartQuiz"

interface QuizAttempt {
    id: string
    quizName: string
    score: number
    totalQuestions: number
    completedAt: string
}

export default function QuizHistory() {
    const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuizAttempts = async () => {
            try {
                const attempts = await getQuizAttempts();
                if (attempts.success) {
                    setQuizAttempts(attempts?.data);
                }

            } catch (error) {
                console.error("Failed to fetch quiz attempts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizAttempts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto py-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">DASHBOARD</h1>
                <StartQuiz />
            </div>

            <div className="grid gap-6 mb-8">
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="p-6">
                        <h2 className="text-2xl font-bold mb-4">Your Quiz History</h2>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Quiz Name</TableHead>
                                    <TableHead>Score</TableHead>
                                    <TableHead>Completion Date</TableHead>
                                    <TableHead>Performance</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {quizAttempts.map((attempt) => (
                                    <TableRow key={attempt.id}>
                                        <TableCell className="font-medium">{attempt.quizName}</TableCell>
                                        <TableCell>
                                            {attempt.score}/{attempt.totalQuestions}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(attempt.completedAt).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold text-[#FF4D8D]">
                                                    {Math.round((attempt.score / attempt.totalQuestions) * 100)}%
                                                </span>
                                                {attempt.score === attempt.totalQuestions && (
                                                    <Trophy className="h-4 w-4 text-yellow-500" />
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}