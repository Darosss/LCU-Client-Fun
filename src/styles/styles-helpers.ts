export function backgroundLinearGradient(rgb1: string, rgb2: string) {
  return `background-color: qlineargradient( x1:1 y1:3, x2:0 y2:3, stop:0 ${rgb1}, stop:1 ${rgb2});`;
}
