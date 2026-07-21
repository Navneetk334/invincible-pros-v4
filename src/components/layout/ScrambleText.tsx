"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export const SCRAMBLE_SETS = {
  symbols: "!<>-_\\/[]{}—=+*^?#",
  letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  binary: "01",
};

type Cell = { char: string; scrambling: boolean };

/**
 * Dependency-free "decode / scramble" text effect. On hover (pointer enter),
 * every character flickers through random glyphs, then resolves to the real
 * text in a left-to-right wave. Pure requestAnimationFrame — no GSAP plugin.
 */
export default function ScrambleText({
  text,
  className,
  chars = SCRAMBLE_SETS.symbols,
  duration = 14,
  spread = 8,
  changeChance = 0.34,
  activeClassName = "text-cyan",
}: {
  text: string;
  className?: string;
  chars?: string;
  duration?: number;
  spread?: number;
  changeChance?: number;
  /** class applied to a character while it is still scrambling */
  activeClassName?: string;
}) {
  const [cells, setCells] = useState<Cell[]>(() =>
    text.split("").map((c) => ({ char: c, scrambling: false })),
  );
  const raf = useRef<number | null>(null);

  const run = useCallback(() => {
    if (raf.current) cancelAnimationFrame(raf.current);
    const rnd = () => chars[Math.floor(Math.random() * chars.length)];
    const state = text.split("").map((to) => ({
      to,
      end: duration + Math.floor(Math.random() * spread * 2),
      cur: to === " " ? " " : rnd(),
    }));
    let frame = 0;

    const tick = () => {
      let done = 0;
      const next: Cell[] = state.map((s) => {
        if (s.to === " ") return { char: " ", scrambling: false };
        if (frame >= s.end) {
          done++;
          return { char: s.to, scrambling: false };
        }
        if (Math.random() < changeChance) s.cur = rnd();
        return { char: s.cur, scrambling: true };
      });
      setCells(next);
      if (done === state.length) {
        raf.current = null;
        return;
      }
      frame++;
      raf.current = requestAnimationFrame(tick);
    };
    tick();
  }, [text, chars, duration, spread, changeChance]);

  useEffect(
    () => () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    },
    [],
  );

  return (
    <span className={className} onPointerEnter={run} aria-label={text}>
      {cells.map((c, i) => (
        <span key={i} aria-hidden className={c.scrambling ? activeClassName : undefined}>
          {c.char === " " ? "\u00A0" : c.char}
        </span>
      ))}
    </span>
  );
}
