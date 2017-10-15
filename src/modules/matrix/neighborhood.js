export const neumann = (radius) => {
  const base = [
    { dx: -1, dy: 0 },
    { dx: 0, dy: -1 },
    { dx: 0, dy: 1 },
    { dx: 1, dy: 0 },
  ]
  if (radius === 1) {
    return () => base
  } else if (radius === 2) {
    const ret = [
      ...base,
      base.map(({dx, dy}) => {
        return {
          dx: dx * radius,
          dy: dy * radius
        }
      })
    ]
    return () => {
      return ret
    }
  }
}

export const moore = (radius) => {
  const base = [
    { dx: -1, dy: -1 },
    { dx: -1, dy: 0 },
    { dx: -1, dy: 1 },
    { dx: 0, dy: -1 },
    { dx: 0, dy: 1 },
    { dx: 1, dy: -1 },
    { dx: 1, dy: 0 },
    { dx: 1, dy: 1 },
  ]
  if (radius === 1) {
    return () => base
  } else if (radius === 2) {
    const extend = base.map(({ dx, dy }) => {
      return {
        dx: dx * radius,
        dy: dy * radius,
      }
    })
    const ret = [ ...base, ...extend ]
    return () => ret
  }
}

export const neumannMoore = () => {
  // FIXME: implement switching between von neumann & moore with
  // generator function
  const _moore = moore(1)
  return () => _moore
}

export const schmirdn = {
  type: 'schmirdn',
  radius: [1, 2, 3]
}
export const random = {
  type: 'random',
  radius: [1, 2, 3, 4]
}

export default {
  moore: moore,
  neumann: neumann,
  neumannMoore: neumannMoore
}
