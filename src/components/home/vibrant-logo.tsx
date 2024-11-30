'use client'

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export function VibrantLogo() {
  const router = useRouter()
  return (
    <motion.div
      onClick={() => router.push('/')}
      className="text-2xl font-bold text-rose-500 cursor-pointer"
      animate={{
        rotate: [-4, 1, -4],
        x: [-1, 1, -1],
      }}
      transition={{
        duration: 0.5,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      Vizuu
    </motion.div>
  )
}

