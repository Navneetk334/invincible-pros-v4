"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { DOMAINS } from "@/lib/services";
import { CATEGORY, servicesForCategory } from "@/lib/v2content";
import { useCursor } from "@/hooks/useCursor";

const NAV_LINK =
  "font-mono text-xs uppercase tracking-[0.2em] text-fog transition-colors hover:text-paper";

function catTitle(t: string) {
  return t.charAt(0) + t.slice(1).toLowerCase();
}

/* ---------------- Variant 1: Featured + columns ---------------- */
function Variant1({ close }: { close: () => void }) {
  const link = useCursor("hover");
  return (
    <div className="grid gap-6 md:grid-cols-[0.9fr_2.4fr]">
      <div
        className="flex flex-col justify-between rounded-xl p-6"
        style={{
          backgroundImage:
            "linear-gradient(140deg, rgba(56,225,255,0.14), rgba(124,92,255,0.14))",
        }}
      >
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan">
            Services
          </p>
          <p className="mt-3 font-display text-2xl font-bold leading-tight tracking-tight text-paper">
            37 capabilities, one team.
          </p>
        </div>
        <Link
          href="/v2/services"
          onClick={close}
          className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-paper transition-colors hover:text-cyan"
          {...link}
        >
          View all services →
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-3">
        {DOMAINS.map((d) => (
          <div key={d.id}>
            <Link
              href={`/v2/services/${CATEGORY[d.id].slug}`}
              onClick={close}
              className="mb-2.5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-paper transition-colors hover:text-cyan"
              {...link}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: d.color }} />
              {catTitle(d.title)}
            </Link>
            <ul className="space-y-1">
              {servicesForCategory(d.id).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/v2/services/${CATEGORY[d.id].slug}/${s.slug}`}
                    onClick={close}
                    className="block text-[13px] text-fog transition-all hover:translate-x-1 hover:text-cyan"
                    {...link}
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Variant 2: Icon cards ---------------- */
function Variant2({ close }: { close: () => void }) {
  const link = useCursor("hover");
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {DOMAINS.map((d) => {
        const services = servicesForCategory(d.id);
        return (
          <div
            key={d.id}
            className="rounded-xl border border-paper/12 p-5 transition-colors hover:border-paper/30"
          >
            <Link
              href={`/v2/services/${CATEGORY[d.id].slug}`}
              onClick={close}
              className="flex items-center gap-2.5"
              {...link}
            >
              <span
                className="flex h-8 w-8 items-center justify-center rounded-lg font-mono text-[11px] font-bold text-ink"
                style={{ background: d.color }}
              >
                {d.index}
              </span>
              <span>
                <span className="block font-display text-base font-semibold tracking-tight text-paper">
                  {catTitle(d.title)}
                </span>
                <span className="block text-[10px] uppercase tracking-[0.14em] text-fog">
                  {d.kicker}
                </span>
              </span>
            </Link>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {services.slice(0, 4).map((s) => (
                <Link
                  key={s.slug}
                  href={`/v2/services/${CATEGORY[d.id].slug}/${s.slug}`}
                  onClick={close}
                  className="rounded-full border border-paper/12 px-2.5 py-1 text-[11px] text-fog transition-colors hover:border-cyan hover:text-cyan"
                  {...link}
                >
                  {s.name}
                </Link>
              ))}
              {services.length > 4 && (
                <Link
                  href={`/v2/services/${CATEGORY[d.id].slug}`}
                  onClick={close}
                  className="rounded-full px-2.5 py-1 text-[11px] text-cyan"
                  {...link}
                >
                  +{services.length - 4} more
                </Link>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------- Variant 3: Interactive split ---------------- */
function Variant3({ close }: { close: () => void }) {
  const link = useCursor("hover");
  const [activeId, setActiveId] = useState(DOMAINS[0].id);
  const active = DOMAINS.find((d) => d.id === activeId)!;
  const content = CATEGORY[activeId];
  const services = servicesForCategory(activeId);

  return (
    <div className="grid gap-6 md:grid-cols-[0.9fr_2fr]">
      <ul className="border-r border-paper/10 pr-4">
        {DOMAINS.map((d) => (
          <li key={d.id}>
            <button
              type="button"
              onMouseEnter={() => setActiveId(d.id)}
              onFocus={() => setActiveId(d.id)}
              className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left transition-colors ${
                d.id === activeId ? "bg-paper/[0.05]" : "hover:bg-paper/[0.03]"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: d.color }} />
              <span
                className={`font-display text-sm font-medium tracking-tight ${
                  d.id === activeId ? "text-paper" : "text-fog"
                }`}
              >
                {catTitle(d.title)}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <div>
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog">
              {active.kicker}
            </p>
            <p className="mt-1 max-w-md text-sm text-paper/80">{content.blurb}</p>
          </div>
          <Link
            href={`/v2/services/${content.slug}`}
            onClick={close}
            className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-cyan"
            {...link}
          >
            All →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/v2/services/${content.slug}/${s.slug}`}
              onClick={close}
              className="block py-1 text-[13px] text-fog transition-colors hover:text-cyan"
              {...link}
            >
              {s.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LabMegaMenu({ variant }: { variant: 1 | 2 | 3 }) {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const link = useCursor("hover");

  const openMenu = () => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(true);
  };
  const scheduleClose = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(false), 140);
  };
  const closeNow = () => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(false);
  };

  return (
    <div className="relative">
      <header className="flex items-center justify-between border-b border-paper/10 bg-ink/70 px-6 py-4 backdrop-blur md:px-10">
        <span className="font-display text-sm font-bold tracking-[0.14em] text-white">
          INVINCIBLE&nbsp;PROS.
        </span>
        <nav className="hidden items-center gap-8 md:flex">
          <span className={NAV_LINK} {...link}>Home</span>
          <div
            className="relative"
            onMouseEnter={openMenu}
            onMouseLeave={scheduleClose}
          >
            <span className={`${NAV_LINK} ${open ? "text-paper" : ""}`} {...link}>
              Services ▾
            </span>
          </div>
          <span className={NAV_LINK} {...link}>Work</span>
          <span className={NAV_LINK} {...link}>About</span>
          <span className={NAV_LINK} {...link}>Contact</span>
        </nav>
        <span
          className="rounded-full border border-paper/20 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-paper"
          {...link}
        >
          Start a project
        </span>
      </header>

      {/* mega panel */}
      <div
        className={`absolute inset-x-0 top-full z-40 hidden px-6 md:block ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        onMouseEnter={openMenu}
        onMouseLeave={scheduleClose}
      >
        <div
          className={`mx-auto mt-3 max-w-6xl rounded-2xl border border-paper/12 bg-ink-2/95 p-6 shadow-2xl backdrop-blur transition-all duration-200 md:p-8 ${
            open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
          }`}
        >
          {variant === 1 && <Variant1 close={closeNow} />}
          {variant === 2 && <Variant2 close={closeNow} />}
          {variant === 3 && <Variant3 close={closeNow} />}
        </div>
      </div>
    </div>
  );
}
