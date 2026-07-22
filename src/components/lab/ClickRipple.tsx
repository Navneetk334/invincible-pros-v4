"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";

type Ripple = { id: number; x: number; y: number };

/** Expanding rings emitted wherever you click/tap. */
export default function ClickRipple() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const idRef = useRef(0);

  const spawn = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const id = idRef.current++;
    setRipples((prev) => [...prev, { id, x: e.clientX - r.left, y: e.clientY - r.top }]);
    window.setTimeout(() => {
      setRipples((prev) => prev.filter((rp) => rp.id !== id));
    }, 900);
  };

  return (
    <div
      onPointerDown={spawn}
      className="absolute inset-0 flex items-center justify-center"
    >
      <span className="pointer-events-none font-mono text-[11px] uppercase tracking-[0.2em] text-fog/60">
        Click anywhere
      </span>
      <AnimatePresence>
        {ripples.map((rp) => (
          <motion.span
            key={rp.id}
            className="pointer-events-none absolute rounded-full border border-cyan/70"
            style={{ left: rp.x, top: rp.y }}
            initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 0.8 }}
            animate={{ width: 260, height: 260, x: -130, y: -130, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
