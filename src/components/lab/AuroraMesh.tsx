"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Slow-drifting colour mesh — an "always alive" ambient background. */
export default function AuroraMesh() {
  const reduce = useReducedMotion();
  const a = (x: number[], y: number[], s: number[]) =>
    reduce ? undefined : { x, y, scale: s };

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ mixBlendMode: "screen" }}
    >
      <motion.div
        className="absolute left-[-15%] top-[-25%] h-[80%] w-[65%] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(56,225,255,0.55), transparent 70%)",
        }}
        animate={a([0, 50, 0], [0, 35, 0], [1, 1.2, 1])}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-20%] top-[10%] h-[75%] w-[60%] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(124,92,255,0.5), transparent 70%)",
        }}
        animate={a([0, -45, 0], [0, 45, 0], [1, 1.25, 1])}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-30%] left-[25%] h-[70%] w-[55%] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(77,107,255,0.45), transparent 70%)",
        }}
        animate={a([0, 35, 0], [0, -35, 0], [1, 1.15, 1])}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
