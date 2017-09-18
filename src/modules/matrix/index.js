import colormap from './colormap'
import {
  randomMatrix,
  createField
} from './generate'

const { states, background } = colormap.bright

const _createField = createField

const _randomMatrix = randomMatrix(states.length)

export {
  states as colors,
  background,
  _createField as createField,
  _randomMatrix as randomMatrix
}

export {
  sliceCellstoRows,
  generateCell,
  createRow,
  randomFieldGenerator,
  fillMatrix
} from './generate'
