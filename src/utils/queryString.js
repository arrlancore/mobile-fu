export function decode(currentSearch) {
  let result = {}
  if (currentSearch) {
    const search = currentSearch.substring(1)
    result = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}',
      function(key, value) {
        return key === '' ? value : decodeURIComponent(value)
      })
  }
  return result
}

export function encode(obj) {
  var str = []
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
    }
  }
  return str.join('&')
}

