import colormap from './colormap'
import {
  randomMatrix,
  createField
} from './generate'

const { states, background } = colormap.bright

const _createField = createField

export {
  states as colors,
  background,
  _createField as createField,
  randomMatrix
}

export {
  step
} from './algorithm'

export {
  sliceCellstoRows,
  generateCell,
  createRow,
  randomFieldGenerator,
  fillMatrix
} from './generate'
