export function arrayInsert<T>(array: T[], value: T) {
  const index = array.indexOf(value)
  index < 0 && array.push(value)
}

export function arrayRemove<T>(array: T[], value: T) {
  const index = array.indexOf(value)
  index < 0 || array.splice(index, 1)
}
