"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function CountUp({
  to,
  suffix = "",
  prefix = "",
}: {
  to: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1600;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {val}
      {suffix}
    </span>
  );
}

const STATS = [
  { label: "Capabilities engineered", value: 38, suffix: "" },
  { label: "Integrated domains", value: 6, suffix: "" },
  { label: "Operational uptime", value: 99, suffix: ".9%" },
  { label: "Support coverage", value: 24, suffix: "/7" },
];

export default function Stats() {
  return (
    <section className="relative px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto max-w-6xl">
        <motion.p
          className="eyebrow mb-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {"// Capability at scale"}
        </motion.p>

        <div className="grid grid-cols-2 gap-x-8 gap-y-14 md:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              <div className="font-display text-6xl font-bold tracking-tight md:text-8xl">
                <CountUp to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-4 h-px w-10 bg-cyan" />
              <p className="mt-4 max-w-[18ch] font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-fog">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
