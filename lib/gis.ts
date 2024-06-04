const { PI, sin, cos, asin, acos } = Math;

export interface DotProps {
  x: number;
  y: number;
}

export interface PointsProps {
  lng: number;
  lat: number;
}
const K0 = 0.9996;

const E = 0.00669438;
const E2 = Math.pow(E, 2);
const E3 = Math.pow(E, 3);
const E_P2 = E / (1 - E);

const SQRT_E = Math.sqrt(1 - E);
const _E = (1 - SQRT_E) / (1 + SQRT_E);
const _E2 = Math.pow(_E, 2);
const _E3 = Math.pow(_E, 3);
const _E4 = Math.pow(_E, 4);
const _E5 = Math.pow(_E, 5);

const M1 = 1 - E / 4 - (3 * E2) / 64 - (5 * E3) / 256;
const M2 = (3 * E) / 8 + (3 * E2) / 32 + (45 * E3) / 1024;
const M3 = (15 * E2) / 256 + (45 * E3) / 1024;
const M4 = (35 * E3) / 3072;

const P2 = (3 / 2) * _E - (27 / 32) * _E3 + (269 / 512) * _E5;
const P3 = (21 / 16) * _E2 - (55 / 32) * _E4;
const P4 = (151 / 96) * _E3 - (417 / 128) * _E5;
const P5 = (1097 / 512) * _E4;

const R = 6378137;

const ZONE_LETTERS = "CDEFGHJKLMNPQRSTUVWXX";

const dayMs = 1000 * 60 * 60 * 24;
const J1970 = 2440588;
const J2000 = 2451545;
const J0 = 0.0009;
const rad = PI / 180;
const e = rad * 23.4397;
export class Region {
  points: number[][];
  length: number;
  constructor(points: number[][]) {
    this.points = points;
    this.length = this.points.length;
  }
  /**
   * 计算规则的多边形的中心点位置
   *
   * @memberof Region
   */
  public centroid = () => {
    if (this.length === 0) {
      return { longitude: 0, latitude: 0 };
    }

    let x = 0;
    let y = 0;
    let f;
    let point1;
    let point2;

    for (let i = 0, j = this.length - 1; i < this.length; j = i, i += 1) {
      point1 = this.points[i];
      point2 = this.points[j];
      f = point1[0] * point2[1] - point2[0] * point1[1];
      x += (point1[0] + point2[0]) * f;
      y += (point1[1] + point2[1]) * f;
    }

    f = this.area() * 6;

    // x is longitude, y is latitude
    return { longitude: x / f, latitude: y / f };
  };
  /**
   * 计算规则多边形的区域，私有函数
   *
   * @private
   * @memberof Region
   */
  private area = () => {
    let area = 0;
    let point1;
    let point2;

    for (let i = 0, j = this.length - 1; i < this.length; j = i, i += 1) {
      point1 = this.points[i];
      point2 = this.points[j];
      area += point1[0] * point2[1];
      area -= point1[1] * point2[0];
    }
    area /= 2;

    return area;
  };
}

/**
 * 根据各个方位角得到经纬度
 * @param easting
 * @param northing
 * @param zoneNum
 * @param zoneLetter
 * @param northern
 * @returns
 */
