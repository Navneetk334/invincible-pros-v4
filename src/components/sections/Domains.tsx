"use client";

import { motion } from "framer-motion";
import { DOMAINS, TOTAL_SERVICES } from "@/lib/services";
import DomainChapter from "./DomainChapter";

export default function Domains() {
  return (
    <div id="domains">
      {/* chapter break intro */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center md:px-12">
        <motion.p
          className="eyebrow mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {TOTAL_SERVICES} capabilities — 06 domains
        </motion.p>

        <h2 className="text-section font-display">
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            >
              ONE&nbsp;COMPANY.
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block text-outline"
              initial={{ y: "110%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.08, ease: [0.76, 0, 0.24, 1] }}
            >
              EVERY&nbsp;DISCIPLINE.
            </motion.span>
          </span>
        </h2>

        <motion.p
          className="mt-8 max-w-xl text-base leading-relaxed text-fog md:text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Most companies hand you a fragment. We engineer the whole system.
          Travel through the six domains that make INVINCIBLE PROS whole.
        </motion.p>

        <motion.span
          className="mt-16 font-mono text-[10px] uppercase tracking-[0.24em] text-fog"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ↓ keep scrolling
        </motion.span>
      </section>

      {DOMAINS.map((d, i) => (
        <DomainChapter key={d.id} domain={d} order={i} />
      ))}
    </div>
  );
}
