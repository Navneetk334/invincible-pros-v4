"use client";

import { motion } from "framer-motion";
import { useCursor } from "@/hooks/useCursor";

/**
 * Animated brand mark — two counter-rotating geometric frames around a pulsing
 * core (a small "engineering gyroscope"), followed by the INVINCIBLE PROS.
 * wordmark. The trailing dot (PROS. = Professionals) is the cyan accent.
 */
export default function AnimatedLogo() {
  const link = useCursor("hover");

  return (
    <a href="#top" className="group flex items-center gap-2.5" {...link}>
      <span className="relative flex h-6 w-6 items-center justify-center transition-transform duration-500 group-hover:scale-110">
        <motion.span
          className="absolute inset-0 rounded-[3px] border border-cyan/70"
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        />
        <motion.span
          className="absolute inset-[4px] rounded-[2px] border border-accent-2/70"
          animate={{ rotate: -360 }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        />
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-cyan"
          animate={{ scale: [1, 1.7, 1], opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </span>
      <span className="font-display text-sm font-bold tracking-[0.14em]">
        INVINCIBLE&nbsp;PROS<span className="text-cyan">.</span>
      </span>
    </a>
  );
}
