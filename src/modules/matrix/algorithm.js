import { splitMatrixToNb } from './neighbors'

export const step = (matrix, { states, algorithm, neighborhood, dimension }) => {
  return splitMatrixToNb(matrix, { neighborhood, dimension })
    .map(({neighbors, cell}) => {
      return algorithm(cell, neighbors, states)
    })
}

export const gol = (cell, neighbors, states) => {
  const sum = neighbors.reduce((p, c) => p + c)
  // console.log({sum, cell, ret})
  if (cell === 0) {
    return (sum === 3) ? 1 : 0
  } else {
    return (sum === 2 || sum === 3) ? cell : 0
  }
}

export const algorithms = [{
  name: 'game of life',
  method: gol
}]
