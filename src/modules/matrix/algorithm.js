import { splitMatrixToNb } from './neighbors'

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
