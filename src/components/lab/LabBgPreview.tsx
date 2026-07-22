"use client";

import AuroraMesh from "./AuroraMesh";
import ParticleField from "./ParticleField";
import SpotlightGrid from "./SpotlightGrid";

const MAP: Record<string, { label: string; render: () => React.ReactNode }> = {
  "particle-field": { label: "Particle Field", render: () => <ParticleField windowTracked /> },
  "aurora-mesh": { label: "Aurora Mesh", render: () => <AuroraMesh /> },
  "spotlight-grid": { label: "Spotlight Grid", render: () => <SpotlightGrid windowTracked /> },
};

/**
 * Renders one of the lab ambient backgrounds as the full-page background layer
 * (in place of SceneCanvas) so it can be previewed behind the real content.
 * Activated on /v2 via the ?labbg=<id> query param.
 */
export default function LabBgPreview({ id }: { id: string }) {
  const entry = MAP[id];
  if (!entry) return null;
  const { label, render } = entry;

  return (
    <>
      <div className="fixed inset-0 z-0 bg-ink">{render()}</div>
      <div className="fixed bottom-4 left-1/2 z-[120] flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/15 bg-ink/80 px-4 py-2 backdrop-blur">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-cyan">
          Preview: {label}
        </span>
        <span className="h-3 w-px bg-white/15" />
        <a
          href="/v2"
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-fog transition-colors hover:text-paper"
        >
          Exit
        </a>
        <span className="h-3 w-px bg-white/15" />
        <a
          href="/v2/lab"
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-fog transition-colors hover:text-paper"
        >
          Back to lab
        </a>
      </div>
    </>
  );
}
