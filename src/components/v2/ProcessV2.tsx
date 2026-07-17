"use client";

import { motion } from "framer-motion";
import { PROCESS } from "@/lib/v2content";

export default function ProcessV2() {
  return (
    <section id="process" className="relative px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 max-w-2xl md:mb-24">
          <p className="eyebrow mb-6">How we build</p>
          <h2 className="font-display text-[11vw] font-bold uppercase leading-[0.9] tracking-tight md:text-[4.5vw]">
            A process built for
            <br />
            <span className="gradient-text">certainty.</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-fog md:text-lg">
            Five disciplined stages take you from an ambitious idea to a live,
            supported system — with full transparency at every step.
          </p>
        </div>

        <ol className="relative border-l border-paper/12">
          {PROCESS.map((step, i) => (
            <motion.li
              key={step.n}
              className="relative grid gap-3 pb-14 pl-8 last:pb-0 md:grid-cols-[auto_1fr] md:gap-12 md:pl-12"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
            >
              <span
                className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-cyan"
                aria-hidden
              />
              <span className="font-display text-4xl font-bold leading-none text-paper/25 md:text-6xl">
                {step.n}
              </span>
              <div className="md:pt-1">
                <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-xl text-base leading-relaxed text-fog">
                  {step.body}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
