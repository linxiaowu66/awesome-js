export const updateQueryStringParam = (
  fullUrl: string,
  key: string,
  value: any
) => {
  const urlQueryString = fullUrl.split("?")[1];
  const baseUrl = fullUrl.split("?")[0];
  const newParam = `${key}=${value}`;
  let params = `?${newParam}`;

  // If the "search" string exists, then build params from it
  if (urlQueryString) {
    const keyRegex = new RegExp(`([?&])${key}[^&]*`);
    // If param exists already, update it
    if (urlQueryString.match(keyRegex) !== null) {
      params = `?${urlQueryString.replace(keyRegex, `$1${newParam}`)}`;
    } else {
      // Otherwise, add it to end of query string
      params = `?${urlQueryString}&${newParam}`;
    }
  }
  return `${baseUrl}${params}`;
};

export const getQueryStringParam = (fullUrl: string, key: string) => {
  if (typeof key !== "string" || typeof fullUrl !== "string") {
    return null;
  }
  const splitRes = fullUrl.split("?");

  if (splitRes.length === 1) {
    return null;
  }
  const searchString = splitRes[1];
  const reg = new RegExp(`(^|&)${key}=([^&]*)(&|$)`);
  var result = searchString.match(reg);

  if (result && result.length >= 2) {
    return result[2];
  }

  return null;
};

export const parseQueryString2Object = (fullUrl: string) => {
  if (typeof fullUrl !== "string") {
    return {};
  }
  const splitRes = fullUrl.split("?");

  if (splitRes.length === 1) {
    return {};
  }

  const searchString = splitRes[1];

  const result: Record<string, string> = {};
  searchString.replace(
    /([^&=]+)=([\w\W]*?)(&|$)/g,
    (substring: string, ...args: any[]) => {
      const [p1, p2] = args;
      result[p1] = p2;
      return "";
    }
  );
  return result;
};

export const queryObject2String = (
  path: string,
  queryObject?: Record<string, any>
) => {
  if (typeof queryObject === "object") {
    const queryStr = Object.keys(queryObject)
      .map((key) => `${key}=${queryObject[key]}`)
      .join("&");
    return `${path}?${queryStr}`;
  }
  return path;
};
