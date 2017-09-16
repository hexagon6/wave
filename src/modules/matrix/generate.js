export const fillMatrix = (func, params, x, y) => {
  let i = 0
  let matrix = []
  while (i < x * y) {
    matrix.push(func(params))
    i = i + 1
  }
  return matrix
}

export const randomFieldGenerator = function (range) {
  const rand = Math.random()
  return Math.floor(rand * (range[1] - range[0]) + range[0])
}

export const _randomField = (size = 2) => {
  const range = [ 0, size ]
  return (x, y) => fillMatrix(
    randomFieldGenerator,
    range,
    x,
    y,
  )
}
