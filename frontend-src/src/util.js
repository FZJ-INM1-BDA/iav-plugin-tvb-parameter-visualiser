export function getRandomColor(seed){
  return `hsl(${seed * 97}, 100%, 50%)`
}

export function getMinMax(arrOfArr){
  return d3.extent(
    arrOfArr
      .map(arr => d3.extent(arr))
      .reduce((acc, val) => acc.concat(val), [])
  )
}