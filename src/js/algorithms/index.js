import {
  moore,
  neumann,
  neumannMoore,
  random,
  schmirdn
} from './neighborhood.js'

export default {
  get all () {
    return [
      this.GH,
      this.TT,
      this.GoL
    ]
  },

  get GH () {
    return {
      key: 'GH',
      name: 'Greenberg-Hastings',
      method: null,
      neighborhood: [
        neumann,
        moore,
        neumannMoore,
        schmirdn
      ]
    }
  },

  get TT () {
    return {
      key: 'TT',
      name: 'Random',
      method: null,
      neighborhood: [
        random
      ]
    }
  },

  get GoL () {
    return {
      key: 'GoL',
      name: 'Game of Life',
      method: null,
      neighborhood: [
        moore
      ]
    }
  }
}
