"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";

const ORB =
  "radial-gradient(circle, rgba(56,225,255,0.9), rgba(124,92,255,0.6) 55%, transparent 72%)";

function Dot({
  dotRef,
  size = 6,
}: {
  dotRef: React.RefObject<HTMLDivElement | null>;
  size?: number;
}) {
  return (
    <div ref={dotRef} className="absolute left-0 top-0" style={{ willChange: "transform" }}>
      <motion.div
        className="rounded-full bg-paper"
        animate={{ width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}

function TrailBlob({
  blobRef,
  size,
  opacity,
  active,
}: {
  blobRef: React.RefObject<HTMLDivElement | null>;
  size: number;
  opacity: number;
  active: boolean;
}) {
  const s = active ? size * 1.5 : size;
  return (
    <div ref={blobRef} className="absolute left-0 top-0" style={{ willChange: "transform" }}>
      <motion.div
        className="rounded-full blur-lg"
        animate={{ width: s, height: s, marginLeft: -s / 2, marginTop: -s / 2 }}
        transition={{ type: "spring", stiffness: 140, damping: 20 }}
        style={{ background: ORB, opacity }}
      />
    </div>
  );
}

/**
 * Preview-only cursor — variations on the gradient glow orb:
 *   1 — Glow orb (classic)      blurred gradient orb + crisp dot
 *   2 — Glow orb + bright core   orb with a solid core that scales on hover
 *   3 — Glow ring                glowing hollow ring + dot
 *   4 — Comet trail              orb with a soft trailing tail
 */
export default function LabCursor({ variant }: { variant: 1 | 2 | 3 | 4 }) {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const t0 = useRef<HTMLDivElement>(null);
  const t1 = useRef<HTMLDivElement>(null);
  const t2 = useRef<HTMLDivElement>(null);
  const cursor = useStore((s) => s.cursor);
  const active = cursor !== "default";

  useEffect(() => {
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: pos.x, y: pos.y };
    const trailEls = [t0, t1, t2];
    const factors = [0.4, 0.24, 0.14];
    const trail = trailEls.map(() => ({ x: pos.x, y: pos.y }));
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      }
    };
    const loop = () => {
      ring.x += (pos.x - ring.x) * 0.16;
      ring.y += (pos.y - ring.y) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      }
      let tx = pos.x;
      let ty = pos.y;
      trail.forEach((pt, i) => {
        pt.x += (tx - pt.x) * factors[i];
        pt.y += (ty - pt.y) * factors[i];
        const el = trailEls[i].current;
        if (el) el.style.transform = `translate3d(${pt.x}px, ${pt.y}px, 0)`;
        tx = pt.x;
        ty = pt.y;
      });
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // ---- Variant 1: classic glow orb ----
  if (variant === 1) {
    return (
      <div className="pointer-events-none fixed inset-0 z-[200] hidden md:block">
        <div ref={ringRef} className="absolute left-0 top-0" style={{ willChange: "transform" }}>
          <motion.div
            className="rounded-full blur-2xl"
            animate={{
              width: active ? 150 : 90,
              height: active ? 150 : 90,
              marginLeft: active ? -75 : -45,
              marginTop: active ? -75 : -45,
              opacity: active ? 0.9 : 0.55,
            }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            style={{ background: ORB }}
          />
        </div>
        <Dot dotRef={dotRef} />
      </div>
    );
  }

  // ---- Variant 2: glow orb + bright core ----
  if (variant === 2) {
    return (
      <div className="pointer-events-none fixed inset-0 z-[200] hidden md:block">
        <div ref={ringRef} className="absolute left-0 top-0" style={{ willChange: "transform" }}>
          <motion.div
            className="rounded-full blur-xl"
            animate={{
              width: active ? 120 : 74,
              height: active ? 120 : 74,
              marginLeft: active ? -60 : -37,
              marginTop: active ? -60 : -37,
              opacity: active ? 0.85 : 0.5,
            }}
            transition={{ type: "spring", stiffness: 130, damping: 20 }}
            style={{ background: ORB }}
          />
        </div>
        <div ref={dotRef} className="absolute left-0 top-0" style={{ willChange: "transform" }}>
          <motion.div
            className="rounded-full"
            animate={{
              width: active ? 18 : 10,
              height: active ? 18 : 10,
              marginLeft: active ? -9 : -5,
              marginTop: active ? -9 : -5,
            }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            style={{
              background: "linear-gradient(120deg, var(--color-cyan), var(--color-accent-2))",
              boxShadow: "0 0 12px 2px rgba(56,225,255,0.6)",
            }}
          />
        </div>
      </div>
    );
  }

  // ---- Variant 3: glow ring ----
  if (variant === 3) {
    return (
      <div className="pointer-events-none fixed inset-0 z-[200] hidden md:block">
        <div ref={ringRef} className="absolute left-0 top-0" style={{ willChange: "transform" }}>
          <motion.div
            className="rounded-full border-2 border-cyan/70"
            animate={{
              width: active ? 60 : 38,
              height: active ? 60 : 38,
              marginLeft: active ? -30 : -19,
              marginTop: active ? -30 : -19,
            }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            style={{
              boxShadow:
                "0 0 22px 3px rgba(56,225,255,0.45), inset 0 0 12px rgba(124,92,255,0.35)",
            }}
          />
        </div>
        <Dot dotRef={dotRef} size={5} />
      </div>
    );
  }

  // ---- Variant 4: comet trail ----
  return (
    <div className="pointer-events-none fixed inset-0 z-[200] hidden md:block">
      <TrailBlob blobRef={t0} size={46} opacity={0.5} active={active} />
      <TrailBlob blobRef={t1} size={30} opacity={0.32} active={active} />
      <TrailBlob blobRef={t2} size={18} opacity={0.18} active={active} />
      <Dot dotRef={dotRef} size={5} />
    </div>
  );
}
