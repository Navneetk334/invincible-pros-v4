"use client";

import { useStore } from "@/store/useStore";

/**
 * Returns props that morph the custom cursor into an interactive state
 * on hover. Spread onto any interactive element.
 */
export function useCursor(variant: "hover" | "view" | "drag" = "hover", label = "") {
  const setCursor = useStore((s) => s.setCursor);
  return {
    onPointerEnter: () => setCursor(variant, label),
    onPointerLeave: () => setCursor("default"),
  };
}
