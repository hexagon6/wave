export const step = (matrix, { states, algorithm, neighborhood }) => {
  console.log(matrix)
  console.log(typeof algorithm)
  console.log(neighborhood)

  return matrix.map(n => (n + 1) % states)
}
