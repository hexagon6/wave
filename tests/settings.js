import test from 'ava'

import settings from '../src/js/settings.js'

test('default settings', t => {
  t.true(settings.intro)
  t.is(settings.state, 'wave')
  t.not(settings.ready)
  t.is(settings.speed, 75)
})
