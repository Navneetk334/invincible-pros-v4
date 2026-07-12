"use client";

import { motion } from "framer-motion";
import { useCursor } from "@/hooks/useCursor";

export default function ServiceRow({
  name,
  index,
  color,
}: {
  name: string;
  index: number;
  color: string;
}) {
  const cursor = useCursor("view", "Expertise");

  return (
    <motion.li
      className="group relative border-b border-paper/10"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.33, 1, 0.68, 1] }}
      {...cursor}
    >
      {/* fill sweep on hover */}
      <span
        className="absolute inset-0 origin-left scale-x-0 opacity-15 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-x-100"
        style={{ background: color }}
        aria-hidden
      />
      <div className="relative flex items-center justify-between py-4 md:py-5">
        <div className="flex items-baseline gap-4 md:gap-6">
          <span className="font-mono text-[11px] text-fog">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-display text-2xl font-medium tracking-tight transition-transform duration-500 group-hover:translate-x-2 md:text-4xl">
            {name}
          </span>
        </div>
        <span
          className="translate-x-3 text-xl opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 md:text-2xl"
          style={{ color }}
        >
          →
        </span>
      </div>
    </motion.li>
  );
}
