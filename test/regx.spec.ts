import { describe, it } from 'mocha'
import { AwesomeRegx } from '../lib'

const should = require('should')

describe('testing regx functions', () => {
  it('testing phoneNumber', (done) => {
    const result = AwesomeRegx.phoneNumber.test('17182823931')
    const result1 = AwesomeRegx.phoneNumber.test('12182823931')
    const result2 = AwesomeRegx.phoneNumber.test('1788182823931')

    should(result).equal(true)
    should(result1).equal(false)
    should(result2).equal(false)
    done()
  })
  it('testing isEmoji', (done) => {
    const result = AwesomeRegx.isEmoji.test('17182823931')
    const result1 = AwesomeRegx.isEmoji.test('我是😀')

    should(result1).equal(true)
    should(result).equal(false)
    done()
  })
  it('testing privacyMobile', (done) => {
    const result = AwesomeRegx.privacyMobile('17182823931')

    should(result).equal('171****3931')
    done()
  })
  it('testing privacyName', (done) => {
    const result = AwesomeRegx.privacyName('林小兀')

    should(result).equal('林**')
    done()
  })
  it('testing chineseAndfullWidthChar', (done) => {
    const result = AwesomeRegx.chineseAndfullWidthChar.test('，ｗｏｓｈｉｑｕａｎｊｉａｏ')

    should(result).equal(true)
    done()
  })
  it('testing https', (done) => {
    const result = AwesomeRegx.https("http://blog.5udou.cn")

    should(result).equal('//blog.5udou.cn')
    done()
  })
  it('testing simpleIdentityNo', (done) => {
    const result = AwesomeRegx.simpleIdentityNo.test('35262728292929')
    const result1 = AwesomeRegx.simpleIdentityNo.test('350626200001011023')

    should(result).equal(false)
    should(result1).equal(true)
    done()
  })
  it('testing chineseName', (done) => {
    const result = AwesomeRegx.chineseName.test('ththhth')
    const result1 = AwesomeRegx.chineseName.test('我是中文')
    should(result).equal(false)
    should(result1).equal(true)
    done()
  })
  it('testing numbers', (done) => {
    const result = AwesomeRegx.positiveInteger.test('12')
    const result1 = AwesomeRegx.integer.test('-12')
    const result2 = AwesomeRegx.negativeInteger.test('-12')
    const result3 = AwesomeRegx.nonnegativeInteger.test('0')
    const result4 = AwesomeRegx.nonPostiveInterger.test('-12')
    const result5 = AwesomeRegx.postiveFloat.test('12.001')
    const result6 = AwesomeRegx.negativeFloat.test('-12.2')
    const result7 = AwesomeRegx.float.test('-12.2')
    const result8 = AwesomeRegx.nonNegativeFloat.test('-12.2')
    const result9 = AwesomeRegx.nonPositiveFloat.test('-12.2')

    should(result).equal(true)
    should(result1).equal(true)
    should(result2).equal(true)
    should(result3).equal(true)
    should(result4).equal(true)
    should(result5).equal(true)
    should(result6).equal(true)
    should(result7).equal(true)
    should(result8).equal(false)
    should(result9).equal(true)

    done()
  })
  it('testing char', (done) => {
    const result = AwesomeRegx.alphabat.test('abbA')
    const result1 = AwesomeRegx.upperAlpha.test('ABB')
    const result2 = AwesomeRegx.lowerAlpha.test('abb')
    const result3 = AwesomeRegx.alphaAndNumber.test('abb12')
    const result4 = AwesomeRegx.alphaNumWithUnderline.test('ab_12b')
    const result5 = AwesomeRegx.DBC.test('我')
    const result6 = AwesomeRegx.emptyLine.test(`

    `)
    const result7 = AwesomeRegx.emptyCharInStartAndEnd.test(' jsjs ')

    should(result).equal(true)
    should(result1).equal(true)
    should(result2).equal(true)
    should(result3).equal(true)
    should(result4).equal(true)
    should(result5).equal(true)
    should(result6).equal(true)
    should(result7).equal(true)
    done()
  })
  it('testing email', (done) => {
    const result = AwesomeRegx.email.test('linguang661990@126.com')

    should(result).equal(true)
    done()
  })
  it('testing url', (done) => {
    const result = AwesomeRegx.url.test('https://blog.5udou.cn')
    const result1 = AwesomeRegx.url.test('ws://blog.5udou.cn/ws')

    should(result).equal(true)
    should(result1).equal(true)

    done()
  })
  it('testing ip', (done) => {
    const result = AwesomeRegx.ip.test('192.0.0.1')
    should(result).equal(true)

    done()
  })
  it('testing telPhone', (done) => {
    const result = AwesomeRegx.telPhone.test('0571-8899001')
    const result1 = AwesomeRegx.telPhone.test('021-8899001')
    const result2 = AwesomeRegx.telPhone.test('021-88990011')

    should(result).equal(true)
    should(result1).equal(true)
    should(result2).equal(true)
    done()
  })
  it('testing postalCode', (done) => {
    const result = AwesomeRegx.postalCode.test('330110')
    const result1 = AwesomeRegx.postalCode.test('030110')

    should(result).equal(true)
    should(result1).equal(false)
    done()
  })
})
