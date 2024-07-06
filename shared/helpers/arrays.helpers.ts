export function randomElement<T = unknown>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)];
}

export function shuffleArrayRandomly<T = unknown>(providedArray: T[]) {
  return providedArray.sort(() => 0.5 - Math.random());
}
