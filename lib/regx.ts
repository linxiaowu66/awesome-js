// 匹配手机号码
export const phoneNumber = /^1[3456789]\d{9}$/

// 匹配emoji字符
// tslint:disable
export const isEmoji = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\ufe0f|\u200d|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g

// 隐私号码的设置
export const privacyMobile = (mobile: string) => mobile.replace(/^(\d{3})\d{4}(\d*)$/, '$1****$2')

// 姓名脱敏
export const privacyName = (name: string) => name.replace(/^(\S)\S*$/, '$1**')

// 中文以及全角字符
export const chineseAndfullWidthChar = /[\u4E00-\u9FA5\uF900-\uFA2D\uFF00-\uFFEF]/


// 替换http的链接为//
export const https = (url: string) => url.replace(/^http:/, '')

// 身份证的简单判断
export const simpleIdentityNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/

// 中文名字
export const chineseName = /((^[\u4e00-\u9fa5])(([\u4e00-\u9fa5]|\u00b7)*)([\u4e00-\u9fa5]$))|(^[\u4e00-\u9fa5]{1}$)/

// 正整数
export const positiveInteger = /^[1-9]\d*$/

// 匹配整数
export const integer = /^-?[1-9]\d*$/

// 匹配负整数
export const negativeInteger = /^-[1-9]\d*$/

// 匹配非负整数
export const nonnegativeInteger = /^[1-9]\d*|0$/

// 匹配非正整数
export const nonPostiveInterger = /^-[1-9]\d*|0$/

// 匹配正浮点数
export const postiveFloat = /^[1-9]\d*.\d*|0.\d*[1-9]\d*$/

// 匹配负浮点数
export const negativeFloat = /^-([1-9]\d*.\d*|0.\d*[1-9]\d*)$/

// 匹配浮点数
export const float = /^-?([1-9]\d*.\d*|0.\d*[1-9]\d*|0?.0+|0)$/

// 匹配非负浮点数
export const nonNegativeFloat = /^[1-9]\d*.\d*|0.\d*[1-9]\d*|0?.0+|0$/

// 匹配非正浮点数
export const nonPositiveFloat = /^(-([1-9]\d*.\d*|0.\d*[1-9]\d*))|0?.0+|0$/

// 匹配26个英文字母
export const alphabat = /^[A-Za-z]+$/

// 匹配大写的26个英文字母
export const upperAlpha = /^[A-Z]+$/

// 匹配小写的26个英文字母
export const lowerAlpha = /^[a-z]+$/

// 匹配26个英文字母和数字
export const alphaAndNumber = /^[A-Za-z0-9]+$/

// 匹配数字、26个英文字母或者下划线组成的字符串
export const alphaNumWithUnderline = /^\w+$/

// 匹配双字节字符(Double-byte character)
export const DBC = /[^x00-xff]/

// 匹配空白行
export const emptyLine = /^[\s|\t]+$/

// 匹配首部或者尾部有空白字符的字符串
export const emptyCharInStartAndEnd = /^\s+|\s+$/

// 匹配中文字符
export const chinese = /[u4e00-u9fa5]/

// 匹配email
export const email = /\w+([-+.]\w+)*@\w+([-.]\w+)*.\w+([-.]\w+)*/

// 匹配各种协议的url
export const url = /[a-zA-z]+:\/\/[^s]*/

// 匹配IP地址
export const ip = /\d+.\d+.\d+.\d+/

// 匹配国内座机
export const telPhone = /\d{3}-\d{8}|\d{4}-\d{7}/

// 匹配邮政编码
export const postalCode = /^[1-9][0-9]{5}$/
