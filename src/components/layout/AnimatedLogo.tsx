"use client";

import { useCursor } from "@/hooks/useCursor";

/**
 * Static white wordmark logo — INVINCIBLE PROS. (the dot = Professionals).
 *
 * Rendered as a plain anchor (not a Next <Link>) so clicking it performs a
 * full page reload to the site home and always lands at the top — never a
 * client-side hash jump (which previously stacked `#top#top` and could crash
 * the router). `href` lets each site point at its own home.
 */
export default function AnimatedLogo({ href = "/" }: { href?: string }) {
  const link = useCursor("hover");

  return (
    <a href={href} className="flex items-center" {...link}>
      <span className="font-display text-sm font-bold tracking-[0.14em] text-white">
        INVINCIBLE&nbsp;PROS.
      </span>
    </a>
  );
}
