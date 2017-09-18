const defaultPurple = '#673AB7'
const backgroundColor = '#673AB7'
const color = '#58FAF4'
const borderColor = '#2ECCFA'

const two = {
  // 0: dead, 1: alive
  name: 'two',
  background: backgroundColor,
  states: [
    backgroundColor,
    color
  ]
}

const wave = {
  // 0: resting, 1: excited, 2: refractoring
  name: 'wave',
  background: backgroundColor,
  states: [
    backgroundColor,
    color,
    borderColor
  ]
}

const four = {
  // 0: resting, 1: excited, 2+: refractoring
  name: 'four',
  background: backgroundColor,
  states: [
    backgroundColor,
    '#FF6688',
    '#88FF66',
    '#6688FF'
  ]
}

const bright = {
  name: 'bright',
  background: '#33feaf',
  states: [
    '#ffffff',
    '#ff0000',
    '#ffff00',
    '#000000',
    '#3abe00',
    '#afeefb'
  ]
}

const dark = {
  name: 'dark',
  background: '#33af33',
  states: [
    '#bbbbbb',
    '#990033',
    '#333300',
    '#111111',
    '#3abe00',
    '#afaafb'
  ]
}

const six = {
  name: 'six',
  background: defaultPurple,
  states: [
    '#4CC3D9',
    '#93648D',
    '#404040',
    '#F16745',
    '#FFC65D',
    '#7BC8A4'
  ]
}

const sixteen = {
  // 0: resting, 1: excited, 2+: refractoring
  name: 'sixteen',
  background: backgroundColor,
  states: [
    backgroundColor,
    '#000000',
    '#770000',
    '#BB0000',
    '#FF0000',
    '#BB7700',
    '#77BB00',
    '#00FF00',
    '#00FF77',
    '#00FFBB',
    '#00FFFF',
    '#0FDFFF',
    '#9FFFFF',
    '#FFFFFF',
    color,
    borderColor
  ]
}

export default { bright, dark, two, wave, four, six, sixteen }
