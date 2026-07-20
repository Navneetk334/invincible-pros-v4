"use client";

import { TECH_LOGOS, type TechLogo } from "@/lib/techlogos";
import TechChip from "@/components/v2/TechChip";

const STRIP_CLASSES = [
  "animate-tech-a",
  "animate-tech-b",
  "animate-tech-c",
  "animate-tech-d",
];

// Interleave so each strip carries a mix of front-end / back-end / cloud / etc.
function buildStrips(count: number): TechLogo[][] {
  const strips: TechLogo[][] = Array.from({ length: count }, () => []);
  TECH_LOGOS.forEach((t, i) => strips[i % count].push(t));
  return strips;
}

function Strip({ items, cls }: { items: TechLogo[]; cls: string }) {
  const doubled = [...items, ...items];
  return (
    <div className="flex overflow-hidden">
      <div className={`flex w-max shrink-0 items-center gap-3 pr-3 ${cls}`}>
        {doubled.map((t, i) => (
          <TechChip key={`${t.name}-${i}`} tech={t} />
        ))}
      </div>
    </div>
  );
}

export default function TechStackV2() {
  const strips = buildStrips(4);

  return (
    <section
      aria-label="Technology stack"
      className="relative overflow-hidden border-y border-paper/10 py-24 md:py-32"
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

      {/* fade edges */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink to-transparent md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink to-transparent md:w-32" />
        <div className="flex flex-col gap-3 md:gap-4">
          {strips.map((items, i) => (
            <Strip key={i} items={items} cls={STRIP_CLASSES[i]} />
          ))}
        </div>
      </div>
    </section>
  );
}
