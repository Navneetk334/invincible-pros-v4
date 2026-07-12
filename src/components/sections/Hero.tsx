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

export default function Hero() {
  const entered = useStore((s) => s.entered);

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-between px-6 pb-8 pt-28 md:px-10 md:pb-12"
    >
      {/* meta row */}
      <motion.div
        className="flex items-start justify-between"
        initial={{ opacity: 0 }}
        animate={entered ? { opacity: 1 } : {}}
        transition={{ delay: 0.9, duration: 1 }}
      >
        <p className="max-w-[20ch] font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-fog">
          Digital engineering studio — building the systems the future runs on
        </p>
        <p className="hidden text-right font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-fog md:block">
          38 capabilities
          <br />
          06 domains
          <br />
          ∞ ambition
        </p>
      </motion.div>

      {/* giant left-aligned wordmark */}
      <div className="select-none">
        <h1 className="font-display font-bold uppercase leading-[0.82] tracking-[-0.03em]">
          <span className="block overflow-hidden">
            <motion.span
              className="block text-[19vw] md:text-[16vw]"
              variants={rise}
              custom={0}
              initial="hidden"
              animate={entered ? "show" : "hidden"}
            >
              Invincible
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block text-[19vw] md:text-[16vw]"
              variants={rise}
              custom={1}
              initial="hidden"
              animate={entered ? "show" : "hidden"}
            >
              <span className="gradient-text">Pros</span>
              <span className="align-top text-[6vw] md:text-[4vw]">®</span>
            </motion.span>
          </span>
        </h1>

        <motion.div
          className="mt-6 flex flex-col gap-6 md:mt-8 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={entered ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.9 }}
        >
          <p className="max-w-md text-base leading-relaxed text-fog md:text-lg">
            Software, intelligence, design, infrastructure, hardware and live
            experience — engineered under one roof for companies that intend to
            win.
          </p>

          <div className="flex items-center gap-3">
            <motion.span
              className="block h-10 w-px bg-gradient-to-b from-paper to-transparent"
              animate={{ scaleY: [1, 0.4, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "top" }}
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog">
              Scroll to enter
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
