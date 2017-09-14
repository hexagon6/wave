const colormap = [
  '#ffffff',
  '#ff0000',
  '#ffff00',
  '#000000',
  '#3abe00',
  '#afeefb'
]

const generateCell = (size) => {
  return (x, y, state) => {
    const cellsize = size

    return {
      x: x * cellsize,
      y: y * cellsize,
      color: colormap[state]
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

const createField = (size, cells, numRows, numCols) => {
  const createCell = generateCell(size)
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
  generateCell,
  createField,
  createRow,
  sliceCellstoRows,
  fillMatrix,
  randomFieldGenerator
}
