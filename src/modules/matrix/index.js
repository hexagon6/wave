import colormap from './colormap'

const { states, background } = colormap.bright

export {
  states as colors,
  background
}

export {
  step,
  getNeighborIndex,
  splitMatrixToNb,
  pos2Index
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
