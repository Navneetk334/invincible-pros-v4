"use client";

import { create } from "zustand";

type CursorVariant = "default" | "hover" | "drag" | "view";

interface AppState {
  /** preloader */
  progress: number;
  loaded: boolean;
  entered: boolean;
  setProgress: (p: number) => void;
  setLoaded: (v: boolean) => void;
  enter: () => void;

  /** global scroll progress 0..1 */
  scroll: number;
  setScroll: (v: number) => void;

  /** which domain the journey is currently focused on (-1 = none) */
  activeDomain: number;
  setActiveDomain: (i: number) => void;

  /** true only while the horizontal domains section is pinned/active */
  journeyActive: boolean;
  setJourneyActive: (v: boolean) => void;

  /** normalized pointer position (-1..1) for WebGL parallax */
  pointer: { x: number; y: number };
  setPointer: (x: number, y: number) => void;

  /** custom cursor */
  cursor: CursorVariant;
  cursorLabel: string;
  setCursor: (v: CursorVariant, label?: string) => void;

  /** current WebGL accent colors driven by the active scene */
  themeColor: string;
  themeColor2: string;
  setTheme: (c: string, c2: string) => void;

  /** which contact form modal is open (null = closed) */
  contactForm: "flow" | "split" | null;
  openContact: (k: "flow" | "split") => void;
  closeContact: () => void;
}

export const useStore = create<AppState>((set) => ({
  progress: 0,
  loaded: false,
  entered: false,
  setProgress: (p) => set({ progress: p }),
  setLoaded: (v) => set({ loaded: v }),
  enter: () => set({ entered: true }),

  scroll: 0,
  setScroll: (v) => set({ scroll: v }),

  activeDomain: -1,
  setActiveDomain: (i) => set({ activeDomain: i }),

  journeyActive: false,
  setJourneyActive: (v) => set({ journeyActive: v }),

  pointer: { x: 0, y: 0 },
  setPointer: (x, y) => set({ pointer: { x, y } }),

  cursor: "default",
  cursorLabel: "",
  setCursor: (v, label = "") => set({ cursor: v, cursorLabel: label }),

  themeColor: "#4d6bff",
  themeColor2: "#38e1ff",
  setTheme: (c, c2) => set({ themeColor: c, themeColor2: c2 }),

  contactForm: null,
  openContact: (k) => set({ contactForm: k }),
  closeContact: () => set({ contactForm: null }),
}));
