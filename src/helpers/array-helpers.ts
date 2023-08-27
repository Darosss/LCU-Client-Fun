export function randomElement<T = unknown>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)];
}
