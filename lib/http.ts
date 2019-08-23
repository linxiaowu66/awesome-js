export const updateQueryStringParam = (baseUrl: string, key: string, value: any) => {
  const urlQueryString = document.location.search
  const newParam = `${key}=${value}`
  let params = `?${newParam}`

  // If the "search" string exists, then build params from it
  if (urlQueryString) {
    const keyRegex = new RegExp(`([?&])${key}[^&]*`);
    // If param exists already, update it
    if (urlQueryString.match(keyRegex) !== null) {
      params = urlQueryString.replace(keyRegex, `$1${newParam}`);
    } else { // Otherwise, add it to end of query string
      params = `${urlQueryString}&${newParam}`
    }
  }
  return (baseUrl + params)
}

export const queryObject2String = (path: string, queryObject: object) => {
  let url = ''
  if (typeof queryObject === 'object') {
    const queryStr = Object.keys(queryObject).map(key => `${key}=${queryObject[key]}`).join('&')
    url = `${path}?${queryStr}`
  }
  return url
}
