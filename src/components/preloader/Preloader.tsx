"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "@/store/useStore";

/**
 * Narrative preloader — a short animated story told in stylised line-art:
 *   0. a person is stuck with a problem (frown + storm cloud)
 *   1. they reach out to us (a link draws to the INVINCIBLE PROS. core)
 *   2. we engineer the solution (code editor builds)
 *   3. across every discipline (service chips fan out)
 *   4. the custom solution is handed over (a package travels back)
 *   5. problem solved — the frown becomes a smile
 */
const CAPTIONS = [
  "Every great product starts with a problem.",
  "You bring us the challenge.",
  "We engineer the solution.",
  "Across every discipline.",
  "A custom build — delivered to you.",
  "Problem solved. Engineering the future.",
];

const SCENE_MS = 1050;
const TOTAL = CAPTIONS.length * SCENE_MS;

// morphable face paths (same command structure → interpolatable)
const EYE_L_SAD = "M104 101 Q112 107 120 101";
const EYE_L_HAPPY = "M104 104 Q112 96 120 104";
const EYE_R_SAD = "M140 101 Q148 107 156 101";
const EYE_R_HAPPY = "M140 104 Q148 96 156 104";
const MOUTH_SAD = "M110 138 Q130 122 150 138";
const MOUTH_HAPPY = "M110 128 Q130 150 150 128";

const CHIPS = ["WEB", "AI", "CLOUD", "UX", "DATA"];

function Stage({ scene }: { scene: number }) {
  const happy = scene >= 5;
  const T = { duration: 0.5, ease: [0.33, 1, 0.68, 1] as const };

  return (
    <svg viewBox="0 0 440 220" className="h-auto w-full" fill="none">
      {/* ---- the person ---- */}
      <g>
        <circle
          cx="130"
          cy="110"
          r="46"
          stroke="#eef1fb"
          strokeWidth="2.2"
          opacity="0.9"
        />
        <motion.path
          animate={{ d: happy ? EYE_L_HAPPY : EYE_L_SAD }}
          transition={T}
          stroke="#eef1fb"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <motion.path
          animate={{ d: happy ? EYE_R_HAPPY : EYE_R_SAD }}
          transition={T}
          stroke="#eef1fb"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <motion.path
          animate={{ d: happy ? MOUTH_HAPPY : MOUTH_SAD }}
          transition={T}
          stroke={happy ? "#38e1ff" : "#eef1fb"}
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* cheek / glow when happy */}
        <motion.circle
          cx="130"
          cy="110"
          r="46"
          stroke="#38e1ff"
          strokeWidth="2.2"
          animate={{ opacity: happy ? 0.5 : 0 }}
          transition={T}
        />
      </g>

      {/* ---- problem: storm cloud + bolt (scenes 0-1) ---- */}
      <motion.g
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: scene <= 1 ? 1 : 0, y: scene <= 1 ? 0 : -6 }}
        transition={T}
      >
        <g stroke="#fb7185" strokeWidth="2" opacity="0.8">
          <circle cx="118" cy="40" r="12" />
          <circle cx="136" cy="36" r="15" />
          <circle cx="150" cy="44" r="11" />
        </g>
        <motion.polyline
          points="132,50 126,62 135,62 129,74"
          stroke="#38e1ff"
          strokeWidth="2.4"
          strokeLinejoin="round"
          strokeLinecap="round"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </motion.g>

      {/* ---- link from person to us (scene >= 1) ---- */}
      <motion.line
        x1="178"
        y1="110"
        x2="300"
        y2="110"
        stroke="#38e1ff"
        strokeWidth="2"
        strokeDasharray="4 6"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: scene >= 1 ? 1 : 0,
          opacity: scene >= 1 && scene < 5 ? 0.7 : scene >= 5 ? 0.25 : 0,
        }}
        transition={{ duration: 0.6 }}
      />

      {/* ---- the INVINCIBLE PROS. core (us) ---- */}
      <motion.g
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: scene >= 1 ? 1 : 0, scale: scene >= 1 ? 1 : 0.6 }}
        transition={T}
        style={{ transformOrigin: "330px 110px" }}
      >
        <motion.path
          d="M330 84 L353 97 L353 123 L330 136 L307 123 L307 97 Z"
          stroke="#38e1ff"
          strokeWidth="2.2"
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "330px 110px" }}
        />
        <motion.circle
          cx="330"
          cy="110"
          r="6"
          fill="#38e1ff"
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          style={{ transformOrigin: "330px 110px" }}
        />
      </motion.g>

      {/* ---- scene 2: code editor builds ---- */}
      <motion.g
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: scene === 2 ? 1 : 0, y: scene === 2 ? 0 : 8 }}
        transition={T}
      >
        <rect
          x="296"
          y="150"
          width="68"
          height="44"
          rx="5"
          stroke="#eef1fb"
          strokeWidth="1.6"
          opacity="0.6"
        />
        <text x="302" y="146" fill="#38e1ff" fontSize="13" fontFamily="monospace">
          &lt;/&gt;
        </text>
        {[0, 1, 2].map((r) => (
          <motion.rect
            key={r}
            x="304"
            y={160 + r * 10}
            height="3.5"
            rx="1.75"
            fill="#38e1ff"
            opacity={0.8}
            initial={{ width: 0 }}
            animate={{ width: scene === 2 ? [0, [40, 52, 30][r]] : 0 }}
            transition={{ duration: 0.5, delay: 0.15 * r, repeat: scene === 2 ? Infinity : 0, repeatType: "reverse", repeatDelay: 0.4 }}
          />
        ))}
      </motion.g>

      {/* ---- scene 3: service chips fan out ---- */}
      {CHIPS.map((c, i) => {
        const angle = (-70 + i * 35) * (Math.PI / 180);
        const cx = 330 + Math.cos(angle) * 66;
        const cy = 110 + Math.sin(angle) * 66;
        return (
          <motion.g
            key={c}
            initial={{ opacity: 0 }}
            animate={{
              opacity: scene === 3 ? 1 : 0,
              x: scene === 3 ? cx - 330 : 0,
              y: scene === 3 ? cy - 110 : 0,
            }}
            transition={{ duration: 0.5, delay: scene === 3 ? i * 0.05 : 0 }}
          >
            <rect
              x="314"
              y="102"
              width="34"
              height="17"
              rx="8.5"
              stroke="#38e1ff"
              strokeWidth="1.4"
              fill="#0a0d18"
            />
            <text
              x="331"
              y="114"
              fill="#eef1fb"
              fontSize="8"
              fontFamily="monospace"
              textAnchor="middle"
            >
              {c}
            </text>
          </motion.g>
        );
      })}

      {/* ---- scene 4: handover package travels back to the person ---- */}
      <motion.g
        initial={{ opacity: 0, x: 0 }}
        animate={{
          opacity: scene === 4 ? 1 : 0,
          x: scene === 4 ? -145 : 0,
        }}
        transition={{ duration: 0.9, ease: [0.33, 1, 0.68, 1] }}
      >
        <rect
          x="320"
          y="100"
          width="20"
          height="20"
          rx="4"
          fill="#38e1ff"
        />
        <path
          d="M325 110 l3.5 3.5 L335 106"
          stroke="#05060a"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.g>

      {/* ---- scene 5: sparkles around the happy person ---- */}
      {[
        [92, 70],
        [170, 78],
        [96, 150],
        [172, 146],
        [130, 52],
      ].map(([x, y], i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: happy ? [0, 1, 0.6] : 0,
            scale: happy ? [0, 1.2, 1] : 0,
          }}
          transition={{ duration: 0.7, delay: happy ? 0.2 + i * 0.08 : 0 }}
        >
          <path
            d={`M${x} ${y - 5} L${x + 1.3} ${y - 1.3} L${x + 5} ${y} L${x + 1.3} ${y + 1.3} L${x} ${y + 5} L${x - 1.3} ${y + 1.3} L${x - 5} ${y} L${x - 1.3} ${y - 1.3} Z`}
            fill="#38e1ff"
          />
        </motion.g>
      ))}
    </svg>
  );
}

