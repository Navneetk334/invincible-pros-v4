"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const STATS = [
  { to: 100, suffix: "+", label: "Projects delivered" },
  { to: 38, suffix: "+", label: "Capabilities" },
  { to: 6, suffix: "", label: "Service categories" },
  { to: 99, suffix: ".9%", label: "Operational uptime" },
  { to: 24, suffix: "/7", label: "Support" },
];

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    if (reduced) {
      raf = requestAnimationFrame(() => setVal(to));
      return () => cancelAnimationFrame(raf);
    }
    const start = performance.now();
    const dur = 1500;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, reduced]);

  return (
    <span ref={ref} className="tabular-nums">
      {val}
      {suffix}
    </span>
  );
}

export default function StatsV2() {
  return (
    <section
      aria-label="Company statistics"
      className="relative px-6 py-24 md:px-12 md:py-36"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 md:grid-cols-5 md:gap-y-0">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            className="md:border-l md:border-paper/10 md:px-6 md:first:border-l-0 md:first:pl-0"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.07 }}
          >
            <div className="font-display text-[2.6rem] font-bold leading-none tracking-tight md:text-[3.4rem]">
              <CountUp to={s.to} suffix={s.suffix} />
            </div>
            <div className="mt-4 h-px w-8 bg-cyan" />
            <p className="mt-3 font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-fog">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