export function toLatLon(
  easting: number,
  northing: number,
  zoneNum: number,
  zoneLetter: string,
  northern?: boolean
) {
  // strict = strict !== undefined ? strict : true;

  if (!zoneLetter && northern === undefined) {
    throw new Error("either zoneLetter or northern needs to be set");
  } else if (zoneLetter && northern !== undefined) {
    throw new Error("set either zoneLetter or northern, but not both");
  }
  if (zoneNum < 1 || zoneNum > 60) {
    throw new RangeError("zone number out of range (must be between 1 and 60)");
  }
  if (zoneLetter) {
    // eslint-disable-next-line no-param-reassign
    zoneLetter = zoneLetter.toUpperCase();
    if (zoneLetter.length !== 1 || ZONE_LETTERS.indexOf(zoneLetter) === -1) {
      throw new RangeError(
        "zone letter out of range (must be between C and X)"
      );
    }
    // eslint-disable-next-line no-param-reassign
    northern = zoneLetter >= "N";
  }

  const x = easting - 500000;
  let y = northing;

  if (!northern) y -= 1e7;

  const m = y / K0;
  const mu = m / (R * M1);

  const pRad =
    mu +
    P2 * Math.sin(2 * mu) +
    P3 * Math.sin(4 * mu) +
    P4 * Math.sin(6 * mu) +
    P5 * Math.sin(8 * mu);

  const pSin = Math.sin(pRad);
  const pSin2 = Math.pow(pSin, 2);

  const pCos = Math.cos(pRad);

  const pTan = Math.tan(pRad);
  const pTan2 = Math.pow(pTan, 2);
  const pTan4 = Math.pow(pTan, 4);

  const epSin = 1 - E * pSin2;
  const epSinSqrt = Math.sqrt(epSin);

  const n = R / epSinSqrt;
  const r = (1 - E) / epSin;

  const c = _E * pCos * pCos;
  const c2 = c * c;

  const d = x / (n * K0);
  const d2 = Math.pow(d, 2);
  const d3 = Math.pow(d, 3);
  const d4 = Math.pow(d, 4);
  const d5 = Math.pow(d, 5);
  const d6 = Math.pow(d, 6);

  const latitude =
    pRad -
    (pTan / r) *
      (d2 / 2 - (d4 / 24) * (5 + 3 * pTan2 + 10 * c - 4 * c2 - 9 * E_P2)) +
    (d6 / 720) * (61 + 90 * pTan2 + 298 * c + 45 * pTan4 - 252 * E_P2 - 3 * c2);
  const longitude =
    (d -
      (d3 / 6) * (1 + 2 * pTan2 + c) +
      (d5 / 120) * (5 - 2 * c + 28 * pTan2 - 3 * c2 + 8 * E_P2 + 24 * pTan4)) /
    pCos;

  return [
    toDegrees(longitude) + zoneNumberToCentralLongitude(zoneNum),
    toDegrees(latitude),
  ];
}
/**
 * 根据经纬度得到各个方位角
 * @param latitude
 * @param longitude
 * @param forceZoneNum
 * @returns
 */
export function fromLatLon(
  latitude: number,
  longitude: number,
  forceZoneNum?: number
) {
  if (latitude > 84 || latitude < -80) {
    throw new RangeError(
      "latitude out of range (must be between 80 deg S and 84 deg N)"
    );
  }
  if (longitude > 180 || longitude < -180) {
    throw new RangeError(
      "longitude out of range (must be between 180 deg W and 180 deg E)"
    );
  }

  const latRad = toRadians(latitude);
  const latSin = Math.sin(latRad);
  const latCos = Math.cos(latRad);

  const latTan = Math.tan(latRad);
  const latTan2 = Math.pow(latTan, 2);
  const latTan4 = Math.pow(latTan, 4);

  let zoneNum;

  if (forceZoneNum === undefined) {
    zoneNum = latLonToZoneNumber(latitude, longitude);
  } else {
    zoneNum = forceZoneNum;
  }

  const zoneLetter = latitudeToZoneLetter(latitude);

  const lonRad = toRadians(longitude);
  const centralLon = zoneNumberToCentralLongitude(zoneNum);
  const centralLonRad = toRadians(centralLon);

  const n = R / Math.sqrt(1 - E * latSin * latSin);
  const c = E_P2 * latCos * latCos;

  const a = latCos * (lonRad - centralLonRad);
  const a2 = Math.pow(a, 2);
  const a3 = Math.pow(a, 3);
  const a4 = Math.pow(a, 4);
  const a5 = Math.pow(a, 5);
  const a6 = Math.pow(a, 6);

  const m =
    R *
    (M1 * latRad -
      M2 * Math.sin(2 * latRad) +
      M3 * Math.sin(4 * latRad) -
      M4 * Math.sin(6 * latRad));
  const easting =
    K0 *
      n *
      (a +
        (a3 / 6) * (1 - latTan2 + c) +
        (a5 / 120) * (5 - 18 * latTan2 + latTan4 + 72 * c - 58 * E_P2)) +
    500000;
  let northing =
    K0 *
    (m +
      n *
        latTan *
        (a2 / 2 +
          (a4 / 24) * (5 - latTan2 + 9 * c + 4 * c * c) +
          (a6 / 720) * (61 - 58 * latTan2 + latTan4 + 600 * c - 330 * E_P2)));
  if (latitude < 0) northing += 1e7;

  return {
    easting,
    northing,
    zoneNum,
    zoneLetter,
  };
}

