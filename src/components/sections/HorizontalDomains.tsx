"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DOMAINS, type Domain } from "@/lib/services";
import { useStore } from "@/store/useStore";
import { useCursor } from "@/hooks/useCursor";

function DomainPanel({ domain, i }: { domain: Domain; i: number }) {
  const cursor = useCursor("view", "Domain");
  return (
    <div className="relative flex h-screen w-screen shrink-0 flex-col justify-center px-6 md:px-[8vw]">
      {/* giant ghost index */}
      <span
        className="pointer-events-none absolute right-4 top-[8vh] select-none font-display text-[42vw] font-bold leading-none opacity-[0.06] md:right-[6vw] md:text-[26vw]"
        aria-hidden
      >
        {domain.index}
      </span>

      <div className="relative grid w-full max-w-6xl gap-10 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: domain.color }}
            />
            <span className="eyebrow">
              Domain {domain.index} / 06
            </span>
          </div>
          <h3
            className="font-display text-[15vw] font-bold uppercase leading-[0.85] tracking-tight md:text-[7vw]"
            style={{
              backgroundImage: `linear-gradient(100deg, #fff, ${domain.color2})`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {domain.title}
          </h3>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-fog">
            {domain.kicker}
          </p>
          <p className="mt-6 max-w-md text-base leading-relaxed text-paper/80 md:text-lg">
            {domain.statement}
          </p>
        </div>

        <ul className="flex flex-col justify-center gap-1 border-l border-paper/15 pl-6 md:pl-10">
          {domain.services.map((s, k) => (
            <li
              key={s}
              className="group flex items-baseline gap-4 py-1.5 transition-transform duration-300 hover:translate-x-2"
              {...cursor}
            >
              <span className="font-mono text-[10px] text-fog">
                {String(k + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-xl font-medium tracking-tight md:text-3xl">
                {s}
              </span>
              <span
                className="ml-auto opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ color: domain.color }}
              >
                →
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* progress footer */}
      <div className="absolute bottom-8 left-6 hidden items-center gap-4 md:left-[8vw] md:flex">
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog">
          {i === 0 ? "Drag / scroll →" : ""}
        </span>
      </div>
    </div>
  );
}

/**
 * Signature interaction: a horizontally-pinned journey. As you scroll, the
 * track slides sideways through the six domains and the whole plasma backdrop
 * lerps to each domain's colour.
 */
export default function HorizontalDomains() {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const setTheme = useStore((s) => s.setTheme);
  const setActiveDomain = useStore((s) => s.setActiveDomain);
  const setJourneyActive = useStore((s) => s.setJourneyActive);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const sectionEl = section.current;
    const trackEl = track.current;
    if (!sectionEl || !trackEl) return;

    const ctx = gsap.context(() => {
      const distance = () => trackEl.scrollWidth - window.innerWidth;
      gsap.to(trackEl, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionEl,
          start: "top top",
          end: () => "+=" + distance(),
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // only mark the journey active while this section is pinned
          onToggle: (self) => setJourneyActive(self.isActive),
          onUpdate: (self) => {
            const idx = Math.min(
              DOMAINS.length - 1,
              Math.floor(self.progress * DOMAINS.length),
            );
            const d = DOMAINS[idx];
            setTheme(d.color, d.color2);
            setActiveDomain(idx);
          },
        },
      });
    }, sectionEl);

    return () => ctx.revert();
  }, [setTheme, setActiveDomain, setJourneyActive]);

  return (
    <section id="domains" ref={section} className="relative overflow-hidden">
      <div
        ref={track}
        className="flex flex-nowrap"
        style={{ width: "max-content" }}
      >
        {/* intro panel */}
        <div className="flex h-screen w-screen shrink-0 flex-col items-start justify-center px-6 md:px-[8vw]">
          <h2 className="font-display text-[13vw] font-bold uppercase leading-[0.85] tracking-tight md:text-[8vw]">
            One company.
            <br />
            <span className="text-outline">Every discipline.</span>
          </h2>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-fog md:text-lg">
            Most companies hand you a fragment. We engineer the whole system.
            Keep scrolling to travel sideways through all services.
          </p>
        </div>

        {DOMAINS.map((d, i) => (
          <DomainPanel key={d.id} domain={d} i={i} />
        ))}
      </div>
    </section>
  );
}
