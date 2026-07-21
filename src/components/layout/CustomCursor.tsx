"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";

const ORB =
  "radial-gradient(circle, rgba(56,225,255,0.9), rgba(124,92,255,0.6) 55%, transparent 72%)";

/**
 * Gradient glow-orb cursor: a soft, blurred cyan→violet orb trails the pointer
 * while a crisp dot leads it. The orb grows and brightens over interactive
 * elements. Also feeds normalized pointer position to the store for WebGL
 * parallax.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const cursor = useStore((s) => s.cursor);
  const setPointer = useStore((s) => s.setPointer);
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
      setPointer(
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1),
      );
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
  }, [setPointer]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[200] hidden md:block">
      {/* trailing glow orb */}
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

      {/* leading dot */}
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
