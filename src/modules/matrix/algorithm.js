const pos2Index = ({dimension: { X, Y }, position: { x, y }}) => {
  if (x >= X || y >= Y || x < 0 || y < 0) {
    throw Error('index out of bounds, do you travel outside the universe??')
  }
  return y * X + x
}

const index2Pos = ({dimension: { X, Y }, index}) => {
  const x = index % X
  const y = Math.floor(index / X)
  return { x, y }
}

const getNeighborIndex = (
  {
    dimension, dimension: { X, Y },
    currentPos: { x, y },
    relNeighborPos: { dx, dy }}) => {
  // adding dimension should fix direct neighborhoods offset out of bounds in negative ranges
  // and modulo will adjust it
  const _x = (X + (x + dx) % X) % X
  const _y = (Y + (y + dy) % Y) % Y
  return pos2Index({ dimension, position: { x: _x, y: _y } })
}

const splitMatrixToNb = (matrix, { neighborhood, dimension }) => {
  return matrix.map((_, index) => {
    return neighborhood.map(({dx, dy}) => {
      const currentPos = index2Pos({dimension, index})
      const nbId = getNeighborIndex({
        dimension,
        currentPos,
        relNeighborPos: { dx, dy }
      })
      return matrix[nbId] // status
    })
  })
}

export const step = (matrix, { states, algorithm, neighborhood, dimension }) => {
  return splitMatrixToNb(matrix, { neighborhood, dimension })
    .map((nb) => {
      return algorithm(nb, states)
    })
}

export const algorithm = (neighbors, states) => {
  const sum = neighbors.reduce((p, c) => p + c)
  return sum % states
}

export const algorithms = [{
  name: 'summer',
  method: algorithm
}]