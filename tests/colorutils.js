import test from 'ava'

import {
  extractRGBAColorComponents,
  extractHSLColorComponents,
  clamp360,
  toRGBA,
  toHSL,
  rotateHue,
} from '../src/modules/color'

test('rgba number extraction', t => {
  const rgba = extractRGBAColorComponents('rgba(0, 255, 255, 1)')
  t.deepEqual(rgba, [0, 255, 255, 1])
})

test('rgba number extraction', t => {
  const rgba = extractRGBAColorComponents('rgba(321, -10, 0, 1)')
  t.deepEqual(rgba, [255, 0, 0, 1])
})

test('hsl number extraction', t => {
  t.deepEqual(extractHSLColorComponents('hsl(0, 100%, 50%)'), [0, 100, 50])
})

test('rgba construction', t => {
  t.is(toRGBA([0, 0, 0, 1]), 'rgba(0,0,0,1)')
  t.is(toRGBA([255, 120, 0, 0.8]), 'rgba(255,120,0,0.8)')
})

test('hsl construction', t => {
  t.is(toHSL([0, 0, 0]), 'hsl(0,0%,0%)')
  t.is(toHSL([255, 100, 0]), 'hsl(255,100%,0%)')
})

test('clamp360', t => {
  t.is(clamp360(0), 0)
  t.is(clamp360(-1), 359)
  t.is(clamp360(360), 0)
})

test('hsl color rotation', t => {
  t.deepEqual(rotateHue([0, 0, 0], 1), [1, 0, 0])
  t.deepEqual(rotateHue([0, 0, 0], -1), [359, 0, 0])
})
