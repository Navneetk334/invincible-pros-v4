import { TECH_LOGOS, type TechLogo } from "@/lib/techlogos";

// Case-insensitive lookup of a tech logo by its display name. Built once at
// module load so both the home marquee and the service pages resolve the exact
// same brand icon/color for a given tech name.
const BY_NAME = new Map<string, TechLogo>(
  TECH_LOGOS.map((t) => [t.name.toLowerCase(), t]),
);

export function techByName(name: string): TechLogo | undefined {
  return BY_NAME.get(name.toLowerCase());
}
