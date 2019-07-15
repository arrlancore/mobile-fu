export function decode(currentSearch) {
  let result = {}
  if (currentSearch) {
    const search = currentSearch.substring(1)
    result = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function(key, value) {
      return key === '' ? value : decodeURIComponent(value)
    })
  }
  return result
}

export function encode(obj) {
  var str = []
  for (var p in obj) {
    // eslint-disable-next-line
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
    }
  }
  return str.join('&')
}
export function setQueryUrl(newQueries) {
  const search = window.history.location.search
  const query = decode(search)
  newQueries.forEach(({ key, value }) => {
    query[key] = value
  })
  window.history.replace(`${window.history.location.pathname}?${encode(query)}`)
}
