import { clamp } from '../utils';

export const rotateHue = (arr, amount) => {
  const [hue, ...rest] = arr;
  return [clamp360(hue + amount), ...rest];
};

export const toHSL = arr => `hsl(${arr[0]},${arr[1]}%,${arr[2]}%)`;

export const extractHSLColorComponents = str => {
  const hsl = str
    .replace(/hsl\((.*)\)/, '$1')
    .split(',')
    .map(v => v.trim());
  const hue = parseFloat(hsl[0], 10);
  const [, saturation, lightness] = hsl.map(v => parseFloat(v.split('%')[0]));
  return [hue, saturation, lightness];
};

const clampAround = v => amount => clamp(0, amount - 1)(v % amount);

export const clamp360 = input => {
  const amount = 360;
  while (input < 0) {
    input += amount;
  }
  return clampAround(input)(amount);
};
