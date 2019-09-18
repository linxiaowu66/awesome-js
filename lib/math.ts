// 数学计算相关有用的函数
export class Region {
  points: number[][]
  length: number
  constructor(points: number[][]) {
    this.points = points
    this.length = this.points.length
  }
  /**
   * 计算规则的多边形的中心点位置
   *
   * @memberof Region
   */
  public centroid = () => {
    if (this.length === 0) {
      return { longitude: 0, latitude: 0}
    }

    let x = 0
    let y = 0
    let f
    let point1
    let point2

    for (let i = 0, j = this.length - 1; i < this.length; j = i, i += 1) {
      point1 = this.points[i];
      point2 = this.points[j];
      f = (point1[0] * point2[1]) - (point2[0] * point1[1]);
      x += (point1[0] + point2[0]) * f;
      y += (point1[1] + point2[1]) * f;
    }

    f = this.area() * 6;

    // x is longitude, y is latitude
    return { longitude: x / f, latitude: y / f}
  }
  /**
   * 计算规则多边形的区域，私有函数
   *
   * @private
   * @memberof Region
   */
  private area = () => {
    let area = 0
    let point1
    let point2

    for (let i = 0, j = this.length - 1; i < this.length; j = i, i += 1) {
      point1 = this.points[i];
      point2 = this.points[j];
      area += point1[0] * point2[1];
      area -= point1[1] * point2[0];
    }
    area /= 2;

    return area;
  }
}

/**
 * 计算两点之间的直线距离
 * @param {number} lng1 起点纬度
 * @param {number} lat1 起点纬度
 * @param {number} lng2 终点纬度
 * @param {number} lat2 终点纬度
 * @returns {number} 两点之间的直线距离，单位：米
 */
export const getDistance = (lng1: number, lat1: number, lng2: number, lat2: number): number => {
  const _lng1 = +(lng1 / (10 ** 6)).toFixed(6);
  const _lat1 = +(lat1 / (10 ** 6)).toFixed(6);
  const _lng2 = +(lng2 / (10 ** 6)).toFixed(6);
  const _lat2 = +(lat2 / (10 ** 6)).toFixed(6);
  function toRadians(d: number) {
    return (d * Math.PI) / 180;
  }

  const radLat1 = toRadians(_lat1);
  const radLat2 = toRadians(_lat2);
  const deltaLat = radLat1 - radLat2;
  const deltaLng = toRadians(_lng1) - toRadians(_lng2);
  // eslint-disable-next-line
  const dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));
  return dis * 6378137;
}

export function decodeLatLng(origin: number): number {
  if (!+origin) {
    return null
  }
  return origin / 1e6
}

export function encodeLatLng(origin: number): number {
  if (!+origin) {
    return null
  }
  return origin * 1e6
}
