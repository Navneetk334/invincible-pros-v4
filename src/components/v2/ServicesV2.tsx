"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DOMAINS, type Domain } from "@/lib/services";
import { CATEGORY } from "@/lib/v2content";
import { useStore } from "@/store/useStore";
import { useCursor } from "@/hooks/useCursor";
import ScrambleText from "@/components/layout/ScrambleText";

function DomainPanel({ domain }: { domain: Domain }) {
  const cursor = useCursor("view", "Open");
  const content = CATEGORY[domain.id];
  return (
    <div className="relative flex h-screen w-screen shrink-0 flex-col justify-center px-6 md:px-[8vw]">
      <span
        className="text-outline pointer-events-none absolute right-4 top-[8vh] select-none font-display text-[40vw] font-bold leading-none opacity-[0.05] md:right-[6vw] md:text-[24vw]"
        aria-hidden
      >
        {domain.index}
      </span>

      <div className="relative grid w-full max-w-6xl gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: domain.color }} />
            <span className="eyebrow">Service Category {domain.index} / 06</span>
          </div>
          <h3
            className="font-display text-[14vw] font-bold uppercase leading-[0.85] tracking-tight md:text-[6.5vw]"
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
          <p className="mt-5 max-w-md text-base leading-relaxed text-paper/80">
            {content.blurb}
          </p>
          <Link
            href={`/v2/services/${content.slug}`}
            className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors"
            style={{ color: domain.color2 }}
            {...cursor}
          >
            <ScrambleText text={`Explore ${domain.title.toLowerCase()}`} /> →
          </Link>
        </div>

        <ul className="grid grid-cols-1 content-center gap-x-10 self-center border-l border-paper/15 pl-6 sm:grid-cols-2 md:pl-10">
          {domain.services.map((s) => (
            <li key={s}>
              <Link
                href={`/v2/services/${content.slug}`}
                className="group flex items-center justify-between gap-3 border-b border-paper/8 py-2.5 transition-transform duration-300 hover:translate-x-1.5"
                {...cursor}
              >
                <span className="min-w-0">
                  <span className="block font-display text-base font-medium leading-tight tracking-tight md:text-lg">
                    <ScrambleText text={s} />
                  </span>
                  <span className="mt-0.5 block truncate text-[11px] text-fog">
                    {content.serviceBlurbs[s] ?? ""}
                  </span>
                </span>
                <span
                  className="shrink-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ color: domain.color }}
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function ServicesV2() {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
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
          onToggle: (self) => setJourneyActive(self.isActive),
          onUpdate: (self) => {
            if (bar.current) bar.current.style.width = `${self.progress * 100}%`;
            const idx = Math.min(
              DOMAINS.length - 1,
              Math.floor(self.progress * DOMAINS.length),
            );
            if (idx !== activeRef.current) {
              activeRef.current = idx;
              setActive(idx);
              const d = DOMAINS[idx];
              setTheme(d.color, d.color2);
              setActiveDomain(idx);
            }
          },
        },
      });
    }, sectionEl);

    return () => ctx.revert();
  }, [setTheme, setActiveDomain, setJourneyActive]);

  return (
    <section id="services" ref={section} className="relative overflow-hidden">
      <div ref={track} className="flex flex-nowrap" style={{ width: "max-content" }}>
        {/* intro panel */}
        <div className="flex h-screen w-screen shrink-0 flex-col items-start justify-center px-6 md:px-[8vw]">
          <p className="eyebrow mb-6">What we engineer</p>
          <h2 className="font-display text-[13vw] font-bold uppercase leading-[0.85] tracking-tight md:text-[8vw]">
            One company.
            <br />
            <span className="text-outline">Every discipline.</span>
          </h2>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-fog md:text-lg">
            Six service categories, 37 capabilities, one accountable team. Keep
            scrolling to travel through everything we build.
          </p>
        </div>

        {DOMAINS.map((d) => (
          <DomainPanel key={d.id} domain={d} />
        ))}
      </div>

      {/* active indicator */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 mx-auto flex max-w-6xl items-center gap-4 px-6 md:px-[8vw]">
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog">
          {active === 0 ? "Intro" : `${DOMAINS[active - 1]?.index ?? "01"} · ${DOMAINS[active - 1]?.title ?? ""}`}
        </span>
        <span className="relative h-px flex-1 overflow-hidden bg-paper/15">
          <span ref={bar} className="absolute inset-y-0 left-0 block w-0 bg-cyan" />
        </span>
      </div>
    </section>
  );
}
