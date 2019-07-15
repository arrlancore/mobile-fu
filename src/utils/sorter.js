export const sortString = (a, b) => fieldName =>
  a[fieldName] > b[fieldName] ? 1 : b[fieldName] > a[fieldName] ? -1 : 0

export const sortNumber = (a, b) => fieldName => a[fieldName] - b[fieldName]
