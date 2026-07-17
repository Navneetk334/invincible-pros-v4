export const PERIOD = 5.4;

/** Shared clock: the R3F scene writes its elapsed time here so the DOM
 *  wordmark overlay can stay perfectly in sync with the particles. */
export const labClock = { t: 0 };

export function smooth(x: number) {
  x = Math.max(0, Math.min(1, x));
  return x * x * (3 - 2 * x);
}

/** Looping "order amount" 0..1: chaos → assemble → hold → scatter back. */
export function loopAmount(elapsed: number) {
  const p = (elapsed % PERIOD) / PERIOD;
  if (p < 0.12) return 0;
  if (p < 0.55) return smooth((p - 0.12) / 0.43);
  if (p < 0.78) return 1;
  return 1 - smooth((p - 0.78) / 0.22);
}

export function phaseLabel(elapsed: number) {
  const p = (elapsed % PERIOD) / PERIOD;
  if (p < 0.1) return "Many Problems";
  if (p < 0.45) return "One Solution";
  // caption clears well before the wordmark appears — no overlap
  return "";
}

/** DOM wordmark reveal 0..1, sequenced after the caption + particle merge. */
export function logoReveal(elapsed: number) {
  const p = (elapsed % PERIOD) / PERIOD;
  return smooth((p - 0.56) / 0.12) * (1 - smooth((p - 0.8) / 0.08));
}
