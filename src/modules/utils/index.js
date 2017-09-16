export const add = (a, b) => a + b
export const substract = (a, b) => a - b
export const parseUnsignedInt = (n) => {
  const _n = parseInt(n, 10)
  return (isNaN(_n)) ? 0 : _n
}
export const spacing = (n, gap) => {
  const spacing = (gap) ? n - gap : n
  return (spacing > 0) ? spacing : 0
}
