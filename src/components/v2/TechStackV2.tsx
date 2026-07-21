"use client";

import { TECH_LOGOS } from "@/lib/techlogos";
import TechMarquee from "@/components/v2/TechMarquee";

export default function TechStackV2() {
  return (
    <section
      aria-label="Technology stack"
      className="relative overflow-hidden py-24 md:py-32"
    >
      <div className="mx-auto mb-12 max-w-6xl px-6 md:mb-16 md:px-12">
        <p className="eyebrow mb-6">Engineered with</p>
        <h2 className="font-display text-[9vw] font-bold uppercase leading-[0.9] tracking-tight md:text-[3.6vw]">
          A modern, proven stack.
        </h2>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-fog">
          Eighty-plus technologies across the front-end, back-end, mobile,
          cloud, data, AI and hardware — the same tools that power products at
          global scale.
        </p>
      </div>

      <TechMarquee items={TECH_LOGOS} rows={4} />
    </section>
  );
}
