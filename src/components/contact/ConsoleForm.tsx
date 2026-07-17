"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SERVICES = ["Software", "AI / ML", "Design", "Cloud / DevOps", "Hardware", "Events"];

function Dots() {
  return (
    <motion.span
      animate={{ opacity: [0.2, 1, 0.2] }}
      transition={{ duration: 1.2, repeat: Infinity }}
    >
      {" ..."}
    </motion.span>
  );
}

function Prompt({ label }: { label: string }) {
  return (
    <span className="text-fog">
      <span className="text-cyan">&gt;</span> ~ <span className="text-paper">{label}</span>
    </span>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <Prompt label={label} />
      <input
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded border border-paper/15 bg-black/30 px-3 py-2.5 text-paper placeholder:text-fog/40 focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan/50"
      />
    </div>
  );
}

export default function ConsoleForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [project, setProject] = useState("");
  const [sent, setSent] = useState(false);
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setBooted(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-4 py-24">
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 26, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
          className="overflow-hidden rounded-xl border border-paper/15 bg-[#0a0d16] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
        >
          <div className="flex items-center gap-2 border-b border-paper/10 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 font-mono text-[11px] text-fog">
              new-project — secure channel
            </span>
          </div>

          <div className="p-6 font-mono text-sm md:p-8">
            <p className="text-fog">
              <span className="text-cyan">&gt;</span> establishing secure channel
              {!booted && <Dots />}
            </p>

            <AnimatePresence mode="wait">
              {booted && !sent && (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (name && email) setSent(true);
                  }}
                  className="mt-4 space-y-5"
                >
                  <p className="text-[#28c840]">
                    ✓ channel ready — describe your project below.
                  </p>
                  <Field label="name" value={name} onChange={setName} placeholder="Ada Lovelace" />
                  <Field
                    label="email"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder="ada@company.com"
                  />
                  <div>
                    <Prompt label="service" />
                    <div className="mt-2 flex flex-wrap gap-2">
                      {SERVICES.map((s) => (
                        <button
                          type="button"
                          key={s}
                          onClick={() => setService(s)}
                          className={`rounded border px-3 py-1.5 text-xs transition-colors ${
                            service === s
                              ? "border-cyan bg-cyan/15 text-cyan"
                              : "border-paper/20 text-fog hover:border-paper/50"
                          }`}
                        >
                          {service === s ? "◉" : "○"} {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Prompt label="brief" />
                    <textarea
                      value={project}
                      onChange={(e) => setProject(e.target.value)}
                      rows={3}
                      placeholder="What are you building?"
                      className="mt-2 w-full resize-none rounded border border-paper/15 bg-black/30 p-3 text-paper placeholder:text-fog/40 focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan/50"
                    />
                  </div>
                  <button
                    type="submit"
                    className="group flex items-center gap-2 rounded bg-cyan px-4 py-2.5 font-semibold text-ink transition-transform hover:-translate-y-0.5"
                  >
                    <span className="text-ink/60">$</span> run send-brief.sh
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </button>
                </motion.form>
              )}

              {sent && (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 space-y-2"
                >
                  <p className="text-fog">
                    $ transmitting brief
                    <Dots />
                  </p>
                  <p className="text-[#28c840]">
                    ✓ received{name ? `, ${name.split(" ")[0]}` : ""} — we&apos;ll
                    reply within 24 hours.
                  </p>
                  <p className="text-fog/50">{"// channel closed"}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
