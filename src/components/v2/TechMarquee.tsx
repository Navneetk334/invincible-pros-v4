"use client";

import { type TechLogo } from "@/lib/techlogos";
import TechChip from "@/components/v2/TechChip";

const STRIP_CLASSES = [
  "animate-tech-a",
  "animate-tech-b",
  "animate-tech-c",
  "animate-tech-d",
];

// Interleave so each strip carries a mix of front-end / back-end / cloud / etc.
function buildStrips(items: TechLogo[], count: number): TechLogo[][] {
  const strips: TechLogo[][] = Array.from({ length: count }, () => []);
  items.forEach((t, i) => strips[i % count].push(t));
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

/**
 * Full-bleed, auto-scrolling rows of tech chips with fade edges — the same
 * marquee used on the homepage tech-stack section. Row count adapts to the
 * number of items unless an explicit `rows` is provided.
 */
export default function TechMarquee({
  items,
  rows,
}: {
  items: TechLogo[];
  rows?: number;
}) {
  const count = Math.min(
    STRIP_CLASSES.length,
    Math.max(1, rows ?? Math.ceil(items.length / 10)),
  );
  const strips = buildStrips(items, count);

  return (
    <div className="relative">
      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink to-transparent md:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink to-transparent md:w-32" />
      <div className="flex flex-col gap-3 md:gap-4">
        {strips.map((stripItems, i) => (
          <Strip key={i} items={stripItems} cls={STRIP_CLASSES[i % STRIP_CLASSES.length]} />
        ))}
      </div>
    </div>
  );
}
