import { type TechLogo } from "@/lib/techlogos";

/**
 * A single technology "chip" — brand icon (or monogram fallback) plus the name.
 * Shared by the home tech-stack marquee and the service-page technology grid so
 * both render identically.
 */
export default function TechChip({ tech }: { tech: TechLogo }) {
  return (
    <span
      className="group flex shrink-0 items-center gap-2.5 rounded-full border border-paper/12 bg-paper/[0.03] px-4 py-2.5 transition-colors duration-300 hover:border-paper/30"
      style={{ "--tc": tech.hex } as React.CSSProperties}
    >
      {tech.path ? (
        <svg
          viewBox="0 0 24 24"
          className="h-[18px] w-[18px] shrink-0 fill-paper/55 transition-colors duration-300 group-hover:fill-[var(--tc)]"
          aria-hidden
        >
          <path d={tech.path} />
        </svg>
      ) : tech.mono ? (
        <span
          className="grid h-[18px] min-w-[18px] place-items-center rounded-[5px] border border-paper/20 px-[3px] font-mono text-[9px] font-bold leading-none text-[color:var(--tc)]"
          aria-hidden
        >
          {tech.mono}
        </span>
      ) : null}
      <span className="whitespace-nowrap font-display text-sm font-medium tracking-tight text-paper/70 transition-colors duration-300 group-hover:text-paper md:text-[15px]">
        {tech.name}
      </span>
    </span>
  );
}
