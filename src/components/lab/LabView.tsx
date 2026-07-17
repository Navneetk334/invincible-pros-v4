"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { LabScene } from "./LabCanvas";
import { phaseLabel, loopAmount, smooth, labClock } from "./loop";

const LabCanvas = dynamic(() => import("./LabCanvas"), { ssr: false });

export default function LabView({ scene = "chaos" }: { scene?: LabScene }) {
  const [label, setLabel] = useState("Many Problems");
  const [logo, setLogo] = useState(0); // 0..1 crisp wordmark reveal

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      // read the same clock the particles use → perfectly synced handoff
      const e = labClock.t;
      setLabel(phaseLabel(e));
      setLogo(smooth((loopAmount(e) - 0.78) / 0.18));
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

      {/* crisp final wordmark — same clean static-white look as the header logo */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center px-6"
        style={{ opacity: logo }}
      >
        <h1
          className="text-center font-display font-bold uppercase leading-[0.82] tracking-[-0.02em] text-white"
          style={{
            fontSize: "clamp(2.5rem, 13vw, 13rem)",
            transform: `scale(${0.97 + logo * 0.03})`,
          }}
        >
          Invincible
          <br />
          Pros.
        </h1>
      </div>

      {/* centred story caption */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6">
        <AnimatePresence mode="wait">
          {label && (
            <motion.p
              key={label}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
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
