import * as fs from 'fs'
import * as path from 'path'
import { Deferred, wordMap } from '../index';
import Big from 'big.js';

/**
 * 对float类型的两个数相加，因为js的语言缺陷，直接相加会出现问题的
 * @param  {number}     数字1
 * @return {number}     数字2
 */
export const addFloat = (arg1: number, arg2: number) => {
  return +(new Big(arg1).plus(new Big(arg2)).valueOf())
}

/**
 * 对float类型的两个数相减，因为js的语言缺陷，直接相加会出现问题的
 * @param  {number}     数字1
 * @return {number}     数字2
 */
export const minusFloat = (arg1: number, arg2: number) => {
  return +(new Big(arg1).minus(new Big(arg2)).valueOf())
}

/**
 * 对float类型的两个数相除，因为js的语言缺陷，直接相加会出现问题的
 * @param  {number}     数字1
 * @return {number}     数字2
 */
export const divFloat = (arg1: number, arg2: number, ) => {
  return +(new Big(arg1).div(new Big(arg2)).valueOf())
}

/**
 * 对float类型的两个数相乘，因为js的语言缺陷，直接相加会出现问题的
 * @param  {number}     数字1
 * @return {number}     数字2
 */
export const timesFloat = (arg1: number, arg2: number) => {
  return +(new Big(arg1).times(new Big(arg2)).valueOf())
}
/**
 * 保留小数点，抹平JS的原生缺陷
 * @param arg1 保留小数点的数字
 * @param fixedDigit 保留多少位小数点，默认0位
 */
export const toFixed = (arg1: number, fixedDigit = 0) => {
  return new Big(arg1).toFixed(fixedDigit)
}


/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * @param  {Date}       日期
 * @return {String}     字符串格式
 */
