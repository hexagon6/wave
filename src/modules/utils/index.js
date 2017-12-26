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
const maxFn = lower => v => Math.max(lower, v)
const minFn = upper => v => Math.min(upper, v)
const clamp = (min, max) => v => {
  const mind = minFn(max)(v)
  return maxFn(min)(mind)
}
const clampAround = v => amount => clamp(0, amount - 1)(v % amount)

export const clamp360 = input => {
  const amount = 360
  while (input < 0) {
    input += amount
  }
  return clampAround(input)(amount)
}

export const extractRGBAColorComponents = str => {
  const rgba = str.replace(/rgba\((.*)\)/, '$1').split(',')

  const above0 = maxFn(0)
  const atmost255 = minFn(255)
  const [r, g, b] = rgba
    .map(above0)
    .map(atmost255)

  const a = parseFloat(rgba[3].trim())
  return [r, g, b, a]
}

export const toRGBA = arr =>
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

export const toHSL = arr =>
  `hsl(${arr[0]},${arr[1]}%,${arr[2]}%)`

export const rotateHue = (arr, amount) => {
  const [hue, ...rest] = arr
  return [clamp360(hue + amount), ...rest]
}
