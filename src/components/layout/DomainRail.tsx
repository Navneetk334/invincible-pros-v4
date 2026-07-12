"use client";

import { motion } from "framer-motion";
import { DOMAINS } from "@/lib/services";
import { useStore } from "@/store/useStore";

/** Fixed vertical rail (right side) that tracks the active domain. */
export default function DomainRail() {
  const active = useStore((s) => s.activeDomain);
  const entered = useStore((s) => s.entered);
  const visible = entered && active >= 0;

  return (
    <motion.div
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-4 md:flex"
      initial={{ opacity: 0, x: 20 }}
      animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
      transition={{ duration: 0.5 }}
    >
      {DOMAINS.map((d, i) => {
        const on = i === active;
        return (
          <div key={d.id} className="flex items-center gap-3">
            <span
              className={`font-mono text-[10px] tracking-[0.2em] transition-all duration-300 ${
                on ? "text-paper opacity-100" : "text-fog opacity-40"
              }`}
              style={on ? { color: d.color } : undefined}
            >
              {d.index}
            </span>
            <motion.span
              className="block h-px rounded-full"
              animate={{
                width: on ? 34 : 14,
                backgroundColor: on ? d.color : "rgba(154,163,184,0.4)",
              }}
              transition={{ duration: 0.35 }}
            />
          </div>
        );
      })}
    </motion.div>
  );
}
