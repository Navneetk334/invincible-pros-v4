"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { DOMAINS } from "@/lib/services";
import { CATEGORY, servicesForCategory } from "@/lib/v2content";
import { useStore } from "@/store/useStore";
import { useCursor } from "@/hooks/useCursor";
import Magnetic from "@/components/layout/Magnetic";
import AnimatedLogo from "@/components/layout/AnimatedLogo";
import ScrambleText from "@/components/layout/ScrambleText";

const NAV_LINK =
  "group relative font-mono text-xs uppercase tracking-[0.2em] text-fog transition-colors hover:text-paper";
const UNDERLINE =
  "absolute -bottom-1 left-0 h-px w-0 bg-cyan transition-all duration-300 group-hover:w-full";

export default function NavbarV2() {
  const entered = useStore((s) => s.entered);
  const openContact = useStore((s) => s.openContact);
  const link = useCursor("hover");

  const [servicesOpen, setServicesOpen] = useState(false);
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

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 md:px-12"
        initial={{ y: -40, opacity: 0 }}
        animate={entered ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
      >
        <AnimatedLogo href="/v2" />

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          <Link href="/v2" className={NAV_LINK} {...link}>
            <ScrambleText text="Home" />
            <span className={UNDERLINE} />
          </Link>

          <div
            className="relative"
            onMouseEnter={openMenu}
            onMouseLeave={scheduleClose}
          >
            <Link
              href="/v2/services"
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

          <Link href="/v2/work" className={NAV_LINK} {...link}>
            <ScrambleText text="Work" />
            <span className={UNDERLINE} />
          </Link>
          <Link href="/v2/about" className={NAV_LINK} {...link}>
            <ScrambleText text="About" />
            <span className={UNDERLINE} />
          </Link>
          <Link href="/v2/contact" className={NAV_LINK} {...link}>
            <ScrambleText text="Contact" />
            <span className={UNDERLINE} />
          </Link>
        </nav>

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
      </motion.header>

      {/* Services mega menu (desktop) */}
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
                href="/v2/services"
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
                      href={`/v2/services/${content.slug}`}
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
                            href={`/v2/services/${content.slug}/${s.slug}`}
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
    </>
  );
}
