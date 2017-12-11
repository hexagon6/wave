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
export const extractRGBAColorComponents = (str) => {
  const rgba = str.replace(/rgba\((.*)\)/, '$1')
    .split(',')
    .map(v => v.trim())
  const [r, g, b] = rgba
    .map(v => parseInt(v, 10))
    .map(v => Math.max(0, Math.min(255, v)))
  const a = parseFloat(rgba[3])
  return [r, g, b, a]
}

export const toRGBA = (arr) =>
  `rgba(${arr[0]},${arr[1]},${arr[2]},${arr[3]})`

export const extractHSLColorComponents = str => {
  const hsl = str.replace(/hsl\((.*)\)/, '$1')
    .split(',')
    .map(v => v.trim())
  const hue = parseFloat(hsl[0], 10)
  const [, saturation, lightness] = hsl
    .map(v => parseFloat(v.split('%')[0]))
  return [hue, saturation, lightness]
}

export const toHSL = (arr) =>
  `hsl(${arr[0]},${arr[1]}%,${arr[2]}%)`

export const clamp360 = (input) => {
  while (input < 0) {
    input += 360
  }
  return Math.max(0, Math.min(359, input % 360))
}

export const rotateHue = (arr, amount) => {
  const [hue, ...rest] = arr
  return [clamp360(hue + amount), ...rest]
}
