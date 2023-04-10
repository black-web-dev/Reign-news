export function range(min: number, max: number): number[] {
  return new Array(max - min + 1).fill(0).map((_, i) => min + i);
}
