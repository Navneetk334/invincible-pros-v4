"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useStore } from "@/store/useStore";

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

const rise: Variants = {
  hidden: { y: "115%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 1, delay: 0.5 + i * 0.08, ease: EASE },
  }),
};

export default function HeroV3() {
  const entered = useStore((s) => s.entered);
  const coreRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Interactive core: parallax the glow toward the pointer.
  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      if (coreRef.current) {
        coreRef.current.style.transform = `translate3d(${nx * 34}px, ${ny * 26}px, 0)`;
      }
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce]);

  return (
    <section
      id="top"
      className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-40 pt-24 text-center"
    >
      {/* interactive glow core (behind the type) */}
      <div
        ref={coreRef}
        className="pointer-events-none absolute left-1/2 top-1/2 z-0"
        style={{ transition: "transform 0.5s cubic-bezier(0.33,1,0.68,1)" }}
      >
        <motion.div
          className="h-[72vh] w-[72vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, rgba(56,225,255,0.45), rgba(124,92,255,0.28) 45%, transparent 70%)",
            mixBlendMode: "screen",
          }}
          initial={{ opacity: 0, scale: 0.75 }}
          animate={entered ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.6, ease: [0.33, 1, 0.68, 1] }}
        />
      </div>

      <div className="relative z-10">
        <h1 className="font-display font-bold uppercase leading-[0.84] tracking-[-0.03em]">
          <span className="block overflow-hidden">
            <motion.span
              className="block text-[10.5vw] md:text-[8.2vw]"
              variants={rise}
              custom={0}
              initial="hidden"
              animate={entered ? "show" : "hidden"}
            >
              We Engineer
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="gradient-text block text-[10.5vw] md:text-[8.2vw]"
              variants={rise}
              custom={1}
              initial="hidden"
              animate={entered ? "show" : "hidden"}
            >
              The Future
            </motion.span>
          </span>
        </h1>
      </div>

      {/* microcopy + animated scroll cue */}
      <motion.div
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-4"
        initial={{ opacity: 0, y: 16 }}
        animate={entered ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.1, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
      >
        <p className="px-6 text-center font-mono text-[10px] uppercase tracking-[0.24em] text-fog/70">
          Software · AI · Cloud · Hardware — engineered end to end
        </p>
        <div className="flex flex-col items-center gap-2.5">
          <span className="flex h-11 w-6 justify-center rounded-full border border-paper/30 pt-2">
            <motion.span
              className="h-2 w-[3px] rounded-full bg-cyan"
              animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-fog">
            Scroll to explore
          </span>
        </div>
      </motion.div>
    </section>
  );
}
