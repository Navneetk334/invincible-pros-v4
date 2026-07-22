"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import AssembleOnView from "./AssembleOnView";
import AuroraMesh from "./AuroraMesh";
import ClickRipple from "./ClickRipple";
import CoreOrb from "./CoreOrb";
import HoloFigure from "./HoloFigure";
import NovaDrone from "./NovaDrone";
import ParticleField from "./ParticleField";
import SpotlightGrid from "./SpotlightGrid";
import TiltCards from "./TiltCards";

type Demo = { id: string; title: string; blurb: string; render: () => React.ReactNode };

const GROUPS: { heading: string; note: string; demos: Demo[] }[] = [
  {
    heading: "Ambient backgrounds",
    note: "Always-alive layers that sit behind content across the whole site. Click Expand to preview full-screen.",
    demos: [
      {
        id: "particle-field",
        title: "Particle Field",
        blurb: "Drifting nodes linked by lines; they scatter away from your cursor.",
        render: () => <ParticleField />,
      },
      {
        id: "aurora-mesh",
        title: "Aurora Mesh",
        blurb: "Slow-breathing colour clouds in the brand palette. Pure ambience.",
        render: () => <AuroraMesh />,
      },
      {
        id: "spotlight-grid",
        title: "Spotlight Grid",
        blurb: "A technical grid that only reveals itself around the cursor.",
        render: () => <SpotlightGrid />,
      },
    ],
  },
  {
    heading: "Interactions",
    note: "React to cursor, click and scroll — the moment-to-moment feedback.",
    demos: [
      {
        id: "tilt-cards",
        title: "Cursor Tilt Cards",
        blurb: "Cards tilt in 3D toward the pointer with a moving light.",
        render: () => <TiltCards />,
      },
      {
        id: "click-ripple",
        title: "Click Ripple",
        blurb: "Expanding rings emit wherever you click or tap.",
        render: () => <ClickRipple />,
      },
      {
        id: "assemble-on-view",
        title: "Assemble on Scroll",
        blurb: "Text and blocks fly into place as they enter the viewport.",
        render: () => <AssembleOnView />,
      },
    ],
  },
  {
    heading: "Mascots",
    note: "A recurring character that gives the brand personality. Pick one.",
    demos: [
      {
        id: "core-orb",
        title: "CORE — Energy Orb",
        blurb: "Breathing gradient orb, follows the cursor, flares on click. Most on-brand.",
        render: () => <CoreOrb />,
      },
      {
        id: "nova-drone",
        title: "NOVA — Drone",
        blurb: "Friendly hovering bot; eyes track the cursor, hops when clicked.",
        render: () => <NovaDrone />,
      },
      {
        id: "holo-figure",
        title: "HOLO — Wireframe Guide",
        blurb: "Holographic head with scanlines that turns toward the cursor.",
        render: () => <HoloFigure />,
      },
    ],
  },
];

function DemoCard({ demo, onExpand }: { demo: Demo; onExpand: (demo: Demo) => void }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-white/10 bg-ink-2">
      <div className="relative h-72 w-full overflow-hidden bg-ink">
        {demo.render()}
        <button
          onClick={() => onExpand(demo)}
          className="absolute right-3 top-3 z-10 rounded-full border border-white/15 bg-ink/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-paper backdrop-blur transition-colors hover:border-cyan hover:text-cyan"
        >
          Expand
        </button>
      </div>
      <figcaption className="border-t border-white/10 p-5">
        <h3 className="text-base font-semibold text-paper">{demo.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-fog">{demo.blurb}</p>
      </figcaption>
    </figure>
  );
}

function FullScreenPreview({ demo, onClose }: { demo: Demo; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-ink"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="absolute inset-0">{demo.render()}</div>

      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-5 sm:p-6">
        <span className="rounded-full border border-white/15 bg-ink/70 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-paper backdrop-blur">
          {demo.title}
        </span>
        <button
          onClick={onClose}
          className="pointer-events-auto rounded-full border border-white/15 bg-ink/70 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-paper backdrop-blur transition-colors hover:border-cyan hover:text-cyan"
        >
          Close (Esc)
        </button>
      </div>
    </motion.div>
  );
}

export default function LabV2() {
  const [full, setFull] = useState<Demo | null>(null);

  return (
    <div className="lab-cursor min-h-screen bg-ink text-paper">
      <style>{`.lab-cursor, .lab-cursor * { cursor: auto !important; }`}</style>

      <header className="border-b border-white/10 px-6 py-10 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <Link href="/v2" className="font-mono text-[11px] uppercase tracking-[0.25em] text-fog hover:text-cyan">
            &larr; Back to site
          </Link>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Motion Lab</h1>
          <p className="mt-3 max-w-2xl text-fog">
            Every animation, interaction and mascot concept, side by side. Move your cursor,
            click inside the boxes, and scroll. Hit <span className="text-paper">Expand</span> on
            any tile to preview it full-screen, then tell me which ones to promote onto the real site.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-16 px-6 py-14 sm:px-10">
        {GROUPS.map((group) => (
          <section key={group.heading}>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-paper">{group.heading}</h2>
              <p className="mt-1 text-sm text-fog">{group.note}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {group.demos.map((demo) => (
                <DemoCard key={demo.id} demo={demo} onExpand={setFull} />
              ))}
            </div>
          </section>
        ))}
      </main>

      <AnimatePresence>
        {full && <FullScreenPreview key={full.id} demo={full} onClose={() => setFull(null)} />}
      </AnimatePresence>
    </div>
  );
}
