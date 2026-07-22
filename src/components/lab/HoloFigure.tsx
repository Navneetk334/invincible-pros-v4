"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

/**
 * HOLO — a holographic wireframe head. Floats, flickers with scanlines, and
 * rotates slightly toward the cursor like a projected AI guide.
 */
export default function HoloFigure() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    const wrap = wrapRef.current;
    const head = headRef.current;
    if (!wrap || !head) return;
    const r = wrap.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
    const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
    head.style.transform = `perspective(600px) rotateY(${dx * 18}deg) rotateX(${-dy * 12}deg)`;
  };
  const reset = () => {
    if (headRef.current)
      headRef.current.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg)";
  };

  return (
    <div
      ref={wrapRef}
      onPointerMove={move}
      onPointerLeave={reset}
      className="absolute inset-0 flex items-center justify-center"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          ref={headRef}
          className="relative transition-transform duration-200 ease-out"
          style={{ filter: "drop-shadow(0 0 12px rgba(56,225,255,0.6))" }}
        >
          <motion.div
            animate={{ opacity: [0.85, 1, 0.9, 1, 0.85] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="120" height="140" viewBox="0 0 120 140" fill="none" stroke="#38e1ff" strokeWidth="1.4">
              <path d="M40 24 Q60 8 80 24 Q92 36 90 62 Q88 92 60 108 Q32 92 30 62 Q28 36 40 24Z" fill="rgba(56,225,255,0.05)" />
              <path d="M30 58 H90" opacity="0.5" />
              <path d="M60 26 V104" opacity="0.4" />
              <ellipse cx="48" cy="58" rx="7" ry="4" fill="rgba(56,225,255,0.35)" />
              <ellipse cx="72" cy="58" rx="7" ry="4" fill="rgba(56,225,255,0.35)" />
              <path d="M50 78 Q60 84 70 78" />
              <path d="M60 108 V124 M44 124 H76" opacity="0.6" />
            </svg>
          </motion.div>
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(56,225,255,0.18) 0px, rgba(56,225,255,0.18) 1px, transparent 1px, transparent 4px)",
              mixBlendMode: "screen",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
