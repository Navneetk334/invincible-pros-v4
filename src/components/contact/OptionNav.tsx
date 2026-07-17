"use client";

import Link from "next/link";

const OPTS = [
  { k: "console", label: "01 · Console" },
  { k: "flow", label: "02 · Flow" },
  { k: "split", label: "03 · Split" },
];

export default function OptionNav({ active }: { active: string }) {
  return (
    <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border border-paper/15 bg-ink/70 px-2 py-1.5 backdrop-blur-md">
      <Link
        href="/"
        className="rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-fog transition-colors hover:text-paper"
      >
        ← site
      </Link>
      <span className="mx-1 h-4 w-px bg-paper/15" />
      {OPTS.map((o) => (
        <Link
          key={o.k}
          href={`/contact-lab/${o.k}`}
          className={`rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
            active === o.k
              ? "bg-paper text-ink"
              : "text-fog hover:text-paper"
          }`}
        >
          {o.label}
        </Link>
      ))}
    </div>
  );
}
