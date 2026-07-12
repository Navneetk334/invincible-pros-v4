"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useCursor } from "@/hooks/useCursor";
import Magnetic from "@/components/layout/Magnetic";

const LINE_A = "ENGINEERING";
const LINE_B = "THE FUTURE";

function RevealLine({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "115%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.1, delay, ease: [0.76, 0, 0.24, 1] }}
      >
        {text}
      </motion.span>
    </span>
  );
}

export default function Finale() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const cta = useCursor("hover", "Let's talk");
  const mail = useCursor("hover", "Email");

  return (
    <section
      id="contact"
      ref={ref}
      className="relative flex min-h-screen flex-col justify-between px-6 pb-10 pt-32 md:px-12 md:pb-14"
    >
      {/* CTA row */}
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow mb-6">{"// The mission"}</p>
          <p className="max-w-md text-lg leading-relaxed text-fog md:text-xl">
            You bring the ambition. We bring the engineering. Let&apos;s build
            something the future remembers.
          </p>
        </div>
        <Magnetic strength={0.35}>
          <a
            href="mailto:hello@invinciblepros.com"
            className="group inline-flex items-center gap-4"
            {...cta}
          >
            <span className="flex h-24 w-24 items-center justify-center rounded-full border border-paper/25 text-sm transition-colors duration-300 group-hover:border-cyan group-hover:bg-cyan group-hover:text-ink md:h-28 md:w-28">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em]">
                Start
              </span>
            </span>
            <span className="font-display text-3xl font-medium tracking-tight transition-transform duration-300 group-hover:translate-x-2 md:text-4xl">
              a project
            </span>
          </a>
        </Magnetic>
      </div>

      {/* the final message */}
      <motion.div style={{ y }} className="pointer-events-none py-16 text-center">
        <h2 className="font-display text-[15vw] font-bold leading-[0.82] tracking-tight md:text-[13vw]">
          <RevealLine text={LINE_A} />
          <span className="gradient-text">
            <RevealLine text={LINE_B} delay={0.12} />
          </span>
        </h2>
      </motion.div>

      {/* footer */}
      <footer className="mx-auto w-full max-w-6xl border-t border-paper/10 pt-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan" />
            <span className="font-display text-sm font-bold tracking-[0.14em]">
              INVINCIBLE&nbsp;PROS<span className="text-cyan">.</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {["LinkedIn", "Instagram", "Behance", "X"].map((s) => (
              <a
                key={s}
                href="#"
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-fog transition-colors hover:text-paper"
                {...cta}
              >
                {s}
              </a>
            ))}
          </div>

          <a
            href="mailto:hello@invinciblepros.com"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-fog transition-colors hover:text-paper"
            {...mail}
          >
            hello@invinciblepros.com
          </a>
        </div>
        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-fog/60">
          © {new Date().getFullYear()} Invincible Pros. — Engineering the future.
        </p>
      </footer>
    </section>
  );
}
