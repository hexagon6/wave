import { lowerBound, upperBound } from '../utils'

export const toRGBA = arr => `rgba(${arr[0]},${arr[1]},${arr[2]},${arr[3]})`

export const extractRGBAColorComponents = str => {
  const rgba = str.replace(/rgba\((.*)\)/, '$1').split(',')

  const above0 = lowerBound(0)
  const atmost255 = upperBound(255)
  const [r, g, b] = rgba.map(above0).map(atmost255)

  const a = parseFloat(rgba[3].trim())
  return [r, g, b, a]
}
