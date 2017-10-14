import colormap from './colormap'
import { algorithms } from './algorithm'
import { pos2Index } from './neighbors'

// TODO: Refactor for switchable colors & algorithms
const { states, background } = colormap.two
const algorithm = algorithms[0].method

const cellstate = (matrix, { X, Y }, { x, y }, f) => {
  const pos = pos2Index(
    {
      dimension: { X, Y },
      position: { x, y }
    }
  )
  const newState = f(matrix[pos])
  matrix[pos] = newState
  return matrix
}

export {
  algorithm,
  cellstate,
  states as colors,
  background
}

export {
  step
} from './algorithm'

export {
  sliceCellstoRows,
  createField,
  generateCell,
  createRow,
  randomFieldGenerator,
  randomMatrix,
  fillMatrix
} from './generate'
