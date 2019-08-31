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
})
