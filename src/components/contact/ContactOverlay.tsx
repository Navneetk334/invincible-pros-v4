"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "@/store/useStore";
import FlowForm from "./FlowForm";
import SplitForm from "./SplitForm";

/**
 * Compact, centered modal that hosts the Flow (Start a project) or Split
 * (Contact) form on a small card with a dimmed backdrop.
 */
export default function ContactOverlay() {
  const kind = useStore((s) => s.contactForm);
  const close = useStore((s) => s.closeContact);

  useEffect(() => {
    if (!kind) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    // lock background scroll while the modal is open
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [kind, close]);

  return (
    <AnimatePresence>
      {kind && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          data-lenis-prevent
        >
          {/* backdrop */}
          <div
            className="fixed inset-0 bg-ink/80 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />

          <div className="relative flex min-h-full items-center justify-center p-4 md:p-6">
            {/* card */}
            <motion.div
              role="dialog"
              aria-modal="true"
              className="relative w-full max-w-lg rounded-2xl border border-paper/12 bg-ink-2 p-6 shadow-2xl md:p-8"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
            >
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-paper/25 text-sm text-paper transition-colors hover:border-cyan hover:text-cyan"
              >
                ✕
              </button>
              {kind === "flow" ? <FlowForm /> : <SplitForm />}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
