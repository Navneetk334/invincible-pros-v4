"use client";

import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";
import { useCursor } from "@/hooks/useCursor";
import Magnetic from "@/components/layout/Magnetic";

const LINKS = [
  { label: "Domains", href: "#domains" },
  { label: "Manifesto", href: "#manifesto" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const entered = useStore((s) => s.entered);
  const muted = useStore((s) => s.muted);
  const toggleMuted = useStore((s) => s.toggleMuted);
  const link = useCursor("hover");

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 md:px-12"
      initial={{ y: -40, opacity: 0 }}
      animate={entered ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.9, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
    >
      <a href="#top" className="flex items-center gap-3" {...link}>
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan" />
        </span>
        <span className="font-display text-sm font-bold tracking-[0.14em]">
          INVINCIBLE&nbsp;PROS
        </span>
      </a>

      <nav className="hidden items-center gap-8 md:flex">
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="group relative font-mono text-xs uppercase tracking-[0.2em] text-fog transition-colors hover:text-paper"
            {...link}
          >
            {l.label}
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-cyan transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-3 md:gap-5">
        {/* sound toggle */}
        <button
          type="button"
          onClick={toggleMuted}
          aria-label={muted ? "Enable sound" : "Mute sound"}
          className="flex h-9 items-end gap-[3px] rounded-full border border-paper/20 px-3 py-2 transition-colors hover:border-cyan"
          {...link}
        >
          {[0, 1, 2, 3].map((i) => (
            <motion.span
              key={i}
              className="w-[2px] rounded-full bg-cyan"
              animate={
                muted
                  ? { height: 3 }
                  : { height: [4, 12, 6, 14, 4] }
              }
              transition={
                muted
                  ? { duration: 0.2 }
                  : {
                      duration: 0.9,
                      repeat: Infinity,
                      delay: i * 0.12,
                      ease: "easeInOut",
                    }
              }
            />
          ))}
        </button>

        <Magnetic strength={0.5}>
          <a
            href="#contact"
            className="group hidden items-center gap-2 rounded-full border border-paper/20 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-paper transition-colors hover:border-cyan hover:text-cyan sm:flex"
            {...link}
          >
            Start a project
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </Magnetic>
      </div>
    </motion.header>
  );
}
