# Awesome-js

[![Build Status](https://travis-ci.org/linxiaowu66/awesome-js.svg?branch=master)](https://travis-ci.org/linxiaowu66/awesome-js)
[![Coverage Status](https://coveralls.io/repos/github/linxiaowu66/awesome-js/badge.svg?branch=master)](https://coveralls.io/github/linxiaowu66/awesome-js?branch=master)
[![stable](https://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

该库提供了业务中常用到工具函数或者正则表达式，欢迎增加更多的函数

## ChangeLog

- v1.0.0: 初始化项目
- v2.0.0: 新增websocket封装的类以及GIS相关的有用函数

## TodoList

- [x] Add Unit Test

## Feature

- Typescript, so beatiful types definition
- Mocha, so the quality of code is can be guaranteed

## All methods

```typescript
export interface Deferred {
  resolve: (value?: any) => any
  reject: (reason?: any) => void
  promise: Promise<any>
}

type wordMap = Map<string, recursiveMap | boolean>

interface recursiveMap extends wordMap {}

export namespace AwesomeRegx {
  /**
   * @description 匹配手机号码
   */
  export const phoneNumber: RegExp;
  /**
   * @description 匹配Emoji字符
   */
  export const isEmoji: RegExp;
  /**
   * @description 隐私手机号，会将手机号的中间四位数替换成*
   */
  export const privacyMobile: (mobile: string) => string;
  /**
   * @description 姓名脱敏，将除第一个字之外的非空字符替换为*
   */
  export const privacyName: (name: string) => string;
  /**
   * @description 匹配中文字符和全角字符
   */
  export const chineseAndfullWidthChar: RegExp;
  /**
   * @description 将http链接去掉，保持和Host一致，防止有的图片展示不了
   */
  export const https: (url: string) => string;
  /**
   * @description 简单的匹配身份证号
   */
  export const simpleIdentityNo: RegExp;
  /**
   * @description 匹配中文名字
   */
  export const chineseName: RegExp;
  /**
   * @description 匹配正整数
   */
  export const positiveInteger: RegExp;
  /**
   * @description 匹配整数
   */
  export const integer: RegExp;
  /**
   * @description 匹配负整数
   */
  export const negativeInteger: RegExp;
  /**
   * @description 匹配非负整数
   */
  export const nonnegativeInteger: RegExp;
  /**
   * @description 匹配非正整数
   */
  export const nonPostiveInterger: RegExp;
  /**
   * @description 匹配正浮点数
   */
  export const postiveFloat: RegExp;
  /**
   * @description 匹配负浮点数
   */
  export const negativeFloat: RegExp;
  /**
   * @description 匹配浮点数
   */
  export const float: RegExp;
  /**
   * @description 匹配非负浮点数
   */
  export const nonNegativeFloat: RegExp;
  /**
   * @description 匹配非正浮点数
   */
  export const nonPositiveFloat: RegExp;
  /**
   * @description 匹配英文26个字母
   */
  export const alphabat: RegExp;
  /**
   * @description 匹配大写的英文字母
   */
  export const upperAlpha: RegExp;
  /**
   * @description 匹配小写的英文字母
   */
  export const lowerAlpha: RegExp;
  /**
   * @description 匹配英文字母和数字加下划线
   */
  export const alphaNumWithUnderline: RegExp;
  /**
   * @description 匹配双字节字符
   */
  export const DBC: RegExp;
  /**
   * @description 匹配空行
   */
  export const emptyLine: RegExp;
  /**
   * @description 匹配首部或者尾部有空白字符的字符串
   */
  export const emptyCharInStartAndEnd: RegExp;
  /**
   * @description 匹配中文字符
   */
  export const chinese: RegExp;
  /**
   * @description 匹配邮箱
   */
  export const email: RegExp;
  /**
   * @description 匹配url
   */
  export const url: RegExp;
  /**
   * @description 匹配ip地址
   */
  export const ip: RegExp;
  /**
   * @description 匹配电话座机
   */
  export const telPhone: RegExp;
  /**
   * @description 匹配邮政编码
   */
  export const postalCode: RegExp;
}
export namespace AwesomeHelp {
  /**
   * @description 根据对象的某些字段的值对数组对象进行分类
   * @param list 需要分类的数组对象(必须是一个数组)
   * @param fields 需要分类的字段(必须传递一个函数, 支持多个字段)
   */
  export function groupBySomeFields<T>(list: T[], fields: (item: T) => any[]): T[][]
  /**
   * @description 对Date的扩展，将 Date 转化为指定格式的String
   * @param date 需要转换格式的日期
   * @param format 日期转换的最后格式，比如YYYY-MM-DD
   */
  export function convertDate(date: Date, format: string): string
  /**
   * @description 浮点数相加
   */
  export function addFloat(arg1: number, arg2: number): number
   /**
   * @description 浮点数相减
   */
  export function minusFloat(arg1: number, arg2: number): number
     /**
   * @description 浮点数相除
   */
  export function divFloat(arg1: number, arg2: number): number
     /**
   * @description 浮点数相乘
   */
  export function timesFloat(arg1: number, arg2: number): number

  export function makeDeferred(): Deferred

  /**
   * @description 判断是否是生成器
   */
  export function isGenerator(obj: any): boolean

  /**
   * @description 判断是否是生成器函数
   */
  export function isGeneratorFunction(obj: any): boolean

  /**
   * @description 判断是否是Promise
   */
  export function isPromise(obj: any): boolean
  /**
   * @description 千分法计数
   */
  export function toThousands(num: number): string

  /**
   * 隐藏所有的数字位除了指定的某一位，比如需要转换100000的所有0为？，那么就要这样调用hiddenNumberExpectSpecified(100000, 0, '?') => 1?????
   * @param num 需要操作的数字
   * @param expected 不想被隐藏的位数，从左边最高index开始算起,默认是最高位也就是0
   * @param hiddenStr 希望隐藏的数字转换成哪个字符，默认是?
   */
  export function hiddenNumberExpectSpecified(num: number, expected: number, hiddenStr: string): string

  /**
   * 将所有的敏感词汇组成一个嵌套的Map结构，使用的是DFA数据结构算法
   * @param sensitiveWordList
   */
  export function makeSensitiveMap(sensitiveWordList: string[]): wordMap

  /**
   * 检查搜寻的文本是否含有敏感词汇
   * @param txt 需要查找敏感词的文本
   * @param sensitiveWordsMap 敏感词汇的Map结构，允许自定义，如果自定义需要使用上面的函数makeSensitiveMap去生成，如果没有传，默认使用自带的敏感词库
   * @param isQuickSearch 是否需要快速查询,默认是false，如果是的话查找到值是返回true，反之是false
   */
  export function checkSensitiveWord(
    txt: string,
    isQuickSearch?: null,
    sensitiveWordsMap?: wordMap): Map<string, { location: number}[] >
  export function checkSensitiveWord(
    txt: string,
    isQuickSearch: boolean,
    sensitiveWordsMap?: wordMap): boolean

  /**
  * 根据paddingLength指定的位数，将val前面补齐对应的0
  * @param val
  * @param paddingLength
  */
  export function prefixPadding(val: string, length: number, paddingStr?: string): string
}

export namespace AwesomeGis {
  export class Region {
    constructor(points: number[][])
  /**
   * @description 计算多边形的中间点的坐标(经纬度)
   */
    public centroid: () => { x: number, y: number}
  /**
   * @description 简单的匹配身份证号
   */
    private area: () => number
  }
 /**
   * 根据两个经纬度点坐标计算之间的夹角
   * @param lng_a
   * @param lat_a
   * @param lng_b
   * @param lat_b
   * @returns
   */
  getAngleByLngLat: (lng_a: number, lat_a: number, lng_b: number, lat_b: number) => number;
  /**
   * 根据两个经纬度点计算之间的距离
   * @param lat1
   * @param lng1
   * @param lat2
   * @param lng2
   * @returns
   */
  getDistance: (lat1: number, lng1: number, lat2: number, lng2: number) => number;
  /**
   * GCJ坐标转WGS坐标
   * @param pos
   * @returns
   */
  gcj02towgs84: (pos: number[]) => { utm_x: number; utm_y: number };
  /**
   * WGS坐标转GCJ坐标
   * @param utm_x
   * @param utm_y
   * @returns
   */
  wgs84togcj02: (utm_x: number, utm_y: number) => number[];
  /**
   * 根据各个方位角得到经纬度
   * @param easting
   * @param northing
   * @param zoneNum
   * @param zoneLetter
   * @param northern
   * @returns
   */
  toLatLon: (
    easting: number,
    northing: number,
    zoneNum: number,
    zoneLetter: string,
    northern?: boolean,
  ) => number[];
  /**
   * 根据经纬度得到各个方位角
   * @param latitude
   * @param longitude
   * @param forceZoneNum
   * @returns
   */
  fromLatLon: (
    latitude: number,
    longitude: number,
    forceZoneNum?: number,
  ) => { easting: number; northing: number; zoneNum: number; zoneLetter: string };

  /**
   * 判断某个坐标点是否在一个区域内部
   * @param point
   * @param points
   * @returns
   */
  judgePointIsInSpecificArea: (point: DotProps, points: DotProps[]) => boolean;

  /**
   * 根据起始点坐标以及方向和距离计算目的点的经纬度
   */
  getTargetLngLatByAngleDistanceFromSourceLngLat: (
    lng: number,
    lat: number,
    brng: number,
    dist: number,
  ) => { lng: number; lat: number };

  /**
   * 根据角度转弧度
   * @param deg
   * @returns
   */
  toRadians: (deg: number) => number;
  /**
   * 根据弧度转角度
   * @param rad
   * @returns
   */
  toDegrees: (rad: number) => number;

  /**
   * 转换经度或者纬度为地图可识别的格式
   * @param origin
   */
  export function decodeLatLng(origin: number): number

  /**
   *
   * @param origin 转换经度或者纬度为整数格式
   */
  export function encodeLatLng(origin : number): number

  /**
 * 根据日期以及经纬度，按照潮汐算法计算出当天的日出日落时间
 * @param date 查询的日期
 * @param lat 纬度
 * @param lng 精度
 * @param height 海拔（可选），没有的话默认为0
 * @returns
 */
export function getSunRhythm (
  date: Date,
  lat: number,
  lng: number,
  height = 0
): {
  solarNoon: Date,  // 正午时间
  nadir: Date, // 午夜时间
  sunrise: Date, // 日出时间
  sunset: Date, // 日落时间
  sunriseEnd: Date,
  sunsetStart: Date,
  dawn: Date, // 黎明时间
  dusk: Date, // 黄昏时间
  nauticalDawn: Date,
  nauticalDusk: Date,
  nightEnd: Date,
  night: Date,
  goldenHourEnd: Date,
  goldenHour: Date
}
}

export namespace AwesomeHttp {
  /**
   * @description 更新url中query请求的某个参数,可以配合replaceState去更新浏览器的历史记录
   * @param baseUrl 需要更新的url
   * @param key 需要更新的key
   * @param value 更新的新值
   */
  export function updateQueryStringParam(baseUrl: string, key: string, value: any): string
  /**
   * @description 解析queryObject后组合一起追加到path后面
   */
  export function queryObject2String(path: string, queryObject: object): string
}

export namespace AwesomeWs {
  export interface ConfigProps {
    url: string;
    onMessage?: (data: MessageEvent) => void;
    onOpen?: (data: Event) => void;
    onClose?: (data: CloseEvent) => void;
    onError?: (data: Event) => void;
    onReconnect?: (data: any) => void;
    onOffline?: (data: any) => void;
    sendPing?: (() => void) | null;
    /** 心跳间隔 */
    interval?: number;
    /** 重连次数 */
    reconnect?: number;
    /** 页面被激活时再触发重连，重连次数设置为无限后才生效 */
    reconnectOnVisibility?: boolean;
  }
  export default class BaseSocket {
    constructor(configs: ConfigProps){}
  }
}
```

## How to Use

Can be referenced by the [types](https://github.com/linxiaowu66/awesome-js/blob/master/types/index.d.ts) or the unit testing
