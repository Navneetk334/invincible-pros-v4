"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";

/**
 * NOVA — a friendly hovering drone mascot. Bobs continuously, its eyes track
 * the cursor, and it does a little hop when clicked.
 */
export default function NovaDrone() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const eyesRef = useRef<SVGGElement>(null);
  const [hop, setHop] = useState(false);

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    const wrap = wrapRef.current;
    const eyes = eyesRef.current;
    if (!wrap || !eyes) return;
    const r = wrap.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
    const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
    const cx = Math.max(-3, Math.min(3, dx * 3));
    const cy = Math.max(-2, Math.min(2, dy * 2));
    eyes.style.transform = `translate(${cx}px, ${cy}px)`;
  };
  const doHop = () => {
    setHop(true);
    window.setTimeout(() => setHop(false), 420);
  };

  return (
    <div
      ref={wrapRef}
      onPointerMove={move}
      onPointerDown={doHop}
      className="absolute inset-0 flex items-center justify-center"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div animate={hop ? { y: -22, scale: 1.05 } : { y: 0, scale: 1 }} transition={{ type: "spring", stiffness: 400, damping: 12 }}>
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <ellipse cx="60" cy="104" rx="30" ry="5" fill="rgba(77,107,255,0.18)" />
            <defs>
              <linearGradient id="nova-body" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#eef1fb" />
                <stop offset="1" stopColor="#9aa3b8" />
              </linearGradient>
            </defs>
            <rect x="30" y="28" width="60" height="52" rx="26" fill="url(#nova-body)" />
            <rect x="38" y="40" width="44" height="28" rx="14" fill="#050609" />
            <g ref={eyesRef} style={{ transition: "transform 0.15s ease-out" }}>
              <circle cx="52" cy="54" r="5.5" fill="#38e1ff" />
              <circle cx="70" cy="54" r="5.5" fill="#38e1ff" />
            </g>
            <rect x="18" y="50" width="14" height="6" rx="3" fill="#7c5cff" />
            <rect x="88" y="50" width="14" height="6" rx="3" fill="#7c5cff" />
            <circle cx="60" cy="24" r="3" fill="#38e1ff" />
            <rect x="59" y="18" width="2" height="8" fill="#7c5cff" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
