"use client";

import { motion } from "framer-motion";
import { WHY_US } from "@/lib/v2content";

/**
 * WhyUs with glass / glow cards (preview / V3) — demonstrates the upgraded
 * card treatment: frosted surface, gradient top-edge, and a soft glow on hover.
 */
export default function WhyUsV3() {
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

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_US.map((w, i) => (
            <motion.div
              key={w.title}
              className="group relative overflow-hidden rounded-2xl border border-paper/12 bg-paper/[0.04] p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40 md:p-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
            >
              {/* gradient top edge */}
              <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              {/* corner glow */}
              <span className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

              <span className="relative font-mono text-[11px] text-cyan">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="relative mt-4 font-display text-xl font-semibold tracking-tight md:text-2xl">
                {w.title}
              </h3>
              <p className="relative mt-3 text-sm leading-relaxed text-fog">
                {w.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