export function latitudeToZoneLetter(latitude: number) {
  if (latitude >= -80 && latitude <= 84) {
    return ZONE_LETTERS[Math.floor((latitude + 80) / 8)];
  } else {
    return null;
  }
}

export function latLonToZoneNumber(latitude: number, longitude: number) {
  if (latitude >= 56 && latitude < 64 && longitude >= 3 && longitude < 12)
    return 32;

  if (latitude >= 72 && latitude <= 84 && longitude >= 0) {
    if (longitude < 9) return 31;
    if (longitude < 21) return 33;
    if (longitude < 33) return 35;
    if (longitude < 42) return 37;
  }

  return Math.floor((longitude + 180) / 6) + 1;
}

export function zoneNumberToCentralLongitude(zoneNum: number) {
  return (zoneNum - 1) * 6 - 180 + 3;
}
/**
 * 根据弧度转角度
 * @param rad
 * @returns
 */
export function toDegrees(rad: number) {
  return (rad / Math.PI) * 180;
}
/**
 * 根据角度转弧度
 * @param deg
 * @returns
 */
export function toRadians(deg: number) {
  return (deg * Math.PI) / 180;
}
/**
 * WGS坐标转GCJ坐标
 * @param utm_x
 * @param utm_y
 * @returns
 */
export function wgs84togcj02(utm_x: number, utm_y: number) {
  const point = toLatLon(
    parseFloat(utm_x.toString()),
    parseFloat(utm_y.toString()),
    51,
    "R"
  );
  return point;
}
/**
 * GCJ坐标转WGS坐标
 * @param pos
 * @returns
 */
export function gcj02towgs84(pos: number[]) {
  const res = fromLatLon(pos[1], pos[0]);
  return { utm_x: res.easting, utm_y: res.northing };
}
/**
 * 根据两个经纬度点计算之间的距离
 * @param lng1
 * @param lat1
 * @param lng2
 * @param lat2
 * @returns  {number} 两点之间的直线距离，单位：米
 */
export function getDistance(
  lng1: number,
  lat1: number,
  lng2: number,
  lat2: number
) {
  const radLat1 = toRadians(lat1);
  const radLat2 = toRadians(lat2);
  const deltaLat = radLat1 - radLat2;
  const deltaLng = toRadians(lng1) - toRadians(lng2);
  let s =
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(deltaLat / 2), 2) +
          Math.cos(radLat1) *
            Math.cos(radLat2) *
            Math.pow(Math.sin(deltaLng / 2), 2)
      )
    );
  return s * 6378137;
}

/**
 * 根据两个经纬度点坐标计算之间的夹角
 * @param lng_a
 * @param lat_a
 * @param lng_b
 * @param lat_b
 * @returns
 */
export function getAngleByLngLat(
  lng_a: number,
  lat_a: number,
  lng_b: number,
  lat_b: number
) {
  const a = ((90 - lat_b) * Math.PI) / 180;

  const b = ((90 - lat_a) * Math.PI) / 180;

  const AOC_BOC = ((lng_b - lng_a) * Math.PI) / 180;

  const cosc =
    Math.cos(a) * Math.cos(b) + Math.sin(a) * Math.sin(b) * Math.cos(AOC_BOC);

  const sinc = Math.sqrt(1 - cosc * cosc);

  const sinA = (Math.sin(a) * Math.sin(AOC_BOC)) / sinc;

  const A = (Math.asin(sinA) * 180) / Math.PI;

  let res = 0;

  if (lng_b > lng_a && lat_b > lat_a) res = A;
  else if (lng_b > lng_a && lat_b < lat_a) res = 180 - A;
  else if (lng_b < lng_a && lat_b < lat_a) res = 180 - A;
  else if (lng_b < lng_a && lat_b > lat_a) res = 360 + A;
  else if (lng_b > lng_a && lat_b === lat_a) res = 90;
  else if (lng_b < lng_a && lat_b === lat_a) res = 270;
  else if (lng_b === lng_a && lat_b > lat_a) res = 0;
  else if (lng_b === lng_a && lat_b < lat_a) res = 180;

  return res;
}

/**
 * 判断某个坐标点是否在一个区域内部
 * @param  dot {{x, y}} 需要判断的点
 * @param  points {{lng, lat}[]} 多边形点坐标的数组，为保证图形能够闭合，起点和终点必须相等。
 *        比如三角形需要四个点表示，第一个点和最后一个点必须相同。
 */
