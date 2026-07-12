"use client";

import { motion, type Variants } from "framer-motion";
import { useStore } from "@/store/useStore";
import { useCursor } from "@/hooks/useCursor";
import Magnetic from "@/components/layout/Magnetic";
import { DOMAINS } from "@/lib/services";

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
    transition: { duration: 0.8, delay: 0.9 + i * 0.1, ease: [0.33, 1, 0.68, 1] },
  }),
};

export default function Hero() {
  const entered = useStore((s) => s.entered);
  const primary = useCursor("hover");
  const secondary = useCursor("hover");

  const marquee = [...DOMAINS, ...DOMAINS];

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-between overflow-hidden pt-24 pb-6"
    >
      {/* centre stage */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <div className="overflow-hidden">
          <motion.p
            className="eyebrow"
            initial={{ y: 24, opacity: 0 }}
            animate={entered ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.45, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          >
            Digital Engineering Studio
          </motion.p>
        </div>

        <h1 className="mt-6 font-display font-bold uppercase leading-[0.82] tracking-[-0.03em]">
          <span className="block overflow-hidden">
            <motion.span
              className="block text-[15vw] md:text-[12vw]"
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
              className="block text-[15vw] md:text-[12vw]"
              variants={rise}
              custom={1}
              initial="hidden"
              animate={entered ? "show" : "hidden"}
            >
              <span className="gradient-text">Pros</span>
              <span className="align-top text-[5vw] md:text-[3.5vw]">®</span>
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
          We engineer software, intelligence, design, infrastructure, hardware
          and live experience — under one roof, for companies that intend to
          win.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          variants={fade}
          custom={1}
          initial="hidden"
          animate={entered ? "show" : "hidden"}
        >
          <Magnetic strength={0.4}>
            <a
              href="#contact"
              className="group flex items-center gap-2 rounded-full px-7 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-ink transition-transform"
              style={{
                backgroundImage:
                  "linear-gradient(100deg, var(--color-cyan), var(--color-accent-2))",
              }}
              {...primary}
            >
              Start a project
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </Magnetic>
          <a
            href="#domains"
            className="rounded-full border border-paper/25 px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-paper transition-colors hover:border-cyan hover:text-cyan"
            {...secondary}
          >
            Explore the six domains
          </a>
        </motion.div>
      </div>

      {/* bottom domain marquee */}
      <motion.div
        className="relative flex overflow-hidden border-t border-paper/10 py-5"
        initial={{ opacity: 0 }}
        animate={entered ? { opacity: 1 } : {}}
        transition={{ delay: 1.4, duration: 1 }}
      >
        <div className="flex shrink-0 items-center gap-8 whitespace-nowrap pr-8 animate-marquee">
          {marquee.map((d, i) => (
            <span key={i} className="flex items-center gap-8">
              <span
                className={`font-display text-2xl font-bold uppercase tracking-tight md:text-3xl ${
                  i % 2 ? "text-outline" : ""
                }`}
              >
                {d.title}
              </span>
              <span className="text-cyan">✦</span>
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
