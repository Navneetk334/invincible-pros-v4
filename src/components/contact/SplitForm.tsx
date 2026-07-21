"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { sendBrief } from "./submit";
import ServicePicker from "./ServicePicker";

const STORAGE = "ip-split-form";

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
          active ? "top-0 text-[10px] text-cyan" : "top-5 text-xs text-fog"
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
          className="w-full resize-none border-b border-paper/20 bg-transparent pb-2 pt-6 text-paper focus:outline-none"
        />
      ) : (
        <input
          type={type}
          value={value}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border-b border-paper/20 bg-transparent pb-2 pt-6 text-paper focus:outline-none"
        />
      )}
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

  // Restore in-progress input so closing the modal doesn't lose work.
  useEffect(() => {
    let saved: { form?: typeof form; services?: string[] } | null = null;
    try {
      saved = JSON.parse(localStorage.getItem(STORAGE) || "null");
    } catch {
      saved = null;
    }
    if (!saved) return;
    const savedForm = saved.form;
    const savedServices = saved.services;
    const id = requestAnimationFrame(() => {
      if (savedForm) setForm(savedForm);
      if (Array.isArray(savedServices)) setServices(savedServices);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE, JSON.stringify({ form, services }));
    } catch {
      /* ignore */
    }
  }, [form, services]);

  return (
    <div className="text-paper">
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
                try {
                  localStorage.removeItem(STORAGE);
                } catch {
                  /* ignore */
                }
              } catch {
                setStatus("error");
              }
            }}
            className="space-y-5"
          >
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan">
                Send a message
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight md:text-3xl">
                Let&apos;s talk.
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-fog">
                Tell us what you&apos;re building. We reply within 24 hours.
              </p>
            </div>

            <Floating label="Your name" value={form.name} onChange={set("name")} />
            <Floating label="Email" type="email" value={form.email} onChange={set("email")} />
            <Floating label="Company (optional)" value={form.company} onChange={set("company")} />

            <div>
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-fog">
                What do you need? {services.length > 0 && `(${services.length})`}
              </p>
              <ServicePicker selected={services} onToggle={toggle} multiple />
            </div>

            <Floating label="About the project" textarea value={form.message} onChange={set("message")} />

            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group flex w-full items-center justify-center gap-2 rounded-full py-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-ink disabled:opacity-60"
              style={{ backgroundImage: "linear-gradient(100deg, var(--color-cyan), var(--color-accent-2))" }}
            >
              {status === "sending" ? "Sending…" : "Send project brief"}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </motion.button>
            {status === "error" && (
              <p className="text-center font-mono text-xs text-[#fb7185]">
                Couldn&apos;t send — please try again, or email
                admin@invinciblepros.com
              </p>
            )}
          </motion.form>
        ) : (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-8 text-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 13 }}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan to-accent-2 text-2xl text-ink"
            >
              ✓
            </motion.div>
            <h3 className="mt-6 font-display text-2xl font-bold tracking-tight md:text-3xl">
              Brief received
            </h3>
            <p className="mt-3 max-w-xs text-sm text-fog">
              Thanks{form.name ? `, ${form.name.split(" ")[0]}` : ""}. We&apos;ll
              be in touch within 24 hours.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
