export const add = (a, b) => a + b
export const substract = (a, b) => a - b
export const parseUnsignedInt = n => {
  const _n = parseInt(n, 10)
  return isNaN(_n) ? 0 : _n
}
export const spacing = (n, gap) => {
  const spacing = gap ? n - gap : n
  return (spacing > 0) ? spacing : 0
}
export const lowerBound = min => v => Math.max(min, v)
export const upperBound = max => v => Math.min(max, v)
export const clamp = (min, max) => v => {
  const capFn = upperBound(max)
  return lowerBound(min)(capFn(v))
}
