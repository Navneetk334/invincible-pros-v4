"use client";

import { motion } from "framer-motion";
import { DOMAINS } from "@/lib/services";
import { useStore } from "@/store/useStore";

/**
 * A fixed heads-up display that reads like the telemetry of an interactive
 * film — current chapter, domain and scroll position.
 */
export default function HUD() {
  const entered = useStore((s) => s.entered);
  const active = useStore((s) => s.activeDomain);
  const scroll = useStore((s) => s.scroll);

  const inJourney = entered && active >= 0 && scroll < 0.9;
  const domain = active >= 0 ? DOMAINS[active] : null;

  return (
    <motion.div
      className="fixed bottom-6 left-6 z-40 hidden select-none md:block"
      initial={{ opacity: 0, y: 12 }}
      animate={inJourney ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-fog">
        <span className="relative flex h-1.5 w-1.5">
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"
            style={{ background: domain?.color ?? "#38e1ff" }}
          />
          <span
            className="relative inline-flex h-1.5 w-1.5 rounded-full"
            style={{ background: domain?.color ?? "#38e1ff" }}
          />
        </span>
        sys.online
      </div>
      <div className="mt-2 flex items-baseline gap-3">
        <span
          className="font-display text-2xl font-bold tabular-nums"
          style={{ color: domain?.color }}
        >
          CH.{domain?.index ?? "00"}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper">
          {domain?.title ?? ""}
        </span>
      </div>
      <div className="mt-1 font-mono text-[10px] tracking-[0.2em] text-fog">
        POS {String(Math.round(scroll * 100)).padStart(3, "0")} / 100
      </div>
    </motion.div>
  );
}
