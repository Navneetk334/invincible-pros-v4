/** One-shot preloader progress (0..1), shared between the DOM and the R3F scene. */
export const preload = { prog: 0 };

export function smooth(x: number) {
  x = Math.max(0, Math.min(1, x));
  return x * x * (3 - 2 * x);
}
