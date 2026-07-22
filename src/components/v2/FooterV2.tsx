"use client";

import Link from "next/link";
import { DOMAINS } from "@/lib/services";
import { CATEGORY, CONTACT, SOCIAL } from "@/lib/v2content";
import { useCursor } from "@/hooks/useCursor";
import ScrambleText from "@/components/layout/ScrambleText";

const ICON_CLASS = "block h-6 w-6";

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  LinkedIn: (
    <svg viewBox="0 0 24 24" fill="currentColor" className={ICON_CLASS} aria-hidden focusable="false">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  ),
  Instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" className={ICON_CLASS} aria-hidden focusable="false">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.055 1.805.249 2.227.415.56.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227a3.81 3.81 0 01-.899 1.382 3.744 3.744 0 01-1.38.896c-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421a3.716 3.716 0 01-1.379-.899 3.644 3.644 0 01-.9-1.38c-.164-.42-.36-1.065-.413-2.235-.057-1.274-.07-1.649-.07-4.859 0-3.211.015-3.586.074-4.859.061-1.171.255-1.816.421-2.236.216-.56.477-.96.899-1.379a3.628 3.628 0 011.38-.9c.419-.164 1.065-.36 2.235-.413C8.415 2.176 8.79 2.163 12 2.163zm0-2.163C8.741 0 8.333.014 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.667-.072-4.947-.06-1.277-.262-2.148-.558-2.913a5.89 5.89 0 00-1.384-2.126A5.868 5.868 0 0019.86.63c-.765-.297-1.636-.498-2.913-.558C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  ),
  WhatsApp: (
    <svg viewBox="0 0 24 24" fill="currentColor" className={ICON_CLASS} aria-hidden focusable="false">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  ),
  Telegram: (
    <svg viewBox="0 0 24 24" fill="currentColor" className={ICON_CLASS} aria-hidden focusable="false">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
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
                className="inline-flex h-6 w-6 items-center justify-center text-fog transition-colors hover:text-cyan"
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
