import colormap from './colormap'
import {
  _randomField
} from './generate'

const { states, background } = colormap.bright

const randomField = _randomField(states.length)

const generateCell = (size = 1) => {
  return (x, y, state) => {
    return {
      x: x * size,
      y: y * size,
      color: states[state]
    }
  }
}

const createRow = (createCell, cells, y) => {
  return cells.map((cell, i) => createCell(y, i, cell))
}

const sliceCellstoRows = (cells, numRows) => {
  const n = cells.length / numRows
  // fixme replace with native function or lodash?
  let i = 0
  let nArr = []
  while (i < n) {
    nArr.push(i * n)
    i = i + 1
  }
  return nArr.map(v => cells.slice(v, v + n))
}

// FIXME: check that matrix dimensions match input parameters x & y
const createField = (cells, numRows, numCols, cellsize) => {
  const createCell = generateCell(cellsize)
  const rows = sliceCellstoRows(cells, numRows)
  return rows.map((row, i) => {
    return createRow(createCell, row, i)
  })
}

export {
  background,
  generateCell,
  createField,
  createRow,
  randomField,
  sliceCellstoRows
}

export {
  randomFieldGenerator,
  fillMatrix
} from './generate'