export const convertDate = (date: Date, format: string): string => {
  if (!date) {
    return null
  }
  if (!(date instanceof Date)) {
    return null
  }
  let str = format
  const week = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
  const o = {
    "M+": date.getMonth() + 1,
    "D+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  }
  if (/(Y+)/.test(format)) {
    str = str.replace(
      RegExp.$1,
      date
        .getFullYear()
        .toString()
        .substr(4 - RegExp.$1.length)
    )
  }

  for (const k in o) {
    // eslint-disable-line
    if (new RegExp(`(${k})`).test(format)) {
      str = str.replace(
        RegExp.$1,
        RegExp.$1.length === 1
          ? o[k]
          : `00${o[k]}`.substr(o[k].toString().length)
      )
    }
  }

  if (new RegExp("(w+)").test(format)) {
    str = str.replace(RegExp.$1, week[date.getDay()])
  }

  return str
}
/**
 * 根据对象的某些字段的值对数组对象进行分类
 * @param  {list}       需要分类的数组对象(必须是一个数组)
 * @param  {fields}     需要分类的字段(必须传递一个函数, 支持多个字段)
 * @return {array}      返回新的数组(格式: [[{},{}....],[{}...]....])
 */
export function groupBySomeFields<T>(list: Array<T>, fields: (item: T) => {}): T[][] {
  const groups = {}
  list.map(item => {
    const groupByFields = JSON.stringify(fields(item))
    groups[groupByFields] = groups[groupByFields] || []
    groups[groupByFields].push(item)
  })
  return Object.keys(groups).map(item => groups[item])
}

export function isGenerator(obj: any) {
  return "function" === typeof obj.next && "function" === typeof obj.throw
}

export function isGeneratorFunction(obj: any) {
  const constructor = obj.constructor
  if (
    "GeneratorFunction" === constructor.name ||
    "GeneratorFunction" === constructor.displayName
  ) {
    return true
  }
  return isGenerator(constructor.prototype)
}

export function isPromise(obj: any) {
  return obj && obj.then && "function" === typeof obj.then
}

/**
 * 千分法计数, 每隔3位加一个逗号
 * @param {number} num
 * @return {string} 格式化之后的结果
 */
export function toThousands(num: number) {
  return num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
}

/**
 * 隐藏所有的数字位除了指定的某一位，比如需要转换100000的所有0为？，那么就要这样调用hiddenNumberExpectSpecified(100000, 0, '?') => 1?????
 * @param num 需要操作的数字
 * @param expected 不想被隐藏的位数，从左边最高index开始算起,默认是最高位也就是0
 * @param hiddenStr 希望隐藏的数字转换成哪个字符，默认是?
 */
export function hiddenNumberExpectSpecified(num: number, expected = 0, hiddenStr = '?') {
  return num.toString().replace(/\S/g, (match, offset) => (offset !== expected ? hiddenStr : match))
}

/**
 * 将所有的敏感词汇组成一个嵌套的Map结构，使用的是DFA数据结构算法
 * @param sensitiveWordList
 */
export function makeSensitiveMap(sensitiveWordList: string[]) {
  // 构造根节点
  const result = new Map();
  for (const word of sensitiveWordList) {
    let map = result;
    for (let i = 0; i < word.length; i++) {
      // 依次获取字
      const char = word.charAt(i);
      // 判断是否存在
      if (map.get(char)) {
        // 获取下一层节点
        map = map.get(char);
      } else {
        // 将当前节点设置为非结尾节点
        if (map.get('isEnd') === true) {
          map.set('isEnd', false);
        }
        const item = new Map();
        // 新增节点默认为结尾节点
        item.set('isEnd', true);
        map.set(char, item);
        map = map.get(char);
      }
    }
  }
  return result;
}

/**
 * 检查搜寻的文本是否含有敏感词汇
 * @param txt 需要查找敏感词的文本
 * @param sensitiveWordsMap 敏感词汇的Map结构，允许自定义，如果自定义需要使用上面的函数makeSensitiveMap去生成
 * @param isQuickSearch 是否需要快速查询，如果是的话查找到值是返回true，反之是false
 */
export function checkSensitiveWord(
  txt: string,
  isQuickSearch = false,
  sensitiveWordsMap?: wordMap) {
  const defaultMap = () => {
    const data = fs.readFileSync(path.resolve(__dirname, '../utils/sensitiveWords.txt'), 'utf8')
    const wordsArray = data.trim().split('|')
    return makeSensitiveMap(wordsArray)
  }
  const _sensitiveWordsMap = sensitiveWordsMap ? sensitiveWordsMap : defaultMap()
  const matchWords = new Map()
  for (let i = 0; i < txt.length; i++) {
    let currentMap = _sensitiveWordsMap;
    let sensitiveWord = ''; //记录过滤出来的敏感词
    for (let j = i; j < txt.length; j++) {
      const word = txt.charAt(j);
      currentMap = currentMap.get(word);
      if (currentMap) {
        sensitiveWord += word;
        if (currentMap.get('isEnd') === true) {
          // 如果是快速查找，不关心敏感词的搜索结果，找到一个即返回，适用于正常的输入检测
          if (isQuickSearch) {
            return true
          }
          // 表示已到词的结尾
          const isExist = matchWords.get(sensitiveWord)
          if (isExist) {
            isExist.push({ location: i })
            matchWords.set(sensitiveWord, isExist)
          } else {
            matchWords.set(sensitiveWord, [{ location: i }])
          }
          break
        }
      } else {
        break;
      }
    }
  }
  // 到这一步如果是快速查询还没有返回，说明没有找到敏感词
  if (isQuickSearch) {
    return false
  }
  return matchWords
}

/**
 * 将小数进行格式化，最少保留1位小数，最多保留的小数位可以传值指定，
 * 比如keepLeastOneDecimal(5.101, 2) => 5.1，(5.00, 2) => 5.0，(5.10163, 3) => 5.101
 * @param value 需要格式化的值
 * @param mostDecimal 最多保留的小数位
 */
export function keepLeastOneDecimal(value: string, mostDecimal = 2) {
  /*
  * 整数时，保留一位小数，小数展示为0；有一位小数时保留一位小数，小数展示为对应一位小数值；
  */
  // 取出整数部分和小数点部分,小数点部分最多取mostDecimal位
  const floatStr = String(value ? value : 0)
  const match = floatStr.split('.')

  const int = match[0]
  const float = match[1] ? match[1].slice(0, mostDecimal) : match[1]

  if (isNaN(+int) || (float && isNaN(+float))) {
    return floatStr
  }
  if (float === undefined) {
    return `${int}.0`
  }
  if (+float % 10 === 0) {
    return `${int}.${+float / 10}`
  }
  return `${int}.${float}`
}
