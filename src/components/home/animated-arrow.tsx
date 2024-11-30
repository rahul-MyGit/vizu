'use client'

import { motion } from "framer-motion"

export function AnimatedArrow() {
  const pathVariants = {
    initial: {
      pathLength: 0,
      opacity: 0
    },
    animate: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 3
      }
    }
  }

  return (
    <motion.svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      className="absolute top-1/2 right-0 -translate-y-1/2 z-10"
    >
      <motion.path
        d="M 40 40 C 80 40, 120 80, 120 120 L 160 120 M 160 120 L 140 100 M 160 120 L 140 140"
        fill="transparent"
        stroke="#FF2D55"
        strokeWidth="2"
        variants={pathVariants}
        initial="initial"
        animate="animate"
      />
    </motion.svg>
  )
}

