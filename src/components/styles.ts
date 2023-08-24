export function backgroundLinearGradient(rgb1: string, rgb2: string) {
  return `background-color: qlineargradient( x1:1 y1:3, x2:0 y2:3, stop:0 ${rgb1}, stop:1 ${rgb2});`;
}

export const defaultTextStyle = `
  ${backgroundLinearGradient("rgba(25,0,36,0.6)", "rgba(244,52,136,0.7)")}
  margin-horizontal: 5px;
`;

export const defaultButton = `
margin-horizontal: 5px;
border:1;
height: 40px;
font-size: 20px;
border-radius: 30px;
`;
