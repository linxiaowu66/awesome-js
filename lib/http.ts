export const updateQueryStringParam = (fullUrl: string, key: string, value: any) => {
  const urlQueryString = fullUrl.split('?')[1]
  const baseUrl = fullUrl.split('?')[0]
  const newParam = `${key}=${value}`
  let params = `?${newParam}`

  // If the "search" string exists, then build params from it
  if (urlQueryString) {
    const keyRegex = new RegExp(`([?&])${key}[^&]*`);
    // If param exists already, update it
    if (urlQueryString.match(keyRegex) !== null) {
      params = `?${urlQueryString.replace(keyRegex, `$1${newParam}`)}`;
    } else { // Otherwise, add it to end of query string
      params = `?${urlQueryString}&${newParam}`
    }
  }
  return `${baseUrl}${params}`
}

export const queryObject2String = (path: string, queryObject?: object) => {
  if (typeof queryObject === 'object') {
    const queryStr = Object.keys(queryObject).map(key => `${key}=${queryObject[key]}`).join('&')
    return `${path}?${queryStr}`
  }
  return path
}
