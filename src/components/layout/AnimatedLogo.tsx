"use client";

import { useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { useCursor } from "@/hooks/useCursor";

/**
 * Neon "power-on" wordmark logo. Stutters on like a neon sign when it mounts,
 * settles into a steady cyan glow, and replays the flicker on hover. The
 * trailing dot (PROS. = Professionals) is the cyan accent.
 */
const FLICKER = {
  opacity: [0.2, 1, 0.25, 1, 0.5, 0.9, 1],
  transition: {
    duration: 1.1,
    times: [0, 0.12, 0.2, 0.32, 0.45, 0.62, 0.8],
    ease: "linear" as const,
  },
};

export default function AnimatedLogo() {
  const link = useCursor("hover");
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start(FLICKER);
  }, [controls]);

  return (
    <a
      href="#top"
      className="flex items-center"
      onPointerEnter={() => {
        link.onPointerEnter();
        controls.start(FLICKER);
      }}
      onPointerLeave={link.onPointerLeave}
    >
      <motion.span
        initial={{ opacity: 0.2 }}
        animate={controls}
        className="font-display text-sm font-bold tracking-[0.14em] text-paper"
        style={{
          textShadow:
            "0 0 6px rgba(56,225,255,0.55), 0 0 16px rgba(56,225,255,0.30)",
        }}
      >
        INVINCIBLE&nbsp;PROS<span className="text-cyan">.</span>
      </motion.span>
    </a>
  );
}
