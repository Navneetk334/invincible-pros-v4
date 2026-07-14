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
    <section className="relative px-6 py-24 md:px-12 md:py-36">
      <div className="mx-auto max-w-6xl">
        {/* header */}
        <motion.div
          className="mb-14 flex flex-col gap-6 border-b border-paper/10 pb-10 md:mb-16 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <p className="eyebrow mb-5">{"// Capability at scale"}</p>
            <h2 className="max-w-xl font-display text-3xl font-bold leading-[1.05] tracking-tight md:text-5xl">
              Engineered to perform,
              <br className="hidden md:block" /> trusted to endure.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-fog md:text-right">
            The standard we hold ourselves to on every engagement.
          </p>
        </motion.div>

        {/* stats row with column dividers */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 md:gap-y-0">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              className="md:border-l md:border-paper/10 md:px-8 md:first:border-l-0 md:first:pl-0"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <div className="font-display text-[3rem] font-bold leading-none tracking-tight tabular-nums md:text-[4.25rem]">
                <CountUp to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-5 h-px w-8 bg-cyan" />
              <p className="mt-4 font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-fog">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
