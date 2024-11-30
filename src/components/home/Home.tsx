import { BackgroundDecorations } from "@/components/home/backgrounds-decorations"
import { AnimatedHeadline } from "@/components/home/animated-headline"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function LandingPage() {
    return (
        <div className="h-[calc(100px-64px)] bg-[#efcd9e] relative">
            <BackgroundDecorations />

            <main className="relative pl-10">
                <div className="mx-auto">
                    <section className="py-12 md:py-18 px-4 relative">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6 z-20">
                                <AnimatedHeadline />
                                <p className="text-lg md:text-xl text-gray-600">
                                    Learn anything through interactive quizzes in a fun and engaging way
                                </p>
                                <Link href='/dashboard'>
                                <Button
                                    className="bg-black hover:bg-gray-800 text-white px-6 md:px-8 py-6 text-lg rounded-full 
                            transform transition duration-300 hover:scale-105 hover:shadow-xl 
                            border-2 border-rose-500 hover:border-rose-600"
                                >
                                    Get Started
                                </Button>
                                </Link>
                                <div className="pt-6">
                                    <p className="text-xl md:text-2xl font-semibold text-rose-500">1000+ Quizzes</p>
                                    <p className="text-lg md:text-xl text-gray-600 mt-2">
                                        PASTE ANY YOUTUBE VIDEO LINK OR
                                        <br className="hidden md:block" />
                                        UPLOAD ANY VIDEO
                                    </p>
                                </div>
                            </div>

                            <div className="relative order-first lg:order-last p-4">
                                <div className="absolute top-10 bg-white right-20 rounded-2xl p-4 shadow-lg z-20">
                                    <div className="text-gray-800">Let&apos;s quiz together!</div>
                                </div>
                                <div className="relative w-full h-[300px] md:h-[500px]">
                                    <Image
                                        src="/home3.png"
                                        alt="Quiz character"
                                        width={500}
                                        height={500}
                                        className="object-contain opacity-70"
                                        priority
                                    />
                                </div>
                                
                                <div className="absolute bottom-10 right-10 bg-white rounded-full p-4 shadow-lg flex gap-2 z-20">
                                    {['🧠', '📚', '🎯', '🎮', '🏆'].map((emoji, index) => (
                                        <span key={index} className="text-2xl">{emoji}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}

