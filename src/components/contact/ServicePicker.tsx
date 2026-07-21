"use client";

import { useMemo, useState } from "react";
import { DOMAINS } from "@/lib/services";
import { servicesForCategory } from "@/lib/v2content";

/**
 * Searchable, grouped picker for all services. Lets users choose the exact
 * service from inside the form — so they never need to close the modal to
 * check the menu (and lose their progress).
 */
export default function ServicePicker({
  selected,
  onToggle,
  multiple = false,
}: {
  selected: string[];
  onToggle: (name: string) => void;
  multiple?: boolean;
}) {
  const [query, setQuery] = useState("");

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    return DOMAINS.map((d) => ({
      domain: d,
      services: servicesForCategory(d.id).filter(
        (s) => !q || s.name.toLowerCase().includes(q),
      ),
    })).filter((g) => g.services.length > 0);
  }, [query]);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={multiple ? "Search services…" : "Search 37 services…"}
        className="w-full rounded-lg border border-paper/15 bg-paper/[0.03] px-3 py-2.5 text-sm text-paper placeholder:text-fog/50 focus:border-cyan focus:outline-none"
      />

      <div
        className="mt-3 max-h-52 overflow-y-auto pr-1"
        data-lenis-prevent
      >
        {groups.map(({ domain, services }) => (
          <div key={domain.id} className="mb-3 last:mb-0">
            <p className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-fog">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: domain.color }}
              />
              {domain.title.charAt(0) + domain.title.slice(1).toLowerCase()}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {services.map((s) => {
                const on = selected.includes(s.name);
                return (
                  <button
                    type="button"
                    key={s.slug}
                    onClick={() => onToggle(s.name)}
                    aria-pressed={on}
                    className={`rounded-full border px-3 py-1.5 text-xs transition-all ${
                      on
                        ? "border-cyan bg-cyan/15 text-paper"
                        : "border-paper/15 text-fog hover:border-paper/50 hover:text-paper"
                    }`}
                  >
                    {s.name}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
        {groups.length === 0 && (
          <p className="py-4 text-center text-sm text-fog">
            No services match &ldquo;{query}&rdquo;.
          </p>
        )}
      </div>
    </div>
  );
}
