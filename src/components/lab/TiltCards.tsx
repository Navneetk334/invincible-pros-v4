"use client";

import { useRef } from "react";

const CARDS = [
  { title: "Build", tag: "01" },
  { title: "Scale", tag: "02" },
  { title: "Secure", tag: "03" },
];

/** A single card that tilts in 3D toward the pointer. Ref transforms — no re-render. */
function TiltCard({ title, tag }: { title: string; tag: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (0.5 - py) * 16;
    const ry = (px - 0.5) * 16;
    el.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`;
    if (glowRef.current) {
      glowRef.current.style.setProperty("--gx", `${px * 100}%`);
      glowRef.current.style.setProperty("--gy", `${py * 100}%`);
    }
  };
  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={reset}
      className="relative h-40 w-32 rounded-2xl border border-white/10 bg-white/[0.03] transition-transform duration-150 ease-out will-change-transform"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-70"
        style={{
          background:
            "radial-gradient(180px circle at var(--gx,50%) var(--gy,50%), rgba(56,225,255,0.18), transparent 60%)",
        }}
      />
      <div className="relative flex h-full flex-col justify-between p-4">
        <span className="font-mono text-[11px] text-cyan/70">{tag}</span>
        <span className="text-lg font-semibold text-paper">{title}</span>
      </div>
    </div>
  );
}

/** Cursor-reactive 3D tilt cards. */
export default function TiltCards() {
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-5">
      {CARDS.map((c) => (
        <TiltCard key={c.tag} title={c.title} tag={c.tag} />
      ))}
    </div>
  );
}
