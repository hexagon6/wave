import colormap from './colormap'

const { states, background } = colormap.bright

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

const fillMatrix = (func, params, x, y) => {
  let i = 0
  let matrix = []
  while (i < x * y) {
    matrix.push(func(params))
    i = i + 1
  }
  return matrix
}

const randomFieldGenerator = function (range) {
  const rand = Math.random()
  return Math.floor(rand * (range[1] - range[0]) + range[0])
}

export {
  background,
  generateCell,
  createField,
  createRow,
  sliceCellstoRows,
  fillMatrix,
  randomFieldGenerator
}
