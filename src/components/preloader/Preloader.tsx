"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useStore } from "@/store/useStore";
import { preload, smooth } from "./preloadState";

const PreloaderCanvas = dynamic(() => import("./PreloaderCanvas"), {
  ssr: false,
});

export default function Preloader() {
  const progress = useStore((s) => s.progress);
  const setProgress = useStore((s) => s.setProgress);
  const entered = useStore((s) => s.entered);
  const enter = useStore((s) => s.enter);
  const [caption, setCaption] = useState("Many Problems");
  const [logo, setLogo] = useState(0);

  const reduced = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  useEffect(() => {
    const DURATION = reduced ? 1500 : 4400;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const prog = Math.min(1, (now - start) / DURATION);
      preload.prog = prog;
      setProgress(Math.round(prog * 100));
      setCaption(prog < 0.12 ? "Many Problems" : prog < 0.5 ? "One Solution" : "");
      setLogo(smooth((prog - 0.6) / 0.18));
      if (prog >= 1) {
        setTimeout(() => enter(), 750);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [setProgress, enter, reduced]);

  return (
    <AnimatePresence>
      {!entered && (
        <motion.div
          className="fixed inset-0 z-[95] overflow-hidden bg-ink"
          exit={{ y: "-100%" }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* WebGL particle intro */}
          <div className="absolute inset-0">
            <PreloaderCanvas />
          </div>

          {/* crisp white wordmark (same static look as the header logo) */}
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center px-6"
            style={{ opacity: logo }}
          >
            <h1
              className="text-center font-display font-bold uppercase leading-[0.82] tracking-[-0.02em] text-white"
              style={{
                fontSize: "clamp(2.5rem, 13vw, 13rem)",
                transform: `scale(${0.97 + logo * 0.03})`,
              }}
            >
              Invincible
              <br />
              Pros.
            </h1>
          </div>

          {/* centred story caption */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6">
            <AnimatePresence mode="wait">
              {caption && (
                <motion.p
                  key={caption}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                  className="text-center font-display text-4xl font-bold tracking-tight md:text-6xl"
                >
                  {caption}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* top row: brand + skip */}
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-6 md:p-10">
            <span className="eyebrow">
              INVINCIBLE&nbsp;PROS<span className="text-cyan">.</span>
            </span>
            <button
              type="button"
              onClick={() => enter()}
              className="eyebrow transition-colors hover:text-paper"
            >
              Skip intro →
            </button>
          </div>

          {/* bottom row: progress */}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 md:p-10">
            <span className="hidden font-mono text-xs text-fog md:block">
              Loading experience
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
