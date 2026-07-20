"use client";

import Link from "next/link";
import { useCursor } from "@/hooks/useCursor";

/**
 * Static white wordmark logo — INVINCIBLE PROS. (the dot = Professionals).
 * `href` lets each site point the logo at its own home (defaults to the
 * in-page top anchor for the original site).
 */
export default function AnimatedLogo({ href = "#top" }: { href?: string }) {
  const link = useCursor("hover");

  return (
    <Link href={href} className="flex items-center" {...link}>
      <span className="font-display text-sm font-bold tracking-[0.14em] text-white">
        INVINCIBLE&nbsp;PROS.
      </span>
    </Link>
  );
}
