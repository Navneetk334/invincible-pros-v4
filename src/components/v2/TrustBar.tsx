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
      className="relative border-y border-paper/10 px-6 py-8 md:px-12"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 md:flex-row md:gap-10">
        <p className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.24em] text-fog">
          Trusted to engineer for
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 md:justify-start">
          {SECTORS.map((s, i) => (
            <motion.span
              key={s}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="font-display text-sm font-medium tracking-tight text-paper/70 transition-colors hover:text-paper md:text-base"
            >
              {s}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
