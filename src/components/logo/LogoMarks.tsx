import type { ReactNode } from "react";

export type MarkProps = { paint: string };

/**
 * Each mark is drawn on a 0..64 artboard and takes a single `paint` (either a
 * gradient url or a solid colour). Negative-space details use evenodd so the
 * tile background shows through — that keeps every mark legible whether it's a
 * bright mark on a dark tile or a dark mark on a brand-colour tile.
 */

// 1 — ASCENT: an upward arrow / the "I" of Invincible rising.
export function MarkAscent({ paint }: MarkProps): ReactNode {
  return (
    <g fill="none" stroke={paint} strokeWidth={7.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 34 L32 20 L46 34" />
      <path d="M32 24 V48" />
    </g>
  );
}

// 2 — AEGIS: a shield holding the "I." monogram (protection + Invincible).
export function MarkShield({ paint }: MarkProps): ReactNode {
  return (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      fill={paint}
      d="M32 8 L52 16 V30 C52 41 43.5 49.5 32 54 C20.5 49.5 12 41 12 30 V16 Z M29 20 h6 v12 h-6 Z M34.8 39 a2.8 2.8 0 1 1 -5.6 0 a2.8 2.8 0 1 1 5.6 0 Z"
    />
  );
}

// 3 — CORE: an orbital core echoing the site's energy field.
export function MarkOrbital({ paint }: MarkProps): ReactNode {
  return (
    <g>
      <circle cx="32" cy="32" r="17" fill="none" stroke={paint} strokeWidth="4" />
      <circle cx="32" cy="32" r="7" fill={paint} />
      <circle cx="44" cy="20" r="3.6" fill={paint} />
    </g>
  );
}

// 4 — MONOGRAM: a clean geometric "IP".
export function MarkMonogram({ paint }: MarkProps): ReactNode {
  return (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      fill={paint}
      d="M16 16 h6.5 v32 h-6.5 Z M28 16 h6.5 v32 h-6.5 Z M34.5 16 H41 C48 16 48 31 41 31 H34.5 Z M34.5 21.5 H40.5 C44 21.5 44 25.5 40.5 25.5 H34.5 Z"
    />
  );
}

export type LogoOption = {
  id: string;
  name: string;
  concept: string;
  Mark: (props: MarkProps) => ReactNode;
};

export const LOGO_OPTIONS: LogoOption[] = [
  {
    id: "ascent",
    name: "Ascent",
    concept:
      "An upward arrow — momentum and progress. Reads as the \u201cI\u201d of Invincible, always rising.",
    Mark: MarkAscent,
  },
  {
    id: "aegis",
    name: "Aegis",
    concept:
      "A shield cradling the \u201cI.\u201d monogram — protection and reliability, the Invincible in the name.",
    Mark: MarkShield,
  },
  {
    id: "core",
    name: "Core",
    concept:
      "An orbital core that echoes the site\u2019s energy field — engineering at the centre, always in motion.",
    Mark: MarkOrbital,
  },
  {
    id: "monogram",
    name: "Monogram",
    concept:
      "A clean geometric \u201cIP\u201d — the literal initials, corporate and instantly recognisable.",
    Mark: MarkMonogram,
  },
];
