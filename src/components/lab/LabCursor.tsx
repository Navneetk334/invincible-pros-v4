"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "@/store/useStore";

/**
 * Preview-only cursor with three switchable styles:
 *   1 — blend dot        (minimal, inverts against content)
 *   2 — gradient glow orb (cinematic, on-brand)
 *   3 — precision bracket (techy focus frame)
 */
export default function LabCursor({ variant }: { variant: 1 | 2 | 3 }) {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const cursor = useStore((s) => s.cursor);
  const label = useStore((s) => s.cursorLabel);
  const active = cursor !== "default";

  useEffect(() => {
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: pos.x, y: pos.y };
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
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // ---- Variant 1: blend dot ----
  if (variant === 1) {
    return (
      <div
        className="pointer-events-none fixed inset-0 z-[200] hidden md:block"
        style={{ mixBlendMode: "difference" }}
      >
        <div ref={dotRef} className="absolute left-0 top-0" style={{ willChange: "transform" }}>
          <motion.div
            className="rounded-full bg-white"
            animate={{
              width: active ? 52 : 16,
              height: active ? 52 : 16,
              marginLeft: active ? -26 : -8,
              marginTop: active ? -26 : -8,
            }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
          />
        </div>
      </div>
    );
  }

  // ---- Variant 2: gradient glow orb ----
  if (variant === 2) {
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
            style={{
              background:
                "radial-gradient(circle, rgba(56,225,255,0.9), rgba(124,92,255,0.6) 55%, transparent 72%)",
            }}
          />
        </div>
        <div ref={dotRef} className="absolute left-0 top-0" style={{ willChange: "transform" }}>
          <motion.div
            className="rounded-full bg-paper"
            animate={{
              width: active ? 8 : 6,
              height: active ? 8 : 6,
              marginLeft: active ? -4 : -3,
              marginTop: active ? -4 : -3,
            }}
            transition={{ duration: 0.2 }}
          />
        </div>
      </div>
    );
  }

  // ---- Variant 3: precision bracket ----
  const size = active ? 64 : 34;
  const corner =
    "absolute h-3 w-3 border-cyan transition-all duration-200";
  return (
    <div className="pointer-events-none fixed inset-0 z-[200] hidden md:block">
      <div ref={ringRef} className="absolute left-0 top-0" style={{ willChange: "transform" }}>
        <motion.div
          className="relative"
          animate={{
            width: size,
            height: size,
            marginLeft: -size / 2,
            marginTop: -size / 2,
          }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
        >
          <span className={`${corner} left-0 top-0 border-l-2 border-t-2`} />
          <span className={`${corner} right-0 top-0 border-r-2 border-t-2`} />
          <span className={`${corner} bottom-0 left-0 border-b-2 border-l-2`} />
          <span className={`${corner} bottom-0 right-0 border-b-2 border-r-2`} />
          <AnimatePresence>
            {label && (
              <motion.span
                key={label}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute left-1/2 top-full -translate-x-1/2 whitespace-nowrap pt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-cyan"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      <div ref={dotRef} className="absolute left-0 top-0" style={{ willChange: "transform" }}>
        <div className="-ml-[2px] -mt-[2px] h-1 w-1 rounded-full bg-cyan" />
      </div>
    </div>
  );
}
