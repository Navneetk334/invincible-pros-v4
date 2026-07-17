"use client";

import { motion } from "framer-motion";
import { CASE_STUDIES } from "@/lib/v2content";
import { useCursor } from "@/hooks/useCursor";

export default function CaseStudiesV2() {
  const cursor = useCursor("view", "Case study");

  return (
    <section id="work" className="relative px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 max-w-2xl md:mb-24">
          <p className="eyebrow mb-6">Selected work</p>
          <h2 className="font-display text-[11vw] font-bold uppercase leading-[0.9] tracking-tight md:text-[4.5vw]">
            Systems that moved
            <br />
            <span className="gradient-text">the numbers.</span>
          </h2>
        </div>

        <div className="flex flex-col gap-6 md:gap-8">
          {CASE_STUDIES.map((c, i) => (
            <motion.article
              key={c.id}
              className="group relative overflow-hidden rounded-3xl border border-paper/12 p-8 md:p-12"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              {...cursor}
            >
              <div
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
                style={{ background: c.color }}
                aria-hidden
              />
              <div className="relative grid gap-10 md:grid-cols-[1.4fr_0.6fr] md:items-center">
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: c.color }}
                    />
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-fog">
                      {c.client} · {c.timeline}
                    </span>
                  </div>
                  <h3 className="font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                    {c.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-fog">
                    <span className="text-paper/70">Challenge — </span>
                    {c.problem}
                  </p>
                  <p className="mt-2 max-w-xl text-base leading-relaxed text-fog">
                    <span className="text-paper/70">What we built — </span>
                    {c.solution}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {c.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-paper/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-fog"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="md:border-l md:border-paper/12 md:pl-10">
                  <div
                    className="font-display text-6xl font-bold leading-none tracking-tight md:text-7xl"
                    style={{ color: c.color }}
                  >
                    {c.metric}
                  </div>
                  <p className="mt-3 font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-fog">
                    {c.metricLabel}
                  </p>
                  <p className="mt-6 text-sm leading-relaxed text-paper/70">
                    {c.outcome}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.16em] text-fog/60">
          Representative engagements. Client names anonymised on request.
        </p>
      </div>
    </section>
  );
}