export default function Preloader() {
  const progress = useStore((s) => s.progress);
  const setProgress = useStore((s) => s.setProgress);
  const entered = useStore((s) => s.entered);
  const enter = useStore((s) => s.enter);
  const [scene, setScene] = useState(0);

  const reduced = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  useEffect(() => {
    const total = reduced ? 1400 : TOTAL;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const e = t - start;
      setProgress(Math.min(100, Math.round((e / total) * 100)));
      setScene(
        reduced
          ? CAPTIONS.length - 1
          : Math.min(CAPTIONS.length - 1, Math.floor(e / SCENE_MS)),
      );
      if (e >= total) {
        setProgress(100);
        setTimeout(() => enter(), 650);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [setProgress, enter, reduced]);

  return (
    <AnimatePresence>
      {!entered && (
        <motion.div
          className="fixed inset-0 z-[95] flex flex-col justify-between bg-ink px-6 py-6 md:px-12 md:py-10"
          exit={{ y: "-100%" }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* top row */}
          <div className="flex items-center justify-between">
            <span className="eyebrow">
              INVINCIBLE&nbsp;PROS<span className="text-cyan">.</span>
            </span>
            <button
              type="button"
              onClick={() => enter()}
              className="eyebrow transition-colors hover:text-paper"
            >
              Skip intro →
            </button>
          </div>

          {/* centre: the animated story */}
          <div className="flex flex-1 flex-col items-center justify-center gap-8">
            <div className="w-full max-w-[520px]">
              <Stage scene={scene} />
            </div>
            <div className="h-6 overflow-hidden text-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={scene}
                  initial={{ y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -18, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                  className="font-display text-base font-medium tracking-tight text-paper md:text-xl"
                >
                  {CAPTIONS[scene]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* bottom: progress */}
          <div className="flex items-end justify-between gap-6">
            <span className="hidden font-mono text-xs text-fog md:block">
              Loading experience
            </span>
            <div className="flex flex-1 items-center gap-4">
              <div className="relative h-px flex-1 overflow-hidden bg-paper/15">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-cyan"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="font-display text-4xl font-bold tabular-nums md:text-6xl">
                {String(progress).padStart(3, "0")}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
