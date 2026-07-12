"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { DOMAINS } from "@/lib/services";
import { useStore } from "@/store/useStore";
import { useCursor } from "@/hooks/useCursor";

const ALL = DOMAINS.flatMap((d) => d.services);

export default function AssemblySection() {
  const ref = useRef<HTMLElement>(null);
  const setAssembly = useStore((s) => s.setAssembly);
  const cursor = useCursor("view", "Capability");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // triangle wave: 0 at the edges, 1 at the centre → shatter then reassemble
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const a = 1 - Math.abs(p * 2 - 1);
    setAssembly(Math.min(1, Math.max(0, a * 1.15)));
  });

  useEffect(() => () => setAssembly(0), [setAssembly]);

  const namesOpacity = useTransform(
    scrollYProgress,
    [0.28, 0.45, 0.55, 0.72],
    [0, 1, 1, 0],
  );
  const titleOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.28, 0.68, 0.9],
    [0, 1, 1, 0],
  );
  const titleScale = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [1.1, 1, 0.96]);

  return (
    <section ref={ref} className="relative h-[260vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
        <motion.div style={{ opacity: titleOpacity, scale: titleScale }}>
          <p className="eyebrow mb-6">{"// The shatter"}</p>
          <h2 className="text-section font-display">
            <span className="block">ONE CORE.</span>
            <span className="block gradient-text">INFINITE OUTPUT.</span>
          </h2>
        </motion.div>

        <motion.ul
          style={{ opacity: namesOpacity }}
          className="mx-auto mt-10 flex max-w-4xl flex-wrap items-center justify-center gap-x-5 gap-y-2 md:mt-14 md:gap-x-8 md:gap-y-3"
        >
          {ALL.map((s, i) => (
            <motion.li
              key={s}
              className="font-display text-sm font-medium tracking-tight text-fog transition-colors duration-300 hover:text-cyan md:text-xl"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 12) * 0.02 }}
              {...cursor}
            >
              {s}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
