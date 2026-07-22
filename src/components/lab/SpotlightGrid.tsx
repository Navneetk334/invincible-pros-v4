"use client";

import { useEffect, useRef } from "react";

/** A grid that only lights up around the cursor — a moving spotlight. */
export default function SpotlightGrid({ windowTracked = false }: { windowTracked?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  // As a full-page background the grid sits behind the content, so track the
  // pointer on window rather than on the (covered) container.
  useEffect(() => {
    if (!windowTracked) return;
    const onMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--x", `${e.clientX - r.left}px`);
      el.style.setProperty("--y", `${e.clientY - r.top}px`);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [windowTracked]);

  return (
    <div
      ref={ref}
      onPointerMove={move}
      className="absolute inset-0"
      style={{ "--x": "50%", "--y": "50%" } as React.CSSProperties}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(238,241,251,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(238,241,251,0.12) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
          WebkitMaskImage:
            "radial-gradient(220px circle at var(--x) var(--y), black 0%, transparent 72%)",
          maskImage:
            "radial-gradient(220px circle at var(--x) var(--y), black 0%, transparent 72%)",
        }}
      />
      <div
        className="pointer-events-none absolute h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          left: "var(--x)",
          top: "var(--y)",
          background: "radial-gradient(circle, rgba(56,225,255,0.22), transparent 70%)",
        }}
      />
      <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[11px] uppercase tracking-[0.2em] text-fog/60">
        Move your cursor
      </span>
    </div>
  );
}
