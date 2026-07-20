"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";
import { useCursor } from "@/hooks/useCursor";
import Magnetic from "@/components/layout/Magnetic";
import AnimatedLogo from "@/components/layout/AnimatedLogo";

// Absolute targets so the links work from any page (home, service, about),
// not just when the homepage sections happen to be mounted.
const LINKS = [
  { label: "Services", href: "/v2#services" },
  { label: "Work", href: "/v2#work" },
  { label: "Process", href: "/v2#process" },
  { label: "About", href: "/v2/about" },
];

export default function NavbarV2() {
  const entered = useStore((s) => s.entered);
  const openContact = useStore((s) => s.openContact);
  const link = useCursor("hover");

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 md:px-12"
      initial={{ y: -40, opacity: 0 }}
      animate={entered ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.9, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
    >
      <AnimatedLogo href="/v2#top" />

      <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="group relative font-mono text-xs uppercase tracking-[0.2em] text-fog transition-colors hover:text-paper"
            {...link}
          >
            {l.label}
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-cyan transition-all duration-300 group-hover:w-full" />
          </Link>
        ))}
        <button
          type="button"
          onClick={() => openContact("split")}
          className="group relative font-mono text-xs uppercase tracking-[0.2em] text-fog transition-colors hover:text-paper"
          {...link}
        >
          Contact
          <span className="absolute -bottom-1 left-0 h-px w-0 bg-cyan transition-all duration-300 group-hover:w-full" />
        </button>
      </nav>

      <Magnetic strength={0.5}>
        <button
          type="button"
          onClick={() => openContact("flow")}
          className="group flex items-center gap-2 rounded-full border border-paper/20 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-paper transition-colors hover:border-cyan hover:text-cyan"
          {...link}
        >
          Start a project
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </button>
      </Magnetic>
    </motion.header>
  );
}
