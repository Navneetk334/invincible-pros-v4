"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Step = {
  key: string;
  q: string;
  hint: string;
  type: "text" | "email" | "textarea" | "chips";
  ph?: string;
  options?: string[];
};

const STEPS: Step[] = [
  { key: "name", q: "First — what should we call you?", hint: "Your name", type: "text", ph: "Ada Lovelace" },
  { key: "email", q: "Where can we reach you?", hint: "We only use it to reply", type: "email", ph: "ada@company.com" },
  {
    key: "service",
    q: "What do you need built?",
    hint: "Pick the closest fit",
    type: "chips",
    options: ["Software", "AI / ML", "Design", "Cloud / DevOps", "Hardware", "Events & Media"],
  },
  {
    key: "budget",
    q: "Rough budget in mind?",
    hint: "Ballpark is fine",
    type: "chips",
    options: ["< $10k", "$10k – 50k", "$50k – 150k", "$150k+", "Not sure yet"],
  },
  { key: "message", q: "Tell us about the project.", hint: "A few sentences is perfect", type: "textarea", ph: "What are you building, and by when?" },
];

const EASE: [number, number, number, number] = [0.33, 1, 0.68, 1];

export default function FlowForm() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const current = STEPS[step];
  const value = answers[current?.key] ?? "";
  const setValue = (v: string) =>
    setAnswers((a) => ({ ...a, [current.key]: v }));

  const canNext = current?.type === "textarea" ? true : value.trim().length > 0;
  const isLast = step === STEPS.length - 1;

  const next = () => {
    if (!canNext) return;
    if (isLast) {
      setSent(true);
      return;
    }
    setDir(1);
    setStep((s) => s + 1);
  };
  const back = () => {
    if (step === 0) return;
    setDir(-1);
    setStep((s) => s - 1);
  };

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <main className="relative flex min-h-screen flex-col bg-ink px-6 text-paper">
      {/* progress */}
      <div className="absolute inset-x-0 top-0 h-0.5 bg-paper/10">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan to-accent-2"
          animate={{ width: sent ? "100%" : `${progress}%` }}
          transition={{ duration: 0.5, ease: EASE }}
        />
      </div>

      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center py-24">
        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.div
              key={current.key}
              initial={{ opacity: 0, y: dir * 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: dir * -40 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.24em] text-cyan">
                {String(step + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
              </p>
              <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
                {current.q}
              </h2>
              <p className="mt-3 text-sm text-fog">{current.hint}</p>

              <div className="mt-10">
                {current.type === "chips" ? (
                  <div className="flex flex-wrap gap-3">
                    {current.options!.map((o) => (
                      <button
                        key={o}
                        onClick={() => {
                          setValue(o);
                          setTimeout(next, 220);
                        }}
                        className={`rounded-full border px-5 py-3 text-base transition-all ${
                          value === o
                            ? "border-cyan bg-cyan/15 text-paper"
                            : "border-paper/20 text-fog hover:border-paper/60 hover:text-paper"
                        }`}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                ) : current.type === "textarea" ? (
                  <textarea
                    autoFocus
                    rows={3}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={current.ph}
                    className="w-full resize-none border-b-2 border-paper/20 bg-transparent pb-3 font-display text-2xl text-paper placeholder:text-fog/40 focus:border-cyan focus:outline-none md:text-3xl"
                  />
                ) : (
                  <input
                    autoFocus
                    type={current.type}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && next()}
                    placeholder={current.ph}
                    className="w-full border-b-2 border-paper/20 bg-transparent pb-3 font-display text-3xl text-paper placeholder:text-fog/40 focus:border-cyan focus:outline-none md:text-5xl"
                  />
                )}
              </div>

              <div className="mt-12 flex items-center gap-4">
                <button
                  onClick={next}
                  disabled={!canNext}
                  className="group flex items-center gap-2 rounded-full bg-paper px-7 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-ink transition enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  {isLast ? "Send it" : "Continue"}
                  <span className="transition-transform group-enabled:group-hover:translate-x-1">→</span>
                </button>
                {step > 0 && (
                  <button
                    onClick={back}
                    className="font-mono text-[11px] uppercase tracking-[0.18em] text-fog transition-colors hover:text-paper"
                  >
                    ← back
                  </button>
                )}
                <span className="ml-auto hidden font-mono text-[10px] uppercase tracking-[0.2em] text-fog/60 md:block">
                  press enter
                </span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 14 }}
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan to-accent-2 text-3xl text-ink"
              >
                ✓
              </motion.div>
              <h2 className="mt-8 font-display text-4xl font-bold tracking-tight md:text-6xl">
                Thanks{answers.name ? `, ${answers.name.split(" ")[0]}` : ""}.
              </h2>
              <p className="mx-auto mt-4 max-w-md text-fog">
                Your brief is on its way to our team. We&apos;ll get back to you
                within 24 hours to start engineering the future.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
