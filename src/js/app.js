
// import * as _ from 'lodash'
import settings from './settings.js'
import Controls from '../components/Controls.html'

export default class App {
  constructor () {
    var greenbergHastings
    var randomAlgorithm
    var gameOfLife
    this.controls = new Controls({
      target: document.querySelector('controls'),
      data: {
        settings: settings,
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
                radius: [1, 2, 3]
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
}
