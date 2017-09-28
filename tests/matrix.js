import test from 'ava'

import {
  createField,
  generateCell,
  createRow,
  sliceCellstoRows,
  fillMatrix,
  randomFieldGenerator,
  splitMatrixToNb,
  getNeighborIndex,
  pos2Index,
  step,
  algorithm,
  colors
} from '../src/modules/matrix'

test('valid transform output', t => {
  const createCell = generateCell(10, colors)
  t.deepEqual(createCell(0, 0, 0),
    {x: 0, y: 0, color: '#ffffff'})
  t.deepEqual(createCell(1, 0, 0),
    {x: 10, y: 0, color: '#ffffff'})
  t.deepEqual(createCell(0, 1, 0),
    {x: 0, y: 10, color: '#ffffff'})
  t.deepEqual(createCell(0, 0, 1),
    {x: 0, y: 0, color: '#ff0000'})
})

test('valid row', t => {
  const createCell = generateCell(10, colors)
  const expRes = [
    { x: 0, y: 0, color: '#ffffff' },
    { x: 0, y: 10, color: '#ff0000' }
  ]
  t.deepEqual(createRow(createCell, [0, 1], 0), expRes)
  const expRes2 = [
    { x: 10, y: 0, color: '#ffffff' },
    { x: 10, y: 10, color: '#ff0000' }
  ]
  t.deepEqual(createRow(createCell, [0, 1], 1), expRes2)
})

test('validate slices', t => {
  t.deepEqual(sliceCellstoRows([0, 1, 2, 3], 2), [[0, 1], [2, 3]])
  t.deepEqual(sliceCellstoRows([{a: 0}, {b: 1}, {c: 2}, {d: 3}], 2),
    [[{a: 0}, {b: 1}], [{c: 2}, {d: 3}]])
  t.deepEqual(sliceCellstoRows([0, 1, 2, 3, 4, 5, 6, 7, 8], 3),
    [[0, 1, 2], [3, 4, 5], [6, 7, 8]])
})

test('valid field', t => {
  const expRes = [
    [
      { x: 0, y: 0, color: '#ffffff' },
      { x: 0, y: 10, color: '#ff0000' }
    ], [
      { x: 10, y: 0, color: '#ffff00' },
      { x: 10, y: 10, color: '#000000' }
    ]
  ]
  t.deepEqual(createField(colors, [0, 1, 2, 3], 2, 2, 10, 0), expRes)
})

test('fill matrix', t => {
  t.deepEqual(fillMatrix(() => 0, undefined, 2, 2), [0, 0, 0, 0])
})

test('random fill', t => {
  const range = [3, 12]
  const ret = randomFieldGenerator(range)
  t.true(ret >= range[0])
  t.true(ret <= range[1])
})

test('should get index from position coordinates', t => {
  const dimension = { X: 3, Y: 3 }
  t.is(
    pos2Index(
      {
        dimension,
        position: { x: 0, y: 0 }}
    ), 0)
  t.is(
    pos2Index(
      {
        dimension: { X: 4, Y: 3 },
        position: { x: 0, y: 1 }}
    ), 4)
  t.is(
    pos2Index(
      {
        dimension,
        position: { x: 1, y: 2 }}
    ), 7)
  t.is(
    pos2Index(
      {
        dimension,
        position: { x: 1, y: 1 }}
    ), 4)
})

test('should get pos from index', t => {
  const dimension = { X: 2, Y: 2 }
  t.deepEqual(
    index2Pos({ dimension, index: 0 }),
    { x: 0, y: 0 }
  )
  t.deepEqual(
    index2Pos({ dimension, index: 1 }),
    { x: 1, y: 0 }
  )
  t.deepEqual(
    index2Pos({ dimension, index: 2 }),
    { x: 0, y: 1 }
  )
  t.deepEqual(
    index2Pos({ dimension, index: 3 }),
    { x: 1, y: 1 }
  )
})

test('should fail with index out of bounds', t => {
  t.throws(() => {
    pos2Index(
      {
        dimension: { X: 3, Y: 3 },
        position: { x: 3, y: 0 }}
    )
  })
})

test('get neighbor position', t => {
  t.is(getNeighborIndex(
    {
      dimension: { X: 3, Y: 3 },
      currentPos: { x: 0, y: 0 },
      relNeighborPos: { dx: 1, dy: 0 }
    }
  ),
  1
  )
  t.is(getNeighborIndex(
    {
      dimension: { X: 3, Y: 3 },
      currentPos: { x: 0, y: 0 },
      relNeighborPos: { dx: -1, dy: 0 }
    }
  ),
  2
  )
  t.is(getNeighborIndex(
    {
      dimension: { X: 3, Y: 3 },
      currentPos: { x: 1, y: 1 },
      relNeighborPos: { dx: -1, dy: 0 }
    }
  ),
  3
  )
})

test('split matrix neighbor', t => {
  const matrix = [0, 1, 2, 3]
  t.deepEqual(
    splitMatrixToNb(matrix,
      {
        dimension: { X: 2, Y: 2 },
        neighborhood: [{ dx: -1, dy: 0 }]
      }
    ),
    [[1], [0], [3], [2]])
})

test('split matrix neighbor', t => {
  const matrix = [3, 2, 1, 0]
  t.deepEqual(
    splitMatrixToNb(matrix,
      {
        dimension: { X: 2, Y: 2 },
        neighborhood: [{ dx: -1, dy: 0 }]
      }
    ),
    [
      [2], [3],
      [0], [1]
    ]
  )
})

test('algorithm', t => {
  t.is(algorithm([0, 0], 1), 0)
  t.is(algorithm([0, 1], 2), 1)
})

test('step', t => {
  const matrix = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  const dimension = { X: 3, Y: 3 }
  const neighborhood = [{ dx: 1, dy: 0 }] // right neighbor
  const next = step(matrix,
    {
      states: 9,
      algorithm,
      dimension,
      neighborhood
    }
  )
  t.deepEqual(next, [1, 2, 0, 4, 5, 3, 7, 8, 6])
})
