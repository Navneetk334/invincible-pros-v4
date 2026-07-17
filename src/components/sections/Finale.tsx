"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useCursor } from "@/hooks/useCursor";
import Magnetic from "@/components/layout/Magnetic";
import { useStore } from "@/store/useStore";

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
  const link = useCursor("hover");
  const openContact = useStore((s) => s.openContact);
  const year = new Date().getFullYear();

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
          <button
            type="button"
            onClick={() => openContact("flow")}
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
          </button>
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

      {/* footer — giant brand signature fading into the floor */}
      <footer className="w-full">
        <div className="overflow-hidden">
          <h2
            aria-hidden
            className="select-none whitespace-nowrap text-center font-display font-bold uppercase leading-[0.9] tracking-[-0.04em]"
            style={{
              fontSize: "clamp(2.5rem, 10.6vw, 15rem)",
              backgroundImage:
                "linear-gradient(to bottom, rgba(224,227,244,0.6) 0%, rgba(224,227,244,0.22) 52%, rgba(224,227,244,0.04) 82%, rgba(224,227,244,0) 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Invincible&nbsp;Pros.
          </h2>
        </div>

        <div className="mx-auto mt-6 flex w-full max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-fog">
            <a href="#" className="transition-colors hover:text-paper" {...link}>
              Privacy Policy
            </a>
            <span className="text-fog/40">·</span>
            <a href="#" className="transition-colors hover:text-paper" {...link}>
              Cookie Settings
            </a>
            <span className="text-fog/40">·</span>
            <a href="#" className="transition-colors hover:text-paper" {...link}>
              Data Processing
            </a>
          </div>

          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fog/70">
            © {year} Invincible Pros., Inc.
          </p>
        </div>
      </footer>
    </section>
  );
}
