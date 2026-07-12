"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "@/store/useStore";

const WORD = "INVINCIBLE PROS.";

export default function Preloader() {
  const progress = useStore((s) => s.progress);
  const setProgress = useStore((s) => s.setProgress);
  const entered = useStore((s) => s.entered);
  const enter = useStore((s) => s.enter);
  const [done, setDone] = useState(false);

  // Simulate a cinematic boot sequence, easing toward 100.
  useEffect(() => {
    let raf = 0;
    let val = 0;
    const tick = () => {
      const remaining = 100 - val;
      val += Math.max(0.9, remaining * 0.06);
      if (val >= 100) {
        val = 100;
        setProgress(100);
        setTimeout(() => setDone(true), 350);
        return;
      }
      setProgress(Math.floor(val));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [setProgress]);

  // Auto-enter shortly after reveal.
  useEffect(() => {
    if (done) {
      const t = setTimeout(() => enter(), 900);
      return () => clearTimeout(t);
    }
  }, [done, enter]);

  return (
    <AnimatePresence>
      {!entered && (
        <motion.div
          className="fixed inset-0 z-[95] flex flex-col justify-between bg-ink px-6 py-6 md:px-12 md:py-10"
          exit={{ y: "-100%" }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* top row */}
          <div className="flex items-center justify-between">
            <span className="eyebrow">
              INVINCIBLE&nbsp;PROS<span className="text-cyan">.</span>
            </span>
            <span className="eyebrow hidden md:block">
              DIGITAL ENGINEERING
            </span>
          </div>

          {/* centre brand reveal */}
          <div className="flex flex-1 items-center justify-center">
            <h1 className="font-display text-[13vw] font-bold leading-none tracking-tight md:text-[9vw]">
              {WORD.split("").map((ch, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ y: "110%", opacity: 0 }}
                  animate={
                    done
                      ? { y: "0%", opacity: 1 }
                      : { y: "110%", opacity: 0 }
                  }
                  transition={{
                    duration: 0.7,
                    delay: i * 0.03,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                  style={{ display: ch === " " ? "inline" : "inline-block" }}
                >
                  <span className={ch === "." ? "text-cyan" : undefined}>
                    {ch === " " ? "\u00A0" : ch}
                  </span>
                </motion.span>
              ))}
            </h1>
          </div>

          {/* bottom row: counter + progress bar */}
          <div className="flex items-end justify-between gap-6">
            <span className="font-mono text-xs text-fog">
              {done ? "ENGINEERING THE FUTURE" : "INITIALISING SYSTEMS"}
            </span>
            <div className="flex flex-1 items-center gap-4">
              <div className="relative h-px flex-1 overflow-hidden bg-paper/15">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-cyan"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="font-display text-4xl font-bold tabular-nums md:text-6xl">
                {String(progress).padStart(3, "0")}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
