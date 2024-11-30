'use client'

import { motion } from "framer-motion"

export function AnimatedHeadline() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.h1
      className="text-6xl font-bold text-rose-500 leading-tight"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.span className="block" variants={childVariants}>IMPROVE YOUR</motion.span>
      <motion.span className="block" variants={childVariants}>KNOWLEDGE</motion.span>
      <motion.span className="block text-5xl" variants={childVariants}>EVERY DAY</motion.span>
    </motion.h1>
  )
}

