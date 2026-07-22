"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "ip-cookie-consent";

/**
 * Lightweight cookie-consent banner. Shows once until the visitor accepts or
 * declines; the choice is stored in localStorage. Mounted site-wide from the
 * root layout.
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let alreadyDecided = true;
    try {
      alreadyDecided = Boolean(localStorage.getItem(STORAGE_KEY));
    } catch {
      /* localStorage unavailable — treat as decided, don't block the page */
    }
    // Client-only reveal after mount (reading localStorage in a state
    // initializer would cause an SSR hydration mismatch).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!alreadyDecided) setVisible(true);
  }, []);

  const decide = (choice: "accepted" | "declined") => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 md:px-6 md:pb-6"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-2xl border border-paper/15 bg-ink-2/95 p-5 shadow-2xl backdrop-blur md:flex-row md:items-center md:justify-between md:p-6">
        <p className="text-sm leading-relaxed text-fog">
          We use cookies to run this site, remember your preferences and
          understand usage. See our{" "}
          <Link
            href="/cookies"
            className="text-paper underline decoration-cyan/50 underline-offset-2 transition-colors hover:text-cyan"
          >
            Cookie Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => decide("declined")}
            className="rounded-full border border-paper/25 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-paper transition-colors hover:border-paper/50"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="rounded-full px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink"
            style={{
              backgroundImage:
                "linear-gradient(100deg, var(--color-cyan), var(--color-accent-2))",
            }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
