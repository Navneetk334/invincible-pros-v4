import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found — INVINCIBLE PROS.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(800px 500px at 70% -10%, rgba(56,225,255,0.12), transparent 60%), radial-gradient(700px 500px at 0% 110%, rgba(124,92,255,0.14), transparent 55%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.28em] text-fog">
          Error 404
        </p>
        <h1 className="font-display text-[24vw] font-bold leading-[0.85] tracking-tight md:text-[12rem]">
          <span className="gradient-text">404</span>
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-fog md:text-lg">
          This page drifted off the grid. The link may be broken or the page may
          have moved.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/v2"
            className="group flex items-center gap-2 rounded-full px-8 py-4 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-ink"
            style={{
              backgroundImage:
                "linear-gradient(100deg, var(--color-cyan), var(--color-accent-2))",
            }}
          >
            Back to home
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
          <Link
            href="/v2/contact"
            className="rounded-full border border-paper/25 px-8 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-paper transition-colors hover:border-cyan hover:text-cyan"
          >
            Contact us
          </Link>
        </div>
      </div>
    </main>
  );
}
