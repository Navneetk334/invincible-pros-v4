"use client";

import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";

export default function Hero() {
  const entered = useStore((s) => s.entered);

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-between px-6 pb-10 pt-28 md:px-12 md:pb-16"
    >
      {/* floating meta corners */}
      <motion.div
        className="flex items-start justify-between"
        initial={{ opacity: 0 }}
        animate={entered ? { opacity: 1 } : {}}
        transition={{ delay: 0.8, duration: 1 }}
      >
        <p className="max-w-[16ch] font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] text-fog">
          A futuristic digital engineering company
        </p>
        <p className="hidden text-right font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] text-fog md:block">
          38 capabilities
          <br /> 06 domains
          <br /> 01 mission
        </p>
      </motion.div>

      {/* headline */}
      <div className="pointer-events-none select-none">
        <div className="overflow-hidden">
          <motion.p
            className="eyebrow mb-4"
            initial={{ y: 30, opacity: 0 }}
            animate={entered ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          >
            Invincible Pros — Digital Engineering
          </motion.p>
        </div>

        <h1 className="text-hero font-display">
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              animate={entered ? { y: "0%" } : {}}
              transition={{ delay: 0.6, duration: 1, ease: [0.76, 0, 0.24, 1] }}
            >
              WE&nbsp;BUILD
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block gradient-text"
              initial={{ y: "110%" }}
              animate={entered ? { y: "0%" } : {}}
              transition={{
                delay: 0.72,
                duration: 1,
                ease: [0.76, 0, 0.24, 1],
              }}
            >
              THE&nbsp;FUTURE
            </motion.span>
          </span>
        </h1>

        <motion.p
          className="mt-6 max-w-md text-base leading-relaxed text-fog md:mt-8 md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={entered ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.9 }}
        >
          Software, intelligence, design, infrastructure, hardware and live
          experience — engineered under one roof for companies that intend to
          win.
        </motion.p>
      </div>

      {/* scroll cue */}
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0 }}
        animate={entered ? { opacity: 1 } : {}}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <div className="flex items-center gap-3">
          <motion.span
            className="block h-10 w-px bg-gradient-to-b from-cyan to-transparent"
            animate={{ scaleY: [1, 0.4, 1], originY: 0 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog">
            Scroll to begin
          </span>
        </div>
        <span className="hidden font-mono text-[10px] uppercase tracking-[0.24em] text-fog md:block">
          Est. — Engineering the future
        </span>
      </motion.div>
    </section>
  );
}
