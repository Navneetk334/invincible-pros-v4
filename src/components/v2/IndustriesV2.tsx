"use client";

import { motion } from "framer-motion";
import { INDUSTRIES } from "@/lib/v2content";

export default function IndustriesV2() {
  return (
    <section id="industries" className="relative px-6 py-28 md:px-12 md:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-2xl">
          <p className="eyebrow mb-6">Industries we serve</p>
          <h2 className="font-display text-[10vw] font-bold uppercase leading-[0.9] tracking-tight md:text-[4vw]">
            Depth across
            <br />
            <span className="text-outline">every sector.</span>
          </h2>
        </div>

        <ul className="grid grid-cols-1 border-t border-paper/12 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((name, i) => (
            <motion.li
              key={name}
              className="group flex items-center justify-between border-b border-paper/12 py-6 sm:odd:border-r sm:odd:border-paper/12 sm:odd:pr-8 sm:even:pl-8 lg:pl-0 lg:pr-8"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.06 }}
            >
              <span className="font-display text-2xl font-medium tracking-tight transition-colors group-hover:text-cyan md:text-3xl">
                {name}
              </span>
              <span className="font-mono text-[11px] text-fog/60">
                {String(i + 1).padStart(2, "0")}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
