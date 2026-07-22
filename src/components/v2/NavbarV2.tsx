"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { DOMAINS } from "@/lib/services";
import { CATEGORY, CONTACT, servicesForCategory } from "@/lib/v2content";
import { useStore } from "@/store/useStore";
import { useCursor } from "@/hooks/useCursor";
import Magnetic from "@/components/layout/Magnetic";
import AnimatedLogo from "@/components/layout/AnimatedLogo";
import ScrambleText from "@/components/layout/ScrambleText";

const NAV_LINK =
  "group relative font-mono text-xs uppercase tracking-[0.2em] text-fog transition-colors hover:text-paper";
const UNDERLINE =
  "absolute -bottom-1 left-0 h-px w-0 bg-cyan transition-all duration-300 group-hover:w-full";
const MOBILE_LINK =
  "py-3 font-display text-2xl font-medium tracking-tight text-paper transition-colors hover:text-cyan";

export default function NavbarV2() {
  const entered = useStore((s) => s.entered);
  const openContact = useStore((s) => s.openContact);
  const link = useCursor("hover");

  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setServicesOpen(false), 140);
  };
  const closeNow = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(false);
  };

  // Mobile drawer: lock background scroll + Escape to close.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileServices(false);
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 md:px-12"
        initial={{ y: -40, opacity: 0 }}
        animate={entered ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
      >
        <AnimatedLogo href="/" />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          <Link href="/" className={NAV_LINK} {...link}>
            <ScrambleText text="Home" />
            <span className={UNDERLINE} />
          </Link>

          <div
            className="relative flex items-center"
            onMouseEnter={openMenu}
            onMouseLeave={scheduleClose}
            onFocus={openMenu}
            onBlur={scheduleClose}
            onKeyDown={(e) => {
              if (e.key === "Escape") closeNow();
            }}
          >
            <Link
              href="/services"
              className={NAV_LINK}
              aria-haspopup="true"
              aria-expanded={servicesOpen}
              onClick={closeNow}
              {...link}
            >
              <ScrambleText text="Services" />
              <span className={UNDERLINE} />
            </Link>
          </div>

          <Link href="/work" className={NAV_LINK} {...link}>
            <ScrambleText text="Work" />
            <span className={UNDERLINE} />
          </Link>
          <Link href="/about" className={NAV_LINK} {...link}>
            <ScrambleText text="About" />
            <span className={UNDERLINE} />
          </Link>
          <Link href="/contact" className={NAV_LINK} {...link}>
            <ScrambleText text="Contact" />
            <span className={UNDERLINE} />
          </Link>
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <Magnetic strength={0.5}>
              <button
                type="button"
                onClick={() => openContact("flow")}
                className="group flex items-center gap-2 rounded-full border border-paper/20 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-paper transition-colors hover:border-cyan hover:text-cyan"
                {...link}
              >
                <ScrambleText text="Start a project" />
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </Magnetic>
          </div>

          {/* Hamburger (mobile) */}
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/20 text-paper transition-colors hover:border-cyan md:hidden"
          >
            <span className="relative block h-[13px] w-5" aria-hidden>
              <span className="absolute left-0 top-0 h-0.5 w-full rounded bg-current" />
              <span className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 rounded bg-current" />
              <span className="absolute bottom-0 left-0 h-0.5 w-full rounded bg-current" />
            </span>
          </button>
        </div>
      </motion.header>

      {/* Desktop Services mega menu */}
      <div
        className={`fixed inset-x-0 top-[68px] z-40 hidden justify-center px-6 md:flex ${
          servicesOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        onMouseEnter={openMenu}
        onMouseLeave={scheduleClose}
        aria-hidden={!servicesOpen}
      >
        <div
          className={`w-full max-w-6xl rounded-2xl border border-paper/12 bg-ink-2/95 p-8 shadow-2xl backdrop-blur transition-all duration-200 ${
            servicesOpen
              ? "translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-2 opacity-0"
          }`}
        >
          <div className="grid gap-6 md:grid-cols-[0.9fr_2.4fr]">
            {/* featured panel */}
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
                href="/services"
                onClick={closeNow}
                className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-paper transition-colors hover:text-cyan"
                {...link}
              >
                <ScrambleText text="View all services" /> →
              </Link>
            </div>

            {/* category columns */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-3">
              {DOMAINS.map((domain) => {
                const content = CATEGORY[domain.id];
                const title =
                  domain.title.charAt(0) + domain.title.slice(1).toLowerCase();
                return (
                  <div key={domain.id}>
                    <Link
                      href={`/services/${content.slug}`}
                      onClick={closeNow}
                      className="mb-2.5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-paper transition-colors hover:text-cyan"
                      {...link}
                    >
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: domain.color }}
                      />
                      <ScrambleText text={title} />
                    </Link>
                    <ul className="space-y-1">
                      {servicesForCategory(domain.id).map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`/services/${content.slug}/${s.slug}`}
                            onClick={closeNow}
                            className="block text-[13px] leading-snug text-fog transition-all hover:translate-x-1 hover:text-cyan"
                            {...link}
                          >
                            <ScrambleText text={s.name} />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[110] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
              onClick={closeMobile}
              aria-hidden
            />
            <motion.nav
              aria-label="Mobile"
              className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col overflow-y-auto border-l border-paper/12 bg-ink-2 p-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-sm font-bold tracking-[0.14em] text-white">
                  INVINCIBLE&nbsp;PROS.
                </span>
                <button
                  type="button"
                  onClick={closeMobile}
                  aria-label="Close menu"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/25 text-paper transition-colors hover:border-cyan hover:text-cyan"
                >
                  ✕
                </button>
              </div>

              <div className="mt-10 flex flex-col gap-1">
                <Link href="/" onClick={closeMobile} className={MOBILE_LINK}>
                  Home
                </Link>

                <button
                  type="button"
                  onClick={() => setMobileServices((v) => !v)}
                  aria-expanded={mobileServices}
                  className="flex items-center justify-between py-3 text-left font-display text-2xl font-medium tracking-tight text-paper"
                >
                  Services
                  <span
                    className={`text-cyan transition-transform duration-300 ${
                      mobileServices ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {mobileServices && (
                  <div className="mb-2 flex flex-col gap-1 border-l border-paper/12 pl-4">
                    <Link
                      href="/services"
                      onClick={closeMobile}
                      className="py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-cyan"
                    >
                      All services →
                    </Link>
                    {DOMAINS.map((d) => (
                      <Link
                        key={d.id}
                        href={`/services/${CATEGORY[d.id].slug}`}
                        onClick={closeMobile}
                        className="flex items-center gap-2.5 py-2 text-base text-fog transition-colors hover:text-paper"
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: d.color }}
                        />
                        {d.title.charAt(0) + d.title.slice(1).toLowerCase()}
                      </Link>
                    ))}
                  </div>
                )}

                <Link href="/work" onClick={closeMobile} className={MOBILE_LINK}>
                  Work
                </Link>
                <Link href="/about" onClick={closeMobile} className={MOBILE_LINK}>
                  About
                </Link>
                <Link href="/contact" onClick={closeMobile} className={MOBILE_LINK}>
                  Contact
                </Link>
              </div>

              <button
                type="button"
                onClick={() => {
                  closeMobile();
                  openContact("flow");
                }}
                className="mt-8 flex items-center justify-center gap-2 rounded-full px-6 py-4 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-ink"
                style={{
                  backgroundImage:
                    "linear-gradient(100deg, var(--color-cyan), var(--color-accent-2))",
                }}
              >
                Start a project →
              </button>

              <div className="mt-auto pt-10">
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="block font-mono text-xs uppercase tracking-[0.16em] text-fog transition-colors hover:text-cyan"
                >
                  {CONTACT.email}
                </a>
                <a
                  href={`tel:${CONTACT.phone.replace(/[^+\d]/g, "")}`}
                  className="mt-1 block font-mono text-xs uppercase tracking-[0.16em] text-fog transition-colors hover:text-cyan"
                >
                  {CONTACT.phone}
                </a>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
