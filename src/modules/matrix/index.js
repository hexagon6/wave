import colormap from './colormap'
import { algorithms } from './algorithm'

// TODO: Refactor for switchable colors & algorithms
const { states, background } = colormap.bright
const algorithm = algorithms[0].method

export {
  algorithm,
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
