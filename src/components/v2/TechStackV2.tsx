"use client";

import { motion, useReducedMotion } from "framer-motion";
import { TECH_STACK } from "@/lib/v2content";

export default function TechStackV2() {
  const reduced = useReducedMotion();

  return (
    <section
      aria-label="Technology stack"
      className="relative border-y border-paper/10 px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow mb-6">Engineered with</p>
          <h2 className="font-display text-[9vw] font-bold uppercase leading-[0.9] tracking-tight md:text-[3.6vw]">
            A modern, proven stack.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-fog">
            We choose technologies for longevity and performance — the same
            tools that power products at global scale.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-3 gap-y-4 md:gap-x-4">
          {TECH_STACK.map((name, i) => (
            <motion.span
              key={name}
              className="rounded-full border border-paper/15 px-5 py-2.5 font-display text-lg font-medium tracking-tight text-paper/80 transition-colors hover:border-cyan hover:text-paper md:text-xl"
              initial={reduced ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 8) * 0.04 }}
            >
              {name}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
