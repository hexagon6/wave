import colormap from './colormap'
import {
  _randomField,
  createField
} from './generate'

const { states, background } = colormap.bright

const _createField = createField

const randomField = _randomField(states.length)

export {
  states as colors,
  background,
  _createField as createField,
  randomField
}

export {
  sliceCellstoRows,
  generateCell,
  createRow,
  randomFieldGenerator,
  fillMatrix
} from './generate'
