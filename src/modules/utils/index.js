export const add = (a, b) => a + b;
export const substract = (a, b) => a - b;
export const parseUnsignedInt = n => {
  const _n = parseInt(n, 10);
  return isNaN(_n) ? 0 : _n;
};
export const spacing = (n, gap) => {
  const spacing = gap ? n - gap : n;
  return spacing > 0 ? spacing : 0;
};
export const lowerBound = min => v => Math.max(min, v);
export const upperBound = max => v => Math.min(max, v);
export const clamp = (min, max) => v => {
  const capFn = upperBound(max);
  return lowerBound(min)(capFn(v));
};
export const range = amount => {
  let n = 0;
  let a = [];
  while (n < amount) {
    a.push(n++);
  }
  return a;
};
export const insideAngle = angle => {
  while (angle < 0) {
    angle = angle + 360;
  }
  return angle % 360;
};
export const hslShiftedColorMap = (states, hslShift) => ({
  name: 'hsl',
  background: 'hsl(0, 100%, 50%)',
  states: range(states)
    .map(v => v * 360 / states)
    .map(v => `hsl(${insideAngle(v + hslShift)}, 100%, 70%)`),
});
