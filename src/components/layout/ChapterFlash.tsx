"use client";

import { motion } from "framer-motion";
import { DOMAINS } from "@/lib/services";
import { useStore } from "@/store/useStore";

/**
 * A quick cinematic chapter marker that wipes across the screen each time the
 * journey crosses into a new domain — a light-speed "scene cut". Stateless:
 * the keyframed element remounts (via `key`) whenever the active domain
 * changes, so it replays automatically.
 */
export default function ChapterFlash() {
  const active = useStore((s) => s.activeDomain);
  const entered = useStore((s) => s.entered);
  const journeyActive = useStore((s) => s.journeyActive);

  if (!entered || !journeyActive || active < 0) return null;
  const flash = DOMAINS[active];

  return (
    <div className="pointer-events-none fixed inset-0 z-30 flex items-center justify-center overflow-hidden">
      <motion.div
        key={active}
        className="relative flex w-full flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1, times: [0, 0.14, 0.6, 1] }}
      >
        {/* light-speed line wipe */}
        <motion.span
          className="absolute h-px w-full origin-center"
          style={{ background: flash.color }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* chapter label */}
        <div className="flex items-center gap-4">
          <span
            className="font-display text-lg font-bold tracking-tight"
            style={{ color: flash.color }}
          >
            CH.{flash.index}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-paper">
            {flash.title}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
