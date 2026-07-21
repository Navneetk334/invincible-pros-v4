"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { sendBrief } from "./submit";
import ServicePicker from "./ServicePicker";

type Step = {
  key: string;
  q: string;
  hint: string;
  type: "text" | "email" | "textarea" | "chips" | "service";
  ph?: string;
  options?: string[];
};

const STEPS: Step[] = [
  { key: "name", q: "What should we call you?", hint: "Your name", type: "text", ph: "Ada Lovelace" },
  { key: "email", q: "Where can we reach you?", hint: "We only use it to reply", type: "email", ph: "ada@company.com" },
  {
    key: "service",
    q: "What do you need built?",
    hint: "Search or pick the service — no need to remember it",
    type: "service",
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
const STORAGE = "ip-flow-form";

export default function FlowForm() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  // Restore any in-progress answers so closing the modal never loses work.
  useEffect(() => {
    let saved: Record<string, string> | null = null;
    try {
      saved = JSON.parse(localStorage.getItem(STORAGE) || "null");
    } catch {
      saved = null;
    }
    if (!saved || typeof saved !== "object") return;
    const id = requestAnimationFrame(() =>
      setAnswers(saved as Record<string, string>),
    );
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE, JSON.stringify(answers));
    } catch {
      /* ignore */
    }
  }, [answers]);

  const current = STEPS[step];
  const value = answers[current?.key] ?? "";
  const setValue = (v: string) => setAnswers((a) => ({ ...a, [current.key]: v }));

  const canNext = current?.type === "textarea" ? true : value.trim().length > 0;
  const isLast = step === STEPS.length - 1;

  const submit = async () => {
    setStatus("sending");
    try {
      await sendBrief("Start a project (Flow)", {
        Name: answers.name ?? "",
        Email: answers.email ?? "",
        Service: answers.service ?? "",
        Budget: answers.budget ?? "",
        Message: answers.message ?? "",
      });
      setStatus("sent");
      try {
        localStorage.removeItem(STORAGE);
      } catch {
        /* ignore */
      }
    } catch {
      setStatus("error");
    }
  };

  const next = () => {
    if (status === "sending" || !canNext) return;
    if (isLast) {
      submit();
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
    <div className="text-paper">
      {/* progress */}
      <div className="mb-6 h-0.5 w-full rounded bg-paper/10">
        <motion.div
          className="h-full rounded bg-gradient-to-r from-cyan to-accent-2"
          animate={{ width: status === "sent" ? "100%" : `${progress}%` }}
          transition={{ duration: 0.5, ease: EASE }}
        />
      </div>

      <AnimatePresence mode="wait">
        {status !== "sent" ? (
          <motion.div
            key={current.key}
            initial={{ opacity: 0, y: dir * 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: dir * -24 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.24em] text-cyan">
              {String(step + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")} · Start a project
            </p>
            <h2 className="font-display text-2xl font-bold leading-[1.1] tracking-tight md:text-3xl">
              {current.q}
            </h2>
            <p className="mt-2 text-sm text-fog">{current.hint}</p>

            <div className="mt-6">
              {current.type === "service" ? (
                <ServicePicker
                  selected={value ? [value] : []}
                  onToggle={(name) => {
                    setValue(name);
                    setTimeout(next, 240);
                  }}
                />
              ) : current.type === "chips" ? (
                <div className="flex flex-wrap gap-2.5">
                  {current.options!.map((o) => (
                    <button
                      key={o}
                      type="button"
                      onClick={() => {
                        setValue(o);
                        setTimeout(next, 220);
                      }}
                      className={`rounded-full border px-4 py-2.5 text-sm transition-all ${
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
                  className="w-full resize-none border-b-2 border-paper/20 bg-transparent pb-2 font-display text-lg text-paper placeholder:text-fog/40 focus:border-cyan focus:outline-none md:text-xl"
                />
              ) : (
                <input
                  autoFocus
                  type={current.type}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && next()}
                  placeholder={current.ph}
                  className="w-full border-b-2 border-paper/20 bg-transparent pb-2 font-display text-2xl text-paper placeholder:text-fog/40 focus:border-cyan focus:outline-none md:text-3xl"
                />
              )}
            </div>

            <div className="mt-8 flex items-center gap-4">
              <button
                type="button"
                onClick={next}
                disabled={!canNext || status === "sending"}
                className="group flex items-center gap-2 rounded-full bg-paper px-6 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-ink transition enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-30"
              >
                {status === "sending" ? "Sending…" : isLast ? "Send it" : "Continue"}
                <span className="transition-transform group-enabled:group-hover:translate-x-1">→</span>
              </button>
              {step > 0 && status !== "sending" && (
                <button
                  type="button"
                  onClick={back}
                  className="font-mono text-[11px] uppercase tracking-[0.18em] text-fog transition-colors hover:text-paper"
                >
                  ← back
                </button>
              )}
            </div>

            {status === "error" && (
              <p className="mt-4 font-mono text-xs text-[#fb7185]">
                Couldn&apos;t send just now — please try again, or email
                admin@invinciblepros.com
              </p>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="py-4 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 14 }}
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan to-accent-2 text-2xl text-ink"
            >
              ✓
            </motion.div>
            <h2 className="mt-6 font-display text-2xl font-bold tracking-tight md:text-3xl">
              Thanks{answers.name ? `, ${answers.name.split(" ")[0]}` : ""}.
            </h2>
            <p className="mx-auto mt-3 max-w-xs text-sm text-fog">
              Your brief has been sent. We&apos;ll get back to you within 24
              hours to start engineering the future.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
