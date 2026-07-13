"use client";

import { useCursor } from "@/hooks/useCursor";

/** Static white wordmark logo — INVINCIBLE PROS. (the dot = Professionals). */
export default function AnimatedLogo() {
  const link = useCursor("hover");

  return (
    <a href="#top" className="flex items-center" {...link}>
      <span className="font-display text-sm font-bold tracking-[0.14em] text-white">
        INVINCIBLE&nbsp;PROS.
      </span>
    </a>
  );
}
