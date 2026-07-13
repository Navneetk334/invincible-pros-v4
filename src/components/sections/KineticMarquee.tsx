"use client";

import { DOMAINS } from "@/lib/services";

const ALL = DOMAINS.flatMap((d) => d.services);

function Row({
  reverse,
  outline,
}: {
  reverse?: boolean;
  outline?: boolean;
}) {
  const items = [...ALL, ...ALL];
  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <div
        className={`flex shrink-0 items-center gap-8 pr-8 ${
          reverse ? "animate-marquee-slow-rev" : "animate-marquee-slow"
        }`}
      >
        {items.map((s, i) => (
          <span key={i} className="flex items-center gap-8">
            <span
              className={`font-display text-5xl font-bold tracking-tight md:text-7xl ${
                outline ? "text-outline" : ""
              }`}
            >
              {s}
            </span>
            <span className="text-cyan">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** Two opposing kinetic type bands — the breadth of capability, in motion. */
export default function KineticMarquee() {
  return (
    <section className="relative overflow-hidden py-24 md:py-36">
      <div className="flex flex-col gap-3 md:gap-5">
        <Row />
        <Row reverse outline />
      </div>
    </section>
  );
}
