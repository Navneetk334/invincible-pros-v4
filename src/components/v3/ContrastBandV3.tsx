"use client";

import { motion } from "framer-motion";

const METRICS = [
  { v: "50+", label: "Projects delivered" },
  { v: "37", label: "Capabilities" },
  { v: "98%", label: "Operational uptime" },
];

/**
 * A near-light, full-bleed statement band (preview / V3). Breaks the
 * all-dark rhythm with a high-contrast beat mid-scroll.
 */
export default function ContrastBandV3() {
  return (
    <section
      className="relative isolate overflow-hidden px-6 py-28 text-ink md:py-40"
      style={{ background: "linear-gradient(180deg, #eef1fb 0%, #d6dcf0 100%)" }}
    >
      <div className="mx-auto max-w-5xl text-center">
        <motion.p
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50"
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
          We ship{" "}
          <span
            style={{
              backgroundImage:
                "linear-gradient(100deg, var(--color-accent), var(--color-accent-2))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            outcomes.
          </span>
        </motion.h2>
        <motion.p
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink/70 md:text-lg"
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
              <div className="mx-auto mt-3 h-px w-8 bg-ink/30" />
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/60">
                {m.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
