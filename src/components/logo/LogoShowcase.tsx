import Link from "next/link";
import { LOGO_OPTIONS, type LogoOption } from "./LogoMarks";

const GRADIENT_STOPS = (
  <>
    <stop offset="0" stopColor="#38e1ff" />
    <stop offset="0.55" stopColor="#4d6bff" />
    <stop offset="1" stopColor="#7c5cff" />
  </>
);

type Treatment = "dark" | "brand";
type Shape = "square" | "circle";

function LogoTile({
  option,
  uid,
  size,
  shape,
  treatment,
}: {
  option: LogoOption;
  uid: string;
  size: number;
  shape: Shape;
  treatment: Treatment;
}) {
  const Mark = option.Mark;
  const gid = `grad-${uid}`;
  const brand = treatment === "brand";
  const isCircle = shape === "circle";
  const bgPaint = brand ? `url(#${gid})` : "#0a0c12";
  const markPaint = brand ? "#050609" : `url(#${gid})`;
  const border = brand ? "none" : "rgba(255,255,255,0.12)";

  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label={`${option.name} ${treatment} ${shape}`}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          {GRADIENT_STOPS}
        </linearGradient>
      </defs>
      {isCircle ? (
        <circle cx="32" cy="32" r="31.2" fill={bgPaint} stroke={border} strokeWidth={brand ? 0 : 1.3} />
      ) : (
        <rect x="0.65" y="0.65" width="62.7" height="62.7" rx="15" fill={bgPaint} stroke={border} strokeWidth={brand ? 0 : 1.3} />
      )}
      <g transform="translate(32 32) scale(0.82) translate(-32 -32)">
        <Mark paint={markPaint} />
      </g>
    </svg>
  );
}

/** Small favicon-size previews on both white and dark chips, to prove legibility. */
function FaviconStrip({ option }: { option: LogoOption }) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {(["#ffffff", "#0a0c12"] as const).map((chip) => (
        <div
          key={chip}
          className="flex items-center gap-3 rounded-lg px-3 py-2"
          style={{ background: chip, border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <LogoTile option={option} uid={`${option.id}-fav32-${chip}`} size={32} shape="square" treatment="brand" />
          <LogoTile option={option} uid={`${option.id}-fav16-${chip}`} size={16} shape="square" treatment="brand" />
          <LogoTile option={option} uid={`${option.id}-favc-${chip}`} size={20} shape="circle" treatment="brand" />
        </div>
      ))}
    </div>
  );
}

export default function LogoShowcase() {
  return (
    <div className="logo-cursor min-h-screen bg-ink text-paper">
      <style>{`.logo-cursor, .logo-cursor * { cursor: auto !important; }`}</style>

      <header className="border-b border-white/10 px-6 py-10 sm:px-10">
        <div className="mx-auto max-w-5xl">
          <Link href="/" className="font-mono text-[11px] uppercase tracking-[0.25em] text-fog hover:text-cyan">
            &larr; Back to site
          </Link>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Logo Marks</h1>
          <p className="mt-3 max-w-2xl text-fog">
            Four square/round mark options for the favicon and social profiles, in the brand
            palette. Your minimalist wordmark stays for the header; one of these becomes the
            compact icon. Each is shown as a dark tile (site style), a brand-colour avatar, and at
            real favicon sizes. Tell me which one to ship and I&rsquo;ll generate the favicon and
            app-icon files.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-8 px-6 py-12 sm:px-10">
        {LOGO_OPTIONS.map((option) => (
          <section
            key={option.id}
            className="rounded-2xl border border-white/10 bg-ink-2 p-6 sm:p-8"
          >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 className="text-xl font-semibold text-paper">{option.name}</h2>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">
                Option {LOGO_OPTIONS.indexOf(option) + 1}
              </span>
            </div>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-fog">{option.concept}</p>

            <div className="mt-6 grid gap-8 md:grid-cols-2">
              <div>
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-fog/70">
                  On dark (site style)
                </p>
                <div className="flex items-center gap-5">
                  <LogoTile option={option} uid={`${option.id}-ds`} size={96} shape="square" treatment="dark" />
                  <LogoTile option={option} uid={`${option.id}-dc`} size={96} shape="circle" treatment="dark" />
                </div>
              </div>
              <div>
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-fog/70">
                  Brand (avatar)
                </p>
                <div className="flex items-center gap-5">
                  <LogoTile option={option} uid={`${option.id}-bs`} size={96} shape="square" treatment="brand" />
                  <LogoTile option={option} uid={`${option.id}-bc`} size={96} shape="circle" treatment="brand" />
                </div>
              </div>
            </div>

            <div className="mt-8">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-fog/70">
                Favicon sizes (32 / 16 / round)
              </p>
              <FaviconStrip option={option} />
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
