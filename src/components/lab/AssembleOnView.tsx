"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const WORDS = ["WE", "BUILD", "SYSTEMS", "THAT", "SCALE"];

/** Words assemble into place when the block scrolls into view. */
export default function AssembleOnView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 flex flex-col items-center justify-center gap-4">
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
        {WORDS.map((word, i) => (
          <motion.span
            key={`${word}-${nonce}`}
            className="text-2xl font-bold tracking-tight text-paper sm:text-3xl"
            initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
            animate={
              inView
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: 26, filter: "blur(8px)" }
            }
            transition={{ duration: 0.5, delay: i * 0.09, ease: [0.2, 0.7, 0.2, 1] }}
          >
            {word}
          </motion.span>
        ))}
      </div>
      <button
        onClick={() => {
          setInView(false);
          setNonce((n) => n + 1);
          requestAnimationFrame(() => requestAnimationFrame(() => setInView(true)));
        }}
        className="font-mono text-[11px] uppercase tracking-[0.2em] text-fog/60 transition-colors hover:text-cyan"
      >
        Replay
      </button>
    </div>
  );
}
