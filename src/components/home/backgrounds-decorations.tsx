'use client'

import { motion } from "framer-motion"

export function BackgroundDecorations() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-25">
      <motion.div
        className="absolute top-20 left-[20%] w-32 h-32 bg-[#efcd9e]"
        initial={{ rotate: 0, opacity: 0.3 }}
        animate={{ rotate: 360, opacity: 0.5 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 100 100">
          <path
            d="M50 0 L65 35 L100 50 L65 65 L50 100 L35 65 L0 50 L35 35 Z"
            fill="currentColor"
          />
        </svg>
      </motion.div>
      
      <motion.div
        className="absolute bottom-40 right-[10%] w-24 h-24 bg-[#efcd9e]"
        initial={{ rotate: 0, opacity: 0.3 }}
        animate={{ rotate: -360, opacity: 0.5 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 100 100">
          <path
            d="M50 0 L65 35 L100 50 L65 65 L50 100 L35 65 L0 50 L35 35 Z"
            fill="currentColor"
          />
        </svg>
      </motion.div>
      
      <motion.div
        className="absolute top-[60%] left-[5%] w-16 h-16 bg-[#efcd9e]"
        initial={{ rotate: 0, opacity: 0.3 }}
        animate={{ rotate: 360, opacity: 0.5 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 100 100">
          <path
            d="M50 0 L65 35 L100 50 L65 65 L50 100 L35 65 L0 50 L35 35 Z"
            fill="currentColor"
          />
        </svg>
      </motion.div>
    </div>
  )
}

