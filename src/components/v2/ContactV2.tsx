"use client";

import { motion } from "framer-motion";
import { CONTACT } from "@/lib/v2content";
import { useStore } from "@/store/useStore";
import { useCursor } from "@/hooks/useCursor";
import Magnetic from "@/components/layout/Magnetic";

export default function ContactV2() {
  const openContact = useStore((s) => s.openContact);
  const primary = useCursor("hover");
  const link = useCursor("hover");

  const channels = [
    { label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { label: "Phone", value: CONTACT.phone, href: `tel:${CONTACT.phone.replace(/[^+\d]/g, "")}` },
    { label: "WhatsApp", value: "Message us", href: CONTACT.whatsapp },
    { label: "Schedule", value: "Book a call", href: CONTACT.schedule },
  ];

  return (
    <section id="contact" className="relative px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12% 0px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="eyebrow mb-6">Let&rsquo;s build</p>
          <h2 className="max-w-4xl font-display text-[12vw] font-bold uppercase leading-[0.88] tracking-tight md:text-[6vw]">
            Let&rsquo;s engineer your next
            <br />
            <span className="gradient-text">breakthrough.</span>
          </h2>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-fog md:text-lg">
            Tell us what you&rsquo;re building. We&rsquo;ll reply within one
            business day with a clear next step — no obligation.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 flex flex-col items-start gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Magnetic strength={0.4}>
            <button
              type="button"
              onClick={() => openContact("flow")}
              className="group flex items-center gap-2 rounded-full px-8 py-4 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-ink"
              style={{
                backgroundImage:
                  "linear-gradient(100deg, var(--color-cyan), var(--color-accent-2))",
              }}
              {...primary}
            >
              Start a project
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
          </Magnetic>
          <button
            type="button"
            onClick={() => openContact("split")}
            className="rounded-full border border-paper/25 px-8 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-paper transition-colors hover:border-cyan hover:text-cyan"
            {...link}
          >
            Send a message
          </button>
        </motion.div>

        <div className="mt-16 grid gap-px border border-paper/12 bg-paper/12 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group bg-ink p-6 transition-colors hover:bg-paper/[0.03]"
              {...link}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog">
                {c.label}
              </span>
              <span className="mt-2 block font-display text-lg font-medium tracking-tight text-paper transition-colors group-hover:text-cyan">
                {c.value}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
