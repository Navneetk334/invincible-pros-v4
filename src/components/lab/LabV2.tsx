"use client";

import { useState } from "react";
import Link from "next/link";
import { useCursor } from "@/hooks/useCursor";
import LabCursor from "@/components/lab/LabCursor";
import ScrambleText, { SCRAMBLE_SETS } from "@/components/lab/ScrambleText";

type CursorV = 1 | 2 | 3 | 4;

const CURSORS = [
  "Glow orb (classic)",
  "Glow orb + bright core",
  "Glow ring",
  "Comet trail",
];

export default function LabV2() {
  const [cursorV, setCursorV] = useState<CursorV>(1);
  const [scrSet, setScrSet] = useState<keyof typeof SCRAMBLE_SETS>("symbols");
  const [scrSpeed, setScrSpeed] = useState<"fast" | "normal" | "slow">("normal");
  const speedCfg = {
    fast: { duration: 8, spread: 5, changeChance: 0.5 },
    normal: { duration: 14, spread: 8, changeChance: 0.34 },
    slow: { duration: 22, spread: 12, changeChance: 0.28 },
  }[scrSpeed];
  const pill = (on: boolean) =>
    `rounded-full border px-3 py-1.5 text-xs capitalize transition-all ${
      on
        ? "border-cyan bg-cyan/10 text-paper"
        : "border-paper/15 text-fog hover:border-paper/40 hover:text-paper"
    }`;

  const start = useCursor("hover", "Start");
  const send = useCursor("hover", "Send");
  const viewLink = useCursor("hover", "Open");
  const viewCard = useCursor("view", "View");

  return (
    <div className="relative min-h-screen bg-ink text-paper md:cursor-none">
      <LabCursor variant={cursorV} />

      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan">
          Cursor lab
        </p>
        <h1 className="mt-3 font-display text-[12vw] font-bold uppercase leading-[0.9] tracking-tight md:text-[4.5vw]">
          Glow orb <span className="gradient-text">variants.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-fog">
          Move your mouse around and hover the elements below to feel each
          style. Switch variants with the controls, then tell me the number you
          want and I&rsquo;ll make it the real site cursor.
        </p>

        {/* Cursor variant switcher */}
        <div className="mt-10 rounded-2xl border border-paper/12 p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan">
            Custom cursor
          </p>
          <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {CURSORS.map((o, i) => {
              const v = (i + 1) as CursorV;
              const on = cursorV === v;
              return (
                <button
                  key={o}
                  type="button"
                  onClick={() => setCursorV(v)}
                  className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition-all ${
                    on
                      ? "border-cyan bg-cyan/10 text-paper"
                      : "border-paper/15 text-fog hover:border-paper/40 hover:text-paper"
                  }`}
                >
                  <span>
                    <span className="font-mono text-[10px] text-fog">0{v}</span>{" "}
                    {o}
                  </span>
                  {on && <span className="text-cyan">●</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Playground */}
        <div className="mt-16 border-t border-paper/10 pt-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog">
            Playground
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              type="button"
              className="rounded-full px-8 py-4 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-ink"
              style={{
                backgroundImage:
                  "linear-gradient(100deg, var(--color-cyan), var(--color-accent-2))",
              }}
              {...start}
            >
              Start a project →
            </button>
            <button
              type="button"
              className="rounded-full border border-paper/25 px-8 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-paper"
              {...send}
            >
              Send a message
            </button>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-fog underline underline-offset-4"
              {...viewLink}
            >
              A text link
            </a>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {["Software", "Intelligence", "Design", "Infrastructure", "Hardware", "Experience"].map(
              (t) => (
                <div
                  key={t}
                  className="rounded-2xl border border-paper/12 p-8 transition-colors hover:border-paper/30"
                  {...viewCard}
                >
                  <div className="h-2.5 w-2.5 rounded-full bg-cyan" />
                  <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight">
                    {t}
                  </h3>
                  <p className="mt-2 text-sm text-fog">
                    Hover me to see the interactive cursor state.
                  </p>
                </div>
              ),
            )}
          </div>

          <h2
            className="mt-16 font-display text-[13vw] font-bold uppercase leading-[0.9] tracking-tight md:text-[6vw]"
            {...useCursor("hover")}
          >
            Hover the big text.
          </h2>

          <p className="mt-12 text-sm text-fog">
            The <strong className="text-paper">Features + Columns</strong> mega
            menu you picked is now live in the real header —{" "}
            <Link href="/v2" className="text-cyan underline underline-offset-2">
              open the site
            </Link>{" "}
            and hover “Services”.
          </p>
        </div>

        {/* Text scramble (decode on hover) */}
        <div className="mt-16 border-t border-paper/10 pt-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan">
            Text scramble — decode on hover
          </p>
          <p className="mt-2 max-w-xl text-sm text-fog">
            Hover the links, buttons and heading below. Tune the glyph set and
            speed, then tell me which combo you want and I&rsquo;ll wire it into
            the real nav and buttons.
          </p>

          {/* controls */}
          <div className="mt-6 flex flex-wrap gap-x-10 gap-y-5">
            <div>
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fog">
                Character set
              </p>
              <div className="flex gap-2">
                {(["symbols", "letters", "binary"] as const).map((s) => (
                  <button key={s} type="button" onClick={() => setScrSet(s)} className={pill(scrSet === s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fog">
                Speed
              </p>
              <div className="flex gap-2">
                {(["fast", "normal", "slow"] as const).map((s) => (
                  <button key={s} type="button" onClick={() => setScrSpeed(s)} className={pill(scrSpeed === s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* demo: nav links */}
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 rounded-2xl border border-paper/12 px-6 py-5">
            {["Home", "Services", "Work", "About", "Contact"].map((l) => (
              <ScrambleText
                key={l}
                text={l}
                chars={SCRAMBLE_SETS[scrSet]}
                {...speedCfg}
                className="cursor-pointer font-mono text-xs uppercase tracking-[0.2em] text-fog transition-colors hover:text-paper"
              />
            ))}
          </div>

          {/* demo: buttons */}
          <div className="mt-6 flex flex-wrap gap-4">
            <span
              className="inline-flex cursor-pointer rounded-full px-8 py-4 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-ink"
              style={{
                backgroundImage:
                  "linear-gradient(100deg, var(--color-cyan), var(--color-accent-2))",
              }}
            >
              <ScrambleText text="Start a project" chars={SCRAMBLE_SETS[scrSet]} {...speedCfg} />
            </span>
            <span className="inline-flex cursor-pointer rounded-full border border-paper/25 px-8 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-paper">
              <ScrambleText text="Send a message" chars={SCRAMBLE_SETS[scrSet]} {...speedCfg} />
            </span>
          </div>

          {/* demo: heading */}
          <ScrambleText
            text="ENGINEERING THE FUTURE"
            chars={SCRAMBLE_SETS[scrSet]}
            {...speedCfg}
            className="mt-12 block cursor-pointer font-display text-[9vw] font-bold uppercase leading-[0.95] tracking-tight md:text-[3.4vw]"
          />
        </div>
      </div>
    </div>
  );
}
