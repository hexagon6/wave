import test from 'ava'

import { step, algorithms } from '../src/modules/matrix'

const algorithm = algorithms[0].method // game of life
// TODO: implement algorithm selection

test('algorithm', t => {
  t.is(algorithm(0, [0, 0, 0, 0, 0, 0, 0, 0, 0], 1), 0)
  t.is(algorithm(0, [0, 0, 0, 0, 0, 0, 0, 0, 0], 1), 0)
})

test('game of life', t => {
  const matrix = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  const dimension = { X: 3, Y: 3 }
  const neighborhood = [{ dx: 1, dy: 0 }] // right neighbor
  const next = step(matrix, {
    states: 2,
    algorithm,
    dimension,
    neighborhood,
  })
  t.deepEqual(next, [0, 0, 0, 0, 0, 0, 0, 0, 0])
})
