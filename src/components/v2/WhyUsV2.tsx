"use client";

import { motion } from "framer-motion";
import { WHY_US } from "@/lib/v2content";

export default function WhyUsV2() {
  return (
    <section
      aria-label="Why choose us"
      className="relative px-6 py-28 md:px-12 md:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-2xl">
          <p className="eyebrow mb-6">Why INVINCIBLE&nbsp;PROS.</p>
          <h2 className="font-display text-[10vw] font-bold uppercase leading-[0.9] tracking-tight md:text-[4vw]">
            One partner.
            <br />
            <span className="gradient-text">Total accountability.</span>
          </h2>
        </div>

        <div className="grid gap-px border border-paper/12 bg-paper/12 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_US.map((w, i) => (
            <motion.div
              key={w.title}
              className="bg-ink p-8 md:p-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
            >
              <span className="font-mono text-[11px] text-cyan">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold tracking-tight md:text-2xl">
                {w.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-fog">{w.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
