import test from 'ava'

import colormap from '../src/modules/matrix/colormap'

const { all_colormaps } = colormap

test('list all colormaps', t => {
  t.is(all_colormaps.length, 7)
})

test('test props of colormaps', t => {
  all_colormaps.map(({name, background, states}) => {
    // console.log({name, background, states})
    t.is('string', typeof name)
    t.not(colormap[name], undefined) // property name is the same as given name
    t.is(colormap[name].name, name)
    t.is('string', typeof background)
    t.is('object', typeof states) // array is of type object
    t.true(states.length > 1)
  })
})
