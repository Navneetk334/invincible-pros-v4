"use client";

import { motion, type Variants } from "framer-motion";
import { useStore } from "@/store/useStore";

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

const rise: Variants = {
  hidden: { y: "115%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 1, delay: 0.5 + i * 0.08, ease: EASE },
  }),
};

const fade: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 1 + i * 0.12, ease: [0.33, 1, 0.68, 1] },
  }),
};

export default function HeroV2() {
  const entered = useStore((s) => s.entered);

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-48 text-center"
    >
      <h1 className="font-display font-bold uppercase leading-[0.84] tracking-[-0.03em]">
        <span className="block overflow-hidden">
          <motion.span
            className="block text-[13vw] md:text-[10.5vw]"
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
            className="block text-[13vw] gradient-text md:text-[10.5vw]"
            variants={rise}
            custom={1}
            initial="hidden"
            animate={entered ? "show" : "hidden"}
          >
            The Future
          </motion.span>
        </span>
      </h1>

      <motion.p
        className="mt-8 max-w-2xl text-base leading-relaxed text-fog md:text-lg"
        variants={fade}
        custom={0}
        initial="hidden"
        animate={entered ? "show" : "hidden"}
      >
        INVINCIBLE&nbsp;PROS. is a digital engineering company building software,
        AI, cloud infrastructure, mobile apps, enterprise systems and hardware —
        turning ambitious ideas into reliable, high-performing products.
      </motion.p>

      {/* microcopy + animated scroll cue, grouped and pinned near the bottom */}
      <motion.div
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-5"
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
