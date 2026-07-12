"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Domain } from "@/lib/services";
import { useStore } from "@/store/useStore";
import ServiceRow from "./ServiceRow";

export default function DomainChapter({
  domain,
  order,
}: {
  domain: Domain;
  order: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const setTheme = useStore((s) => s.setTheme);
  const setActiveDomain = useStore((s) => s.setActiveDomain);

  useEffect(() => {
    if (inView) {
      setTheme(domain.color, domain.color2);
      setActiveDomain(order);
    }
  }, [inView, domain.color, domain.color2, order, setTheme, setActiveDomain]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center px-6 py-32 md:px-12"
    >
      {/* giant ghost index */}
      <span
        className="text-outline pointer-events-none absolute -top-4 right-4 select-none font-display text-[34vw] font-bold leading-none opacity-[0.06] md:right-10 md:text-[24vw]"
        aria-hidden
      >
        {domain.index}
      </span>

      <div className="relative mx-auto grid w-full max-w-6xl gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
        {/* left: identity */}
        <div className="md:sticky md:top-32 md:self-start">
          <div className="mb-6 flex items-center gap-3">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: domain.color }}
            />
            <span className="eyebrow">Domain {domain.index}</span>
          </div>

          <h2 className="text-section font-display">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              style={{
                backgroundImage: `linear-gradient(100deg, #fff, ${domain.color2})`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {domain.title}
            </motion.span>
          </h2>

          <p className="mt-4 font-mono text-xs uppercase tracking-[0.22em] text-fog">
            {domain.kicker}
          </p>
          <p className="mt-6 max-w-md text-base leading-relaxed text-fog/90 md:text-lg">
            {domain.statement}
          </p>

          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-fog">
            {domain.services.length} capabilities
          </p>
        </div>

        {/* right: the capabilities as an interactive list */}
        <ul className="border-t border-paper/10">
          {domain.services.map((s, i) => (
            <ServiceRow key={s} name={s} index={i} color={domain.color} />
          ))}
        </ul>
      </div>
    </section>
  );
}
