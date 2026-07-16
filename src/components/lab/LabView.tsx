"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { LabScene } from "./LabCanvas";
import { phaseLabel } from "./loop";

const LabCanvas = dynamic(() => import("./LabCanvas"), { ssr: false });

export default function LabView({ scene = "chaos" }: { scene?: LabScene }) {
  const [label, setLabel] = useState("Many Problems");

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      setLabel(phaseLabel((t - start) / 1000));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-ink text-paper">
      <div className="absolute inset-0">
        <LabCanvas scene={scene} />
      </div>

      {/* top bar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-6 md:p-10">
        <Link
          href="/"
          className="pointer-events-auto font-mono text-xs uppercase tracking-[0.2em] text-fog transition-colors hover:text-paper"
        >
          ← back to site
        </Link>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-fog">
          Preloader concept
        </span>
      </div>

      {/* phase caption (top-centre so it never overlaps the forming logo) */}
      <div className="pointer-events-none absolute inset-x-0 top-24 flex justify-center">
        <span className="font-mono text-sm uppercase tracking-[0.34em] text-cyan">
          {label}
        </span>
      </div>

      {/* description */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6 md:p-10">
        <h1 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
          Chaos → Order
        </h1>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-fog">
          Scattered fragments — many problems — converge into one solution,
          forming the INVINCIBLE&nbsp;PROS. logo. Colour shifts red → cyan as it
          resolves.
        </p>
      </div>
    </main>
  );
}
