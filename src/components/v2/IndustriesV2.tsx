"use client";

import { motion } from "framer-motion";
import { INDUSTRIES } from "@/lib/v2content";

const DESC: Record<string, string> = {
  Healthcare: "Compliant platforms for clinics, labs and health-tech.",
  Education: "Learning platforms, portals and campus systems.",
  Manufacturing: "Automation, IoT and supply-chain visibility.",
  Government: "Secure, accessible citizen-facing systems.",
  Travel: "Booking engines, logistics and live tracking.",
  Finance: "Secure fintech, payments and reporting tools.",
  Retail: "Commerce, POS and inventory at scale.",
  Enterprise: "Internal tools, ERP and workflow automation.",
  Startups: "From MVP to scale, engineered to move fast.",
};

export default function IndustriesV2() {
  return (
    <section id="industries" className="relative px-6 py-28 md:px-12 md:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow mb-6">Industries we serve</p>
            <h2 className="font-display text-[10vw] font-bold uppercase leading-[0.9] tracking-tight md:text-[4vw]">
              Depth across
              <br />
              <span className="text-outline">every sector.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-fog">
            Domain fluency built over dozens of engagements — we speak your
            industry before we write a line of code.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-paper/12 bg-paper/12 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((name, i) => (
            <motion.li
              key={name}
              className="group relative overflow-hidden bg-ink p-7 transition-colors duration-300 hover:bg-paper/[0.035] md:p-8"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.06 }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-1 -top-3 select-none font-display text-6xl font-bold leading-none text-paper/[0.05] transition-colors duration-300 group-hover:text-cyan/20"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="relative">
                <h3 className="font-display text-2xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-cyan md:text-[1.7rem]">
                  {name}
                </h3>
                <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-fog">
                  {DESC[name]}
                </p>
              </div>

              <span
                aria-hidden
                className="absolute bottom-0 left-0 h-[2px] w-0 bg-cyan transition-all duration-500 ease-out group-hover:w-full"
              />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
