"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";

/**
 * CORE — a living energy orb. Breathes continuously, drifts toward the cursor,
 * and emits a flare when clicked. On-brand (cyan/violet gradient).
 */
export default function CoreOrb() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const [flares, setFlares] = useState<number[]>([]);
  const idRef = useRef(0);

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    const wrap = wrapRef.current;
    const orb = orbRef.current;
    if (!wrap || !orb) return;
    const r = wrap.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width / 2) * 0.12;
    const dy = (e.clientY - r.top - r.height / 2) * 0.12;
    orb.style.transform = `translate(${dx}px, ${dy}px)`;
  };
  const reset = () => {
    if (orbRef.current) orbRef.current.style.transform = "translate(0px, 0px)";
  };
  const flare = () => {
    const id = idRef.current++;
    setFlares((p) => [...p, id]);
    window.setTimeout(() => setFlares((p) => p.filter((f) => f !== id)), 700);
  };

  return (
    <div
      ref={wrapRef}
      onPointerMove={move}
      onPointerLeave={reset}
      onPointerDown={flare}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div ref={orbRef} className="relative transition-transform duration-300 ease-out">
        <motion.div
          className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
          style={{
            background: "radial-gradient(circle, rgba(56,225,255,0.5), transparent 70%)",
          }}
          animate={{ scale: [1, 1.18, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="relative h-24 w-24 rounded-full"
          style={{
            background: "radial-gradient(circle at 35% 30%, rgba(56,225,255,0.95), rgba(124,92,255,0.9) 55%, rgba(77,107,255,0.85))",
            boxShadow: "0 0 40px rgba(77,107,255,0.6), inset 0 0 30px rgba(255,255,255,0.25)",
          }}
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute inset-0 rounded-full border border-white/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{ borderTopColor: "rgba(255,255,255,0.7)" }}
          />
        </motion.div>
        <AnimatePresence>
          {flares.map((id) => (
            <motion.span
              key={id}
              className="pointer-events-none absolute left-1/2 top-1/2 rounded-full border border-cyan"
              initial={{ width: 96, height: 96, x: -48, y: -48, opacity: 0.8 }}
              animate={{ width: 220, height: 220, x: -110, y: -110, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