export function judgePointIsInSpecificArea(
  { x: ALon, y: ALat }: DotProps,
  points: DotProps[]
) {
  let iSum = 0;
  let dLon1: number;
  let dLon2: number;
  let dLat1: number;
  let dLat2: number;
  let dLon: number;

  if (points.length < 3) return false;
  const iCount = points.length;
  const pointsRes: PointsProps[] = points.map((item) => ({
    lng: item.x,
    lat: item.y,
  }));

  for (let i = 0; i < iCount; i++) {
    if (i === iCount - 1) {
      dLon1 = pointsRes[i].lng;
      dLat1 = pointsRes[i].lat;
      dLon2 = pointsRes[0].lng;
      dLat2 = pointsRes[0].lat;
    } else {
      dLon1 = pointsRes[i].lng;
      dLat1 = pointsRes[i].lat;
      dLon2 = pointsRes[i + 1].lng;
      dLat2 = pointsRes[i + 1].lat;
    }
    // 以下语句判断A点是否在边的两端点的水平平行线之间，在则可能有交点，开始判断交点是否在左射线上
    if ((ALat >= dLat1 && ALat < dLat2) || (ALat >= dLat2 && ALat < dLat1)) {
      if (Math.abs(dLat1 - dLat2) > 0) {
        // 得到 A点向左射线与边的交点的x坐标：
        dLon = dLon1 - ((dLon1 - dLon2) * (dLat1 - ALat)) / (dLat1 - dLat2);
        if (dLon < ALon) iSum++;
      }
    }
  }
  if (iSum % 2 !== 0) return true;
  return false;
}

/**
 * 根据起始点坐标以及方向和距离计算目的点的经纬度
 * @param {*} lng 经度 113.3960698
 * @param {*} lat 纬度 22.941386
 * @param {*} brng 方位角 45   ---- 正北方：000°或360°  正东方：090° 正南方：180°  正西方：270°
 * @param {*} dist 距离 单位米
 *
 */
export function getTargetLngLatByAngleDistanceFromSourceLngLat(
  lng: number,
  lat: number,
  brng: number,
  dist: number
) {
  //大地坐标系资料WGS-84 长半径a=6378137 短半径b=6356752.3142 扁率f=1/298.2572236
  const a = 6378137;
  const b = 6356752.3142;
  const f = 1 / 298.257223563;

  const lon1 = lng * 1;
  const lat1 = lat * 1;
  const s = dist;
  const alpha1 = toRadians(brng);
  const sinAlpha1 = Math.sin(alpha1);
  const cosAlpha1 = Math.cos(alpha1);

  const tanU1 = (1 - f) * Math.tan(toRadians(lat1));
  const cosU1 = 1 / Math.sqrt(1 + tanU1 * tanU1),
    sinU1 = tanU1 * cosU1;
  const sigma1 = Math.atan2(tanU1, cosAlpha1);
  const sinAlpha = cosU1 * sinAlpha1;
  const cosSqAlpha = 1 - sinAlpha * sinAlpha;
  const uSq = (cosSqAlpha * (a * a - b * b)) / (b * b);
  const A = 1 + (uSq / 16384) * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
  const B = (uSq / 1024) * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));

  let sigma = s / (b * A);
  let sigmaP = 2 * Math.PI;
  let sinSigma = 1;
  let cosSigma = 1;
  let cos2SigmaM = 1;
  while (Math.abs(sigma - sigmaP) > 1e-12) {
    cos2SigmaM = Math.cos(2 * sigma1 + sigma);
    sinSigma = Math.sin(sigma);
    cosSigma = Math.cos(sigma);
    const deltaSigma =
      B *
      sinSigma *
      (cos2SigmaM +
        (B / 4) *
          (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) -
            (B / 6) *
              cos2SigmaM *
              (-3 + 4 * sinSigma * sinSigma) *
              (-3 + 4 * cos2SigmaM * cos2SigmaM)));
    sigmaP = sigma;
    sigma = s / (b * A) + deltaSigma;
  }

  const tmp = sinU1 * sinSigma - cosU1 * cosSigma * cosAlpha1;
  const lat2 = Math.atan2(
    sinU1 * cosSigma + cosU1 * sinSigma * cosAlpha1,
    (1 - f) * Math.sqrt(sinAlpha * sinAlpha + tmp * tmp)
  );
  const lambda = Math.atan2(
    sinSigma * sinAlpha1,
    cosU1 * cosSigma - sinU1 * sinSigma * cosAlpha1
  );
  const C = (f / 16) * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
  const L =
    lambda -
    (1 - C) *
      f *
      sinAlpha *
      (sigma +
        C *
          sinSigma *
          (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));

  // const revAz = Math.atan2(sinAlpha, -tmp); // final bearing

  const lngLatObj = { lng: lon1 + toDegrees(L), lat: toDegrees(lat2) };
  return lngLatObj;
}
export function decodeLatLng(origin: number | null): number {
  if (!+origin) {
    return null;
  }
  return origin / 1e6;
}

