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
    }
  },

  get TT () {
    return {
      key: 'TT',
      name: 'Random',
      method: null,
      neighborhood: [
        {
          type: 'random',
          radius: [1, 2, 3, 4]
        }
      ]
    }
  },

  get GoL () {
    return {
      key: 'GoL',
      name: 'Game of Life',
      method: null,
      neighborhood: [
        {
          type: 'moore',
          radius: [1]
        }
      ]
    }
  }
}
