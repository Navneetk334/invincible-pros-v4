"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Ambient light layer (preview / V3). Slow-drifting colour glows blended over
 * the opaque WebGL canvas to add depth and atmosphere beyond the existing
 * grain + vignette. Sits above the canvas (z-0) and below content (z-10).
 */
export default function AtmosphereV3() {
  const reduce = useReducedMotion();

  const blob = (extra: Record<string, number[]>) =>
    reduce ? undefined : extra;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[5] overflow-hidden"
      style={{ mixBlendMode: "screen" }}
    >
      <motion.div
        className="absolute -left-[10%] top-[-12%] h-[55vw] w-[55vw] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(56,225,255,0.30), transparent 70%)",
        }}
        animate={blob({ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.12, 1] })}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-15%] top-[28%] h-[52vw] w-[52vw] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(124,92,255,0.28), transparent 70%)",
        }}
        animate={blob({ x: [0, -50, 0], y: [0, 60, 0], scale: [1, 1.15, 1] })}
        transition={{ duration: 27, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-18%] left-[18%] h-[48vw] w-[48vw] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(77,107,255,0.24), transparent 70%)",
        }}
        animate={blob({ x: [0, 40, 0], y: [0, -40, 0], scale: [1, 1.1, 1] })}
        transition={{ duration: 31, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
