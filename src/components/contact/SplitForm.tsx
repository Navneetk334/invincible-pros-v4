"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { sendBrief } from "./submit";

const SERVICES = ["Software", "AI / ML", "Design", "Cloud / DevOps", "Hardware", "Events & Media"];

function Floating({
  label,
  value,
  onChange,
  type = "text",
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  textarea?: boolean;
}) {
  const [focus, setFocus] = useState(false);
  const active = focus || value.length > 0;
  return (
    <div className="relative">
      <label
        className={`pointer-events-none absolute left-0 font-mono uppercase tracking-[0.16em] transition-all duration-300 ${
          active ? "top-0 text-[10px] text-cyan" : "top-6 text-xs text-fog"
        }`}
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          rows={2}
          value={value}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={(e) => onChange(e.target.value)}
          className="w-full resize-none border-b border-paper/20 bg-transparent pb-2 pt-7 text-paper focus:outline-none"
        />
      ) : (
        <input
          type={type}
          value={value}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border-b border-paper/20 bg-transparent pb-2 pt-7 text-paper focus:outline-none"
        />
      )}
      {/* underline draw */}
      <motion.span
        className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-cyan to-accent-2"
        initial={false}
        animate={{ width: active ? "100%" : "0%" }}
        transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
      />
    </div>
  );
}

export default function SplitForm() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [services, setServices] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));
  const toggle = (s: string) =>
    setServices((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));

  return (
    <main className="relative min-h-screen overflow-hidden bg-ink text-paper">
      {/* ambient animated blobs */}
      <motion.div
        className="pointer-events-none absolute -left-40 top-0 h-[36rem] w-[36rem] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #4d6bff, transparent 70%)" }}
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -right-40 bottom-0 h-[32rem] w-[32rem] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, #7c5cff, transparent 70%)" }}
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto grid min-h-screen w-full max-w-6xl items-center gap-12 px-6 py-24 md:grid-cols-2 md:gap-16 md:px-10">
        {/* left statement */}
        <div>
          <motion.p
            className="font-mono text-xs uppercase tracking-[0.3em] text-cyan"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Start a project
          </motion.p>
          <h1 className="mt-6 font-display text-6xl font-bold uppercase leading-[0.9] tracking-tight md:text-8xl">
            <span className="block">Let&apos;s</span>
            <span className="block">engineer</span>
            <span className="block bg-gradient-to-r from-cyan to-accent-2 bg-clip-text text-transparent">
              the future
            </span>
          </h1>
          <p className="mt-8 max-w-sm leading-relaxed text-fog">
            Tell us what you&apos;re building. We reply within 24 hours with a
            plan, a team, and a path to launch.
          </p>
          <a
            href="mailto:hello@invinciblepros.com"
            className="mt-8 inline-block font-mono text-sm text-paper underline decoration-cyan/50 underline-offset-4 transition-colors hover:text-cyan"
          >
            hello@invinciblepros.com
          </a>
        </div>

        {/* right glass form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="rounded-2xl border border-paper/10 bg-white/[0.03] p-6 backdrop-blur-xl md:p-8"
        >
          <AnimatePresence mode="wait">
            {status !== "sent" ? (
              <motion.form
                key="form"
                exit={{ opacity: 0, scale: 0.98 }}
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (status === "sending") return;
                  setStatus("sending");
                  try {
                    await sendBrief("Contact (Split)", {
                      Name: form.name,
                      Email: form.email,
                      Company: form.company,
                      Services: services.join(", "),
                      Message: form.message,
                    });
                    setStatus("sent");
                  } catch {
                    setStatus("error");
                  }
                }}
                className="space-y-6"
              >
                <Floating label="Your name" value={form.name} onChange={set("name")} />
                <Floating label="Email" type="email" value={form.email} onChange={set("email")} />
                <Floating label="Company (optional)" value={form.company} onChange={set("company")} />

                <div>
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-fog">
                    What do you need?
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SERVICES.map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => toggle(s)}
                        className={`rounded-full border px-4 py-2 text-xs transition-all ${
                          services.includes(s)
                            ? "border-cyan bg-cyan/15 text-paper"
                            : "border-paper/20 text-fog hover:border-paper/50"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <Floating label="About the project" textarea value={form.message} onChange={set("message")} />

                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex w-full items-center justify-center gap-2 rounded-full py-4 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-ink disabled:opacity-60"
                  style={{ backgroundImage: "linear-gradient(100deg, var(--color-cyan), var(--color-accent-2))" }}
                >
                  {status === "sending" ? "Sending…" : "Send project brief"}
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </motion.button>
                {status === "error" && (
                  <p className="text-center font-mono text-xs text-[#fb7185]">
                    Couldn&apos;t send — please try again, or email
                    hello@invinciblepros.com
                  </p>
                )}
              </motion.form>
            ) : (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center py-10 text-center"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 13 }}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan to-accent-2 text-2xl text-ink"
                >
                  ✓
                </motion.div>
                <h3 className="mt-6 font-display text-3xl font-bold tracking-tight">
                  Brief received
                </h3>
                <p className="mt-3 max-w-xs text-sm text-fog">
                  Thanks{form.name ? `, ${form.name.split(" ")[0]}` : ""}. We&apos;ll
                  be in touch within 24 hours.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
}
