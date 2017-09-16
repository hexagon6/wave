import test from 'ava'

import {
  createField,
  generateCell,
  createRow,
  sliceCellstoRows,
  fillMatrix,
  randomFieldGenerator
} from '../src/modules/matrix'

test('valid transform output', t => {
  const createCell = generateCell(10)
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
  const createCell = generateCell(10, 0)
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
  t.deepEqual(createField([0, 1, 2, 3], 2, 2, 10, 0), expRes)
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
