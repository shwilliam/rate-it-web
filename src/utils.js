export const getTweenedPath = (from, to, progress) =>
  from
    .map((coords, i) => {
      if (typeof coords === 'string') return coords

      return coords.map((val, j) => {
        const toVal = to[i][j]
        const valDelta = toVal - val
        return val + valDelta * progress
      })
    })
    .reduce((pathStr, coords) => {
      if (typeof coords === 'string') return `${pathStr} ${coords}`
      return `${pathStr} ${coords.join()}`
    }, '')

export const getTweenedHSL = (from, to, progress) =>
  `hsl(${from[0] + (to[0] - from[0]) * progress}deg, ${
    from[1] + (to[1] - from[1]) * progress
  }%, ${from[2] + (to[2] - from[2]) * progress}%)`

export const preventDefault = e => e.preventDefault()
