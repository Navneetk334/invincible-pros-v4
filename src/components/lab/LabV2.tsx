"use client";

import { useState } from "react";
import { useCursor } from "@/hooks/useCursor";
import LabCursor from "@/components/lab/LabCursor";
import LabMegaMenu from "@/components/lab/LabMegaMenu";

type V = 1 | 2 | 3;

function ControlCard({
  title,
  note,
  options,
  value,
  onSelect,
}: {
  title: string;
  note?: string;
  options: string[];
  value: V;
  onSelect: (v: V) => void;
}) {
  return (
    <div className="rounded-2xl border border-paper/12 p-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan">
        {title}
      </p>
      {note && <p className="mt-1 text-xs text-fog">{note}</p>}
      <div className="mt-4 flex flex-col gap-2.5">
        {options.map((o, i) => {
          const v = (i + 1) as V;
          const on = value === v;
          return (
            <button
              key={o}
              type="button"
              onClick={() => onSelect(v)}
              className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition-all ${
                on
                  ? "border-cyan bg-cyan/10 text-paper"
                  : "border-paper/15 text-fog hover:border-paper/40 hover:text-paper"
              }`}
            >
              <span>
                <span className="font-mono text-[10px] text-fog">
                  0{v}
                </span>{" "}
                {o}
              </span>
              {on && <span className="text-cyan">●</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function LabV2() {
  const [cursorV, setCursorV] = useState<V>(1);
  const [menuV, setMenuV] = useState<V>(1);

  const start = useCursor("hover", "Start");
  const send = useCursor("hover", "Send");
  const viewLink = useCursor("hover", "Open");
  const viewCard = useCursor("view", "View");

  return (
    <div className="relative min-h-screen bg-ink text-paper md:cursor-none">
      <LabCursor variant={cursorV} />

      {/* Menu preview (hover “Services”) */}
      <div className="sticky top-0 z-40">
        <LabMegaMenu variant={menuV} />
      </div>

      <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan">
          Design lab
        </p>
        <h1 className="mt-3 font-display text-[12vw] font-bold uppercase leading-[0.9] tracking-tight md:text-[4.5vw]">
          Pick your <span className="gradient-text">favourites.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-fog">
          Hover <strong className="text-paper">Services</strong> in the bar
          above to preview each mega-menu layout. Move your mouse around and
          hover the elements below to feel each cursor. Switch options with the
          controls, then tell me which menu + cursor you want and I&rsquo;ll make
          it the real one.
        </p>

        {/* Controls */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <ControlCard
            title="Services mega menu"
            note="Hover “Services” in the top bar to see it."
            options={["Featured + columns", "Icon cards", "Interactive split"]}
            value={menuV}
            onSelect={setMenuV}
          />
          <ControlCard
            title="Custom cursor"
            note="Move your mouse and hover the playground."
            options={["Blend dot", "Gradient glow orb", "Precision bracket"]}
            value={cursorV}
            onSelect={setCursorV}
          />
        </div>

        {/* Cursor playground */}
        <div className="mt-16 border-t border-paper/10 pt-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog">
            Cursor playground
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
            <a href="#" onClick={(e) => e.preventDefault()} className="text-fog underline underline-offset-4" {...viewLink}>
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
        </div>
      </div>
    </div>
  );
}
