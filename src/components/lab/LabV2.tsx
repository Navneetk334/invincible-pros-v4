"use client";

import Link from "next/link";
import AssembleOnView from "./AssembleOnView";
import AuroraMesh from "./AuroraMesh";
import ClickRipple from "./ClickRipple";
import CoreOrb from "./CoreOrb";
import HoloFigure from "./HoloFigure";
import NovaDrone from "./NovaDrone";
import ParticleField from "./ParticleField";
import SpotlightGrid from "./SpotlightGrid";
import TiltCards from "./TiltCards";

type Demo = { id: string; title: string; blurb: string; node: React.ReactNode };

const GROUPS: { heading: string; note: string; demos: Demo[] }[] = [
  {
    heading: "Ambient backgrounds",
    note: "Always-alive layers that sit behind content across the whole site.",
    demos: [
      {
        id: "particle-field",
        title: "Particle Field",
        blurb: "Drifting nodes linked by lines; they scatter away from your cursor.",
        node: <ParticleField />,
      },
      {
        id: "aurora-mesh",
        title: "Aurora Mesh",
        blurb: "Slow-breathing colour clouds in the brand palette. Pure ambience.",
        node: <AuroraMesh />,
      },
      {
        id: "spotlight-grid",
        title: "Spotlight Grid",
        blurb: "A technical grid that only reveals itself around the cursor.",
        node: <SpotlightGrid />,
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
        node: <TiltCards />,
      },
      {
        id: "click-ripple",
        title: "Click Ripple",
        blurb: "Expanding rings emit wherever you click or tap.",
        node: <ClickRipple />,
      },
      {
        id: "assemble-on-view",
        title: "Assemble on Scroll",
        blurb: "Text and blocks fly into place as they enter the viewport.",
        node: <AssembleOnView />,
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
        node: <CoreOrb />,
      },
      {
        id: "nova-drone",
        title: "NOVA — Drone",
        blurb: "Friendly hovering bot; eyes track the cursor, hops when clicked.",
        node: <NovaDrone />,
      },
      {
        id: "holo-figure",
        title: "HOLO — Wireframe Guide",
        blurb: "Holographic head with scanlines that turns toward the cursor.",
        node: <HoloFigure />,
      },
    ],
  },
];

function DemoCard({ demo }: { demo: Demo }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-white/10 bg-ink-2">
      <div className="relative h-72 w-full overflow-hidden bg-ink">{demo.node}</div>
      <figcaption className="border-t border-white/10 p-5">
        <h3 className="text-base font-semibold text-paper">{demo.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-fog">{demo.blurb}</p>
      </figcaption>
    </figure>
  );
}

export default function LabV2() {
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
            click inside the boxes, and scroll. Tell me which ones to promote onto the real site.
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
                <DemoCard key={demo.id} demo={demo} />
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
