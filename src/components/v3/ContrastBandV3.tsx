"use client";

import { motion } from "framer-motion";

const METRICS = [
  { v: "50+", label: "Projects delivered" },
  { v: "37", label: "Capabilities" },
  { v: "98%", label: "Operational uptime" },
];

/**
 * "The difference" statement + headline metrics (preview / V3). Sits in the
 * dark theme — a bold beat where the stats section used to be.
 */
export default function ContrastBandV3() {
  return (
    <section className="relative overflow-hidden border-y border-paper/10 px-6 py-28 md:py-40">
      <div className="mx-auto max-w-5xl text-center">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          The difference
        </motion.p>
        <motion.h2
          className="mt-6 font-display text-[10vw] font-bold uppercase leading-[0.95] tracking-tight md:text-[4.2vw]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.05 }}
        >
          We don&rsquo;t ship features.
          <br />
          We ship <span className="gradient-text">outcomes.</span>
        </motion.h2>
        <motion.p
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-fog md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          One accountable team owns the whole stack — so what we design is what
          ships, and what ships is what moves your numbers.
        </motion.p>

        <div className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-6">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.08 }}
            >
              <div className="font-display text-4xl font-bold tracking-tight md:text-5xl">
                {m.v}
              </div>
              <div className="mx-auto mt-3 h-px w-8 bg-cyan" />
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-fog">
                {m.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
