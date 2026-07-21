"use client";

import Link from "next/link";
import { DOMAINS } from "@/lib/services";
import { CATEGORY, CONTACT, SOCIAL } from "@/lib/v2content";
import { useCursor } from "@/hooks/useCursor";
import ScrambleText from "@/components/layout/ScrambleText";

export default function FooterV2() {
  const link = useCursor("hover");
  const year = 2026;

  const channels = [
    { label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    {
      label: "Phone",
      value: CONTACT.phone,
      href: `tel:${CONTACT.phone.replace(/[^+\d]/g, "")}`,
    },
    { label: "WhatsApp", value: "Message us", href: CONTACT.whatsapp },
  ];

  return (
    <footer className="relative border-t border-paper/12 px-6 pb-10 pt-20 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-4">
          {/* contact — moved from the top contact section */}
          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog">
              Contact
            </h3>
            <ul className="mt-5 space-y-3.5">
              {channels.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group block"
                    {...link}
                  >
                    <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-fog/70">
                      {c.label}
                    </span>
                    <span className="mt-0.5 block text-sm text-paper/75 transition-colors group-hover:text-cyan">
                      <ScrambleText text={c.value} />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
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
                    <ScrambleText
                      text={d.title.charAt(0) + d.title.slice(1).toLowerCase()}
                    />
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
                { label: "Services", href: "/v2/services" },
                { label: "Work", href: "/v2/work" },
                { label: "About", href: "/v2/about" },
                { label: "Careers", href: "/v2/careers" },
                { label: "Contact", href: "/v2/contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-paper/75 transition-colors hover:text-cyan"
                    {...link}
                  >
                    <ScrambleText text={l.label} />
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
                { label: "Case Studies", href: "/v2/work" },
                { label: "Privacy", href: "/v2/privacy" },
                { label: "Terms", href: "/v2/terms" },
                { label: "Cookies", href: "/v2/cookies" },
                { label: "Refund", href: "/v2/refund" },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-paper/75 transition-colors hover:text-cyan"
                    {...link}
                  >
                    <ScrambleText text={l.label} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* V1-style giant wordmark fading into the floor, below the footer menu */}
      <div className="mt-16 overflow-hidden">
        <h2
          aria-hidden
          className="select-none whitespace-nowrap text-center font-display font-bold uppercase leading-[0.9] tracking-[-0.04em]"
          style={{
            fontSize: "clamp(2.5rem, 10.6vw, 15rem)",
            backgroundImage:
              "linear-gradient(to bottom, rgba(224,227,244,0.6) 0%, rgba(224,227,244,0.22) 52%, rgba(224,227,244,0.04) 82%, rgba(224,227,244,0) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Invincible&nbsp;Pros.
        </h2>
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="mt-6 flex flex-col items-start justify-between gap-5 border-t border-paper/10 pt-8 md:flex-row md:items-center">
          <p className="order-2 font-mono text-[10px] uppercase tracking-[0.18em] text-fog/70 md:order-1">
            &copy; {year} INVINCIBLE&nbsp;PROS. All rights reserved.
          </p>
          <nav
            aria-label="Social"
            className="order-1 flex flex-wrap items-center gap-x-5 gap-y-2 md:order-2"
          >
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] uppercase tracking-[0.18em] text-fog transition-colors hover:text-cyan"
                {...link}
              >
                <ScrambleText text={s.label} />
              </a>
            ))}
          </nav>
          <p className="order-3 font-mono text-[10px] uppercase tracking-[0.18em] text-fog/70">
            Engineering the future.
          </p>
        </div>
      </div>
    </footer>
  );
}
