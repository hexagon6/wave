
import * as _ from 'lodash'
import settings from './settings.js'
import state from './state.js'
import Controls from './Controls.html'

export default class App {
  constructor () {
    var greenbergHastings
    var randomAlgorithm
    var gameOfLife
    this.app = new Controls({
      target: document.querySelector('controls'),
      data: {
        name: 'world',
        settings: settings,
        state: state,
        algorithms: [
          {
            key: 'GH',
            name: 'Greenberg-Hastings',
            method: greenbergHastings,
            neighborhood: [ // uses per default 'von neumann neighboorhood' with r = 1
              {
                type: 'neumann',
                radius: [1, 2, 3]
              },
              {
                type: 'moore',
                radius: [1, 2]
              },
              {
                type: 'neumann_moore',
                radius: [1],
                states: 2
              },
              {
                type: 'schmirdn',
                radius: [1, 2, 4]
              }
            ]
          },
          {
            key: 'TT',
            name: 'Random',
            method: randomAlgorithm,
            neighborhood: [
              {
                type: 'random',
                radius: [1, 2, 3, 4]
              }
            ]
          },
          {
            key: 'GoL',
            name: 'Game of Life',
            method: gameOfLife,
            neighborhood: [
              {
                type: 'moore',
                radius: [1]
              }
            ]
          }
        ]
      }
    })
  }

  getSelectedAlgorithm () {
    var ops = this.app.refs.algorithm.children
    for (var o in ops) {
      if (ops[o].selected) {
        return ops[o].value
      }
    }
  }

  count2Three () {
    console.log(_.range(1, 3))
  }
}