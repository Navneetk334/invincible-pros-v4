"use client";

import Link from "next/link";
import { DOMAINS } from "@/lib/services";
import { CATEGORY, CONTACT } from "@/lib/v2content";
import { useCursor } from "@/hooks/useCursor";

export default function FooterV2() {
  const link = useCursor("hover");
  const year = 2026;

  return (
    <footer className="relative border-t border-paper/12 px-6 pb-10 pt-20 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* brand */}
          <div>
            <p className="font-display text-2xl font-bold tracking-tight">
              INVINCIBLE&nbsp;PROS<span className="text-cyan">.</span>
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-fog">
              A digital engineering company building software, AI, cloud,
              hardware and live experiences — end to end, under one roof.
            </p>
            <a
              href={`mailto:${CONTACT.email}`}
              className="mt-6 inline-block font-mono text-xs uppercase tracking-[0.16em] text-paper/80 transition-colors hover:text-cyan"
              {...link}
            >
              {CONTACT.email}
            </a>
            <a
              href={`tel:${CONTACT.phone.replace(/[^+\d]/g, "")}`}
              className="mt-1 block font-mono text-xs uppercase tracking-[0.16em] text-paper/80 transition-colors hover:text-cyan"
              {...link}
            >
              {CONTACT.phone}
            </a>
          </div>

          {/* services */}
          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog">
              Services
            </h3>
            <ul className="mt-5 space-y-2.5">
              {DOMAINS.map((d) => (
                <li key={d.id}>
                  <Link
                    href={`/v2/services/${CATEGORY[d.id].slug}`}
                    className="text-sm text-paper/75 transition-colors hover:text-cyan"
                    {...link}
                  >
                    {d.title.charAt(0) + d.title.slice(1).toLowerCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* explore */}
          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog">
              Explore
            </h3>
            <ul className="mt-5 space-y-2.5">
              {[
                { label: "Work", href: "/v2#work" },
                { label: "Process", href: "/v2#process" },
                { label: "Industries", href: "/v2#industries" },
                { label: "Contact", href: "/v2#contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-paper/75 transition-colors hover:text-cyan"
                    {...link}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* company */}
          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog">
              Company
            </h3>
            <ul className="mt-5 space-y-2.5">
              {[
                { label: "About", href: "/v2#top" },
                { label: "Case Studies", href: "/v2#work" },
                { label: "Privacy", href: "/v2#top" },
                { label: "Terms", href: "/v2#top" },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-paper/75 transition-colors hover:text-cyan"
                    {...link}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-paper/10 pt-8 md:flex-row md:items-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fog/70">
            &copy; {year} INVINCIBLE&nbsp;PROS. All rights reserved.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fog/70">
            Engineering the future.
          </p>
        </div>
      </div>
    </footer>
  );
}
