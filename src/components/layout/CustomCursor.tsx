"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "@/store/useStore";

/**
 * A cinematic custom cursor: a small dot that trails an outer ring.
 * The ring scales up and reveals a label on interactive elements.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const cursor = useStore((s) => s.cursor);
  const label = useStore((s) => s.cursorLabel);
  const setPointer = useStore((s) => s.setPointer);

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
      ring.x += (pos.x - ring.x) * 0.15;
      ring.y += (pos.y - ring.y) * 0.15;
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

  const isActive = cursor !== "default";

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden md:block">
      {/* trailing ring */}
      <div
        ref={ringRef}
        className="absolute left-0 top-0 -ml-5 -mt-5"
        style={{ willChange: "transform" }}
      >
        <motion.div
          className="flex items-center justify-center rounded-full border border-paper/60"
          animate={{
            width: isActive ? 76 : 40,
            height: isActive ? 76 : 40,
            marginLeft: isActive ? -18 : 0,
            marginTop: isActive ? -18 : 0,
            borderColor: isActive
              ? "rgba(56,225,255,0.9)"
              : "rgba(238,241,251,0.5)",
          }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
        >
          <AnimatePresence>
            {label && (
              <motion.span
                key={label}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="font-mono text-[9px] uppercase tracking-[0.2em] text-paper"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* leading dot */}
      <div
        ref={dotRef}
        className="absolute left-0 top-0"
        style={{ willChange: "transform" }}
      >
        <motion.div
          className="-ml-[3px] -mt-[3px] rounded-full bg-cyan"
          animate={{
            width: isActive ? 0 : 6,
            height: isActive ? 0 : 6,
            opacity: isActive ? 0 : 1,
          }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </div>
  );
}
