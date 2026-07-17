"use client";

import { motion } from "framer-motion";

const SECTORS = [
  "Government",
  "Healthcare",
  "Education",
  "Manufacturing",
  "Finance",
  "Enterprise",
  "Startups",
];

export default function TrustBar() {
  return (
    <section
      aria-label="Industries served"
      className="relative border-y border-paper/10 px-6 py-10 md:px-12 md:py-12"
    >
      <div className="mx-auto max-w-6xl">
        <p className="mb-6 text-center font-mono text-[10px] uppercase tracking-[0.28em] text-fog md:mb-7">
          Trusted to engineer for
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:justify-between md:gap-x-4">
          {SECTORS.map((s, i) => (
            <motion.span
              key={s}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="font-display text-base font-medium tracking-tight text-paper/70 transition-colors hover:text-cyan md:text-lg"
            >
              {s}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
