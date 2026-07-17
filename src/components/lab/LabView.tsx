"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { LabScene } from "./LabCanvas";
import { phaseLabel } from "./loop";

const LabCanvas = dynamic(() => import("./LabCanvas"), { ssr: false });

export default function LabView({ scene = "chaos" }: { scene?: LabScene }) {
  const [label, setLabel] = useState("Many Problems");

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      setLabel(phaseLabel((t - start) / 1000));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-ink text-paper">
      <div className="absolute inset-0">
        <LabCanvas scene={scene} />
      </div>

      {/* big centred caption — "Many Problems" → "One Solution" (then the logo forms) */}
      <div className="pointer-events-none absolute inset-x-0 top-[22%] flex justify-center px-6">
        <AnimatePresence mode="wait">
          {label && (
            <motion.p
              key={label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.33, 1, 0.68, 1] }}
              className="text-center font-display text-4xl font-bold tracking-tight md:text-6xl"
            >
              {label}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
