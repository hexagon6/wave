var backgroundColor = '#673AB7'
var color = '#58FAF4'
var borderColor = '#2ECCFA'

var states = [
  {
    // 0: dead, 1: alive
    name: 'two',
    states: [backgroundColor, color],
  },
  {
    // 0: resting, 1: excited, 2: refractoring
    name: 'wave',
    states: [backgroundColor, color, borderColor],
  },
  {
    // 0: resting, 1: excited, 2+: refractoring
    name: 'four',
    states: [backgroundColor, '#FF6688', '#88FF66', '#6688FF'],
  },
  {
    // 0: resting, 1: excited, 2+: refractoring
    name: 'six',
    states: ['#4CC3D9', '#93648D', '#404040', '#F16745', '#FFC65D', '#7BC8A4'],
  },
  {
    // 0: resting, 1: excited, 2+: refractoring
    name: 'sixteen',
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
      borderColor,
    ],
  },
]

export default states
