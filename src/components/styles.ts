export function backgroundLinearGradient(rgb1: string, rgb2: string) {
  return `background-color: qlineargradient( x1:3 y1:3, x2:0 y2:1, stop:0 ${rgb1}, stop:1 ${rgb2});`;
}

export const defaultTextStyle = `
  ${backgroundLinearGradient("rgba(25,0,36,0.6)", "rgba(244,52,136,0.7)")}
  width: 300px;
  margin-horizontal: 5px;
`;

export const defaultButton = `
margin-horizontal: 5px;
border:0;
height: 30px;
width: 300px;
font-size: 20px;
`;
