export const PERIOD = 5.4;

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
  if (p < 0.12) return "Many Problems";
  if (p < 0.55) return "One Solution";
  if (p < 0.82) return "INVINCIBLE PROS.";
  return "";
}
