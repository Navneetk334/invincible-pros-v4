"use client";

import Link from "next/link";
import { DOMAINS } from "@/lib/services";
import { CATEGORY, CONTACT, SOCIAL } from "@/lib/v2content";
import { useCursor } from "@/hooks/useCursor";
import ScrambleText from "@/components/layout/ScrambleText";

const ICON_CLASS = "h-5 w-5";

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  LinkedIn: (
    <svg viewBox="0 0 24 24" fill="currentColor" className={ICON_CLASS} aria-hidden focusable="false">
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6S0 4.88 0 3.5 1.11 1 2.49 1s2.49 1.12 2.49 2.5zM.24 8.02h4.5V24H.24V8.02zM8.34 8.02h4.31v2.18h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.9V24h-4.5v-6.34c0-1.51-.03-3.45-2.1-3.45-2.1 0-2.42 1.64-2.42 3.34V24h-4.5V8.02z" />
    </svg>
  ),
  Instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" className={ICON_CLASS} aria-hidden focusable="false">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 1.62c-3.15 0-3.52.01-4.76.07-.98.04-1.5.21-1.86.35-.47.18-.8.4-1.15.75-.35.35-.57.68-.75 1.15-.14.36-.31.88-.35 1.86-.06 1.24-.07 1.61-.07 4.76s.01 3.52.07 4.76c.04.98.21 1.5.35 1.86.18.47.4.8.75 1.15.35.35.68.57 1.15.75.36.14.88.31 1.86.35 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c.98-.04 1.5-.21 1.86-.35.47-.18.8-.4 1.15-.75.35-.35.57-.68.75-1.15.14-.36.31-.88.35-1.86.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.04-.98-.21-1.5-.35-1.86a3.1 3.1 0 00-.75-1.15 3.1 3.1 0 00-1.15-.75c-.36-.14-.88-.31-1.86-.35-1.24-.06-1.61-.07-4.76-.07zm0 2.76a5.46 5.46 0 110 10.92 5.46 5.46 0 010-10.92zm0 1.62a3.84 3.84 0 100 7.68 3.84 3.84 0 000-7.68zm5.65-1.13a1.28 1.28 0 11-2.56 0 1.28 1.28 0 012.56 0z" />
    </svg>
  ),
  WhatsApp: (
    <svg viewBox="0 0 24 24" fill="currentColor" className={ICON_CLASS} aria-hidden focusable="false">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35zM12.05 21.5a9.5 9.5 0 01-4.84-1.33l-.35-.2-3.6.94.96-3.5-.23-.36a9.46 9.46 0 01-1.45-5.05c0-5.24 4.27-9.5 9.52-9.5 2.54 0 4.93.99 6.73 2.79a9.44 9.44 0 012.79 6.72c-.01 5.24-4.28 9.5-9.53 9.5zM20.15 3.9A11.42 11.42 0 0012.05.5C5.73.5.6 5.63.6 11.95c0 2.02.53 4 1.53 5.74L.5 23.5l5.95-1.56a11.4 11.4 0 005.59 1.42h.01c6.32 0 11.45-5.13 11.45-11.45 0-3.06-1.19-5.94-3.35-8.1z" />
    </svg>
  ),
  Telegram: (
    <svg viewBox="0 0 24 24" fill="currentColor" className={ICON_CLASS} aria-hidden focusable="false">
      <path d="M23.07 3.36l-3.48 16.4c-.26 1.16-.95 1.44-1.92.9l-5.3-3.9-2.56 2.46c-.28.28-.52.52-1.07.52l.38-5.4L18.7 5.98c.43-.38-.09-.6-.67-.22L6.9 12.36l-5.23-1.64c-1.14-.36-1.16-1.14.24-1.68L21.6 1.66c.95-.35 1.78.22 1.47 1.7z" />
    </svg>
  ),
};

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
                    href={`/services/${CATEGORY[d.id].slug}`}
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
                { label: "Services", href: "/services" },
                { label: "Work", href: "/work" },
                { label: "About", href: "/about" },
                { label: "Careers", href: "/careers" },
                { label: "Contact", href: "/contact" },
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
                { label: "Case Studies", href: "/work" },
                { label: "Privacy", href: "/privacy" },
                { label: "Terms", href: "/terms" },
                { label: "Cookies", href: "/cookies" },
                { label: "Refund", href: "/refund" },
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
            className="order-1 flex flex-wrap items-center gap-x-4 gap-y-2 md:order-2"
          >
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                title={s.label}
                className="text-fog transition-colors hover:text-cyan"
                {...link}
              >
                {SOCIAL_ICONS[s.label] ?? <ScrambleText text={s.label} />}
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
