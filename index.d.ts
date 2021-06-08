export interface Deferred {
  resolve: (value?: any) => any;
  reject: (reason?: any) => void;
  promise: Promise<any>;
}

type wordMap = Map<string, recursiveMap | boolean>;

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
   * @description 匹配某个字符出现多次的情况，支持[A-Za-z0-9_]
   */
  export const alphaOccurMoreThanOneTime: RegExp;

  /**
   * 匹配任意字符出现多次的情况，支持所有的字符除了换行符(newline)
   */
  export const anyCharOccurMoreThanOneTime: RegExp;
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
  export function groupBySomeFields<T>(
    list: T[],
    fields: (item: T) => any[]
  ): T[][];
  /**
   * @description 对Date的扩展，将 Date 转化为指定格式的String
   * @param date 需要转换格式的日期
   * @param format 日期转换的最后格式，比如YYYY-MM-DD
   */
  export function convertDate(date: Date, format: string): string;
  /**
   * @description 浮点数相加
   */
  export function addFloat(arg1: number, arg2: number): number;
  /**
   * @description 浮点数相减
   */
  export function minusFloat(arg1: number, arg2: number): number;
  /**
   * @description 浮点数相除
   */
  export function divFloat(arg1: number, arg2: number): number;
  /**
   * @description 浮点数相乘
   */
  export function timesFloat(arg1: number, arg2: number): number;

  export function makeDeferred(): Deferred;

  /**
   * @description 判断是否是生成器
   */
  export function isGenerator(obj: any): boolean;

  /**
   * @description 判断是否是生成器函数
   */
  export function isGeneratorFunction(obj: any): boolean;

  /**
   * @description 判断是否是Promise
   */
  export function isPromise(obj: any): boolean;
  /**
   * @description 千分法计数
   */
  export function toThousands(num: number): string;

  /**
   * 隐藏所有的数字位除了指定的某一位，比如需要转换100000的所有0为？，那么就要这样调用hiddenNumberExpectSpecified(100000, 0, '?') => 1?????
   * @param num 需要操作的数字
   * @param expected 不想被隐藏的位数，从左边最高index开始算起,默认是最高位也就是0
   * @param hiddenStr 希望隐藏的数字转换成哪个字符，默认是?
   */
  export function hiddenNumberExpectSpecified(
    num: number,
    expected: number,
    hiddenStr: string
  ): string;

  /**
   * 将所有的敏感词汇组成一个嵌套的Map结构，使用的是DFA数据结构算法
   * @param sensitiveWordList
   */
  export function makeSensitiveMap(sensitiveWordList: string[]): wordMap;

  /**
   * 检查搜寻的文本是否含有敏感词汇
   * @param txt 需要查找敏感词的文本
   * @param sensitiveWordsMap 敏感词汇的Map结构，允许自定义，如果自定义需要使用上面的函数makeSensitiveMap去生成，如果没有传，默认使用自带的敏感词库
   * @param isQuickSearch 是否需要快速查询,默认是false，如果是的话查找到值是返回true，反之是false
   */
  export function checkSensitiveWord(
    txt: string,
    isQuickSearch?: null,
    sensitiveWordsMap?: wordMap
  ): Map<string, { location: number }[]>;
  export function checkSensitiveWord(
    txt: string,
    isQuickSearch: boolean,
    sensitiveWordsMap?: wordMap
  ): boolean;
  /**
   * 将小数进行格式化，最少保留1位小数，最多保留的小数位可以传值指定，
   * 比如keepLeastOneDecimal(5.101, 2) => 5.1，(5.00, 2) => 5.0，(5.10163, 3) => 5.101
   * @param value 需要格式化的值
   * @param mostDecimal 最多保留的小数位
   */
  export function keepLeastOneDecimal(
    value: string,
    mostDecimal: number
  ): string;

  /**
   * 根据paddingLength指定的位数，将val前面补齐对应的0
   * @param val
   * @param paddingLength
   */
  export function prefixPadding(
    val: string | number,
    length: number,
    paddingStr?: string
  ): string;

  /**
   * 反扁平对象，{'a.b.c': 111 } => { a: {b: { c: 111}}}
   * @param obj 被操作的对象
   * @param splitChar 分割字符，默认是 "."
   */
  export function unflattenObject(
    obj: { [key: string]: any },
    splitChar?: string
  ): { [key: string]: any };

  /**
   * 扁平化对象，{ a: {b: { c: 111}}} => {'a.b.c': 111 }
   * @param obj 被操作的对象
   * @param splitChar 分割字符，默认是 "."
   */
  export function flattenObject(
    obj: { [key: string]: any },
    splitChar?: string
  ): { [key: string]: any };
}

export namespace AwesomeMath {
  export class Region {
    constructor(points: number[][]);
    /**
     * @description 计算多边形的中间点的坐标(经纬度)
     */
    public centroid: () => { x: number; y: number };
    /**
     * @description 简单的匹配身份证号
     */
    private area: () => number;
  }
  /**
   * @description 计算两点之间的直线距离
   * @param {number} lng1 起点纬度
   * @param {number} lat1 起点纬度
   * @param {number} lng2 终点纬度
   * @param {number} lat2 终点纬度
   * @returns {number} 两点之间的直线距离，单位：米
   */
  export function getDistance(
    lng1: number,
    lat1: number,
    lng2: number,
    lat2: number
  ): number;

  /**
   * 转换经度或者纬度为地图可识别的格式
   * @param origin
   */
  export function decodeLatLng(origin: number): number;

  /**
   *
   * @param origin 转换经度或者纬度为整数格式
   */
  export function encodeLatLng(origin: number): number;
}

export namespace AwesomeHttp {
  /**
   * @description 更新url中query请求的某个参数,可以配合replaceState去更新浏览器的历史记录
   * @param baseUrl 需要更新的url
   * @param key 需要更新的key
   * @param value 更新的新值
   */
  export function updateQueryStringParam(
    baseUrl: string,
    key: string,
    value: any
  ): string;
  /**
   * @description 根据指定的key值从query string中查找对应的value，如果找不到返回null
   * @param fullUrl 完整的url,包括host部分
   * @param key 需要查找的key
   */
  export function getQueryStringParam(
    fullUrl: string,
    key: string
  ): string | null;
  /**
   * @description 将query string按照键值对的形式返回object
   * @param fullUrl 完整的url
   */
  export function parseQueryString2Object(fullUrl: string): object;
  /**
   * @description 解析queryObject后组合一起追加到path后面
   */
  export function queryObject2String(path: string, queryObject: object): string;
}
