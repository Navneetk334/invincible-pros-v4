"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { LabScene } from "./LabCanvas";
import { phaseLabel } from "./loop";

const LabCanvas = dynamic(() => import("./LabCanvas"), { ssr: false });

const META: Record<LabScene, { title: string; desc: string }> = {
  chaos: {
    title: "Chaos → Order",
    desc: "Scattered fragments (the problem) assemble into an ordered, glowing core. Colour shifts red → cyan.",
  },
  blueprint: {
    title: "Blueprint → Build",
    desc: "A wireframe blueprint draws itself, then materialises into a solid, reflective object.",
  },
  knot: {
    title: "Tangled → Clean",
    desc: "A tangled, distorted knot smooths into a clean, precise form as it is solved.",
  },
};

const LINKS: { scene: LabScene; label: string }[] = [
  { scene: "chaos", label: "Chaos" },
  { scene: "blueprint", label: "Blueprint" },
  { scene: "knot", label: "Knot" },
];

export default function LabView({ scene }: { scene: LabScene }) {
  const m = META[scene];
  const [label, setLabel] = useState("");

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

      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 md:p-10">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="pointer-events-auto font-mono text-xs uppercase tracking-[0.2em] text-fog transition-colors hover:text-paper"
          >
            ← back to site
          </Link>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-fog">
            Loader concept
          </span>
        </div>

        <div className="text-center">
          <p className="font-display text-2xl font-medium tracking-tight md:text-4xl">
            {label}
          </p>
        </div>

        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
            {m.title}
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-fog">
            {m.desc}
          </p>
          <div className="pointer-events-auto mt-5 flex gap-6 font-mono text-[11px] uppercase tracking-[0.18em]">
            {LINKS.map((l) => (
              <Link
                key={l.scene}
                href={`/lab/${l.scene}`}
                className={
                  l.scene === scene
                    ? "text-cyan"
                    : "text-fog transition-colors hover:text-paper"
                }
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