export function encodeLatLng(origin: number | null): number {
  if (!+origin) {
    return null;
  }
  return origin * 1e6;
}

const toJulian = (date: Date) => {
  return date.valueOf() / dayMs - 0.5 + J1970;
};
const fromJulian = (j: number) => {
  return new Date((j + 0.5 - J1970) * dayMs);
};
const toDays = (date: Date) => {
  return toJulian(date) - J2000;
};

const declination = (l: number, b: number) => {
  return asin(sin(b) * cos(e) + cos(b) * sin(e) * sin(l));
};

const solarMeanAnomaly = (d: number) => {
  return rad * (357.5291 + 0.98560028 * d);
};

const eclipticLongitude = (M: number) => {
  const C = rad * (1.9148 * sin(M) + 0.02 * sin(2 * M) + 0.0003 * sin(3 * M)); // equation of center
  const P = rad * 102.9372; // perihelion of the Earth

  return M + C + P + PI;
};

const times: Array<[number, string, string]> = [
  [-0.833, "sunrise", "sunset"],
  [-0.3, "sunriseEnd", "sunsetStart"],
  [-6, "dawn", "dusk"],
  [-12, "nauticalDawn", "nauticalDusk"],
  [-18, "nightEnd", "night"],
  [6, "goldenHourEnd", "goldenHour"],
];

const julianCycle = (d: number, lw: number) => {
  return Math.round(d - J0 - lw / (2 * PI));
};

const approxTransit = (Ht: number, lw: number, n: number) => {
  return J0 + (Ht + lw) / (2 * PI) + n;
};
const solarTransitJ = (ds: number, M: number, L: number) => {
  return J2000 + ds + 0.0053 * sin(M) - 0.0069 * sin(2 * L);
};

const hourAngle = (h: number, phi: number, d: number) => {
  return acos((sin(h) - sin(phi) * sin(d)) / (cos(phi) * cos(d)));
};
const observerAngle = (height: number) => {
  return (-2.076 * Math.sqrt(height)) / 60;
};

const getSetJ = (
  h: number,
  lw: number,
  phi: number,
  dec: number,
  n: number,
  M: number,
  L: number
) => {
  const w = hourAngle(h, phi, dec);
  const a = approxTransit(w, lw, n);
  return solarTransitJ(a, M, L);
};

/**
 * 根据日期以及经纬度，按照潮汐算法计算出当天的日出日落时间
 * @param date 查询的日期
 * @param lat 纬度
 * @param lng 精度
 * @param height 海拔（可选），没有的话默认为0
 * @returns
 */
export const getSunRhythm = (
  date: Date,
  lat: number,
  lng: number,
  height = 0
) => {
  const lw = rad * -lng;
  const phi = rad * lat;

  const dh = observerAngle(height);

  const d = toDays(date);
  const n = julianCycle(d, lw);
  const ds = approxTransit(0, lw, n);

  const M = solarMeanAnomaly(ds);
  const L = eclipticLongitude(M);
  const dec = declination(L, 0);

  const Jnoon = solarTransitJ(ds, M, L);

  let i;
  let len;
  let time;
  let h0;
  let Jset;
  let Jrise;

  const result: Record<string, Date> = {
    solarNoon: fromJulian(Jnoon),
    nadir: fromJulian(Jnoon - 0.5),
  };

  for (i = 0, len = times.length; i < len; i += 1) {
    time = times[i];
    h0 = (time[0] + dh) * rad;

    Jset = getSetJ(h0, lw, phi, dec, n, M, L);
    Jrise = Jnoon - (Jset - Jnoon);

    result[time[1]] = fromJulian(Jrise);
    result[time[2]] = fromJulian(Jset);
  }

  return result;
};
