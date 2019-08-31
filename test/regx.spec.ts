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
})
