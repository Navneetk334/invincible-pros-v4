"use client";

import { motion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/v2content";

export default function TestimonialsV2() {
  return (
    <section
      aria-label="Client testimonials"
      className="relative px-6 py-28 md:px-12 md:py-40"
    >
      <div className="mx-auto grid max-w-6xl gap-16 md:gap-24">
        {TESTIMONIALS.map((t, i) => (
          <motion.figure
            key={t.name}
            className={`max-w-4xl ${i % 2 === 1 ? "md:ml-auto md:text-right" : ""}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 0.7 }}
          >
            <blockquote className="font-display text-[6.5vw] font-medium leading-[1.15] tracking-tight md:text-[3vw]">
              <span className="gradient-text">&ldquo;</span>
              {t.quote}
              <span className="gradient-text">&rdquo;</span>
            </blockquote>
            <figcaption
              className={`mt-8 flex items-center gap-3 ${
                i % 2 === 1 ? "md:justify-end" : ""
              }`}
            >
              <span className="h-px w-8 bg-cyan" />
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-fog">
                {t.name} · {t.role}, {t.company}
              </span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
