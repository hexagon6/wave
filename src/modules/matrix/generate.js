export const fillMatrix = (func, params, x, y) => {
  let i = 0
  let matrix = []
  while (i < x * y) {
    matrix.push(func(params))
    i = i + 1
  }
  return matrix
}

export const randomFieldGenerator = function (range) {
  const rand = Math.random()
  return Math.floor(rand * (range[1] - range[0]) + range[0])
}

export const _randomField = (size = 2) => {
  const range = [ 0, size ]
  return (x, y) => fillMatrix(
    randomFieldGenerator,
    range,
    x,
    y,
  )
}

export const generateCell = (size = 1, colors) => {
  return (x, y, index) => {
    return {
      x: x * size,
      y: y * size,
      color: colors[index]
    }
  }
}

export const createRow = (createCell, cells, y) => {
  return cells.map((cell, i) => createCell(y, i, cell))
}

export const sliceCellstoRows = (cells, numRows) => {
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
export const createField = (colors, cells, numRows, numCols, cellsize, states) => {
  const createCell = generateCell(cellsize, colors)
  const rows = sliceCellstoRows(cells, numRows)
  return rows.map((row, i) => {
    return createRow(createCell, row, i)
  })
}
