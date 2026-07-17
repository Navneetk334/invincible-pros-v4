"use client";

import { motion, type Variants } from "framer-motion";
import { useStore } from "@/store/useStore";
import { useCursor } from "@/hooks/useCursor";
import Magnetic from "@/components/layout/Magnetic";

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
  const openContact = useStore((s) => s.openContact);
  const primary = useCursor("hover");
  const secondary = useCursor("hover");

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16 text-center"
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

      <motion.div
        className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        variants={fade}
        custom={1}
        initial="hidden"
        animate={entered ? "show" : "hidden"}
      >
        <Magnetic strength={0.4}>
          <button
            type="button"
            onClick={() => openContact("flow")}
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
          </button>
        </Magnetic>
        <a
          href="#work"
          className="rounded-full border border-paper/25 px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-paper transition-colors hover:border-cyan hover:text-cyan"
          {...secondary}
        >
          See our work
        </a>
      </motion.div>

      <motion.p
        className="mt-10 font-mono text-[10px] uppercase tracking-[0.24em] text-fog/70"
        initial={{ opacity: 0 }}
        animate={entered ? { opacity: 1 } : {}}
        transition={{ delay: 1.5, duration: 1 }}
      >
        Software · AI · Cloud · Hardware — engineered end to end
      </motion.p>
    </section>
  );
}
