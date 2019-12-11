import { describe, it } from 'mocha'
import { AwesomeHttp } from '../lib'

const should = require('should')

describe('testing http functions', () => {
  it('testing updateQueryStringParam', (done) => {
    const result = AwesomeHttp.updateQueryStringParam('https://blog.5udou.cn?role=admin&page=1&isOk=1', 'page', 2)
    const result1 = AwesomeHttp.updateQueryStringParam('https://blog.5udou.cn?role=admin&page=1&isOk=1', 'isNew', 1)
    const result2 = AwesomeHttp.updateQueryStringParam('https://blog.5udou.cn', 'isNew', 1)

    should(result).equal('https://blog.5udou.cn?role=admin&page=2&isOk=1')
    should(result1).equal('https://blog.5udou.cn?role=admin&page=1&isOk=1&isNew=1')
    should(result2).equal('https://blog.5udou.cn?isNew=1')
    done()
  })
  it('testing getQueryStringParam', (done) => {
    const result = AwesomeHttp.getQueryStringParam('https://blog.5udou.cn?role=admin&page=1&isOk=1', 'page')
    const result1 = AwesomeHttp.getQueryStringParam('https://blog.5udou.cn?role=admin&page=1&isOk=1', 'isOk')
    const result2 = AwesomeHttp.getQueryStringParam('https://blog.5udou.cn', 'isNew')

    should(result).equal('1')
    should(result1).equal('1')
    should(result2).equal(null)
    done()
  })
  it('testing parseQueryString2Object', (done) => {
    const result = AwesomeHttp.parseQueryString2Object('https://blog.5udou.cn?role=admin&page=1&isOk=1')
    const result1 = AwesomeHttp.parseQueryString2Object('')
    const result2 = AwesomeHttp.parseQueryString2Object('https://blog.5udou.cn')

    should(result).eql({ role: 'admin', page: '1', isOk: '1'})
    should(result1).eql({})
    should(result2).eql({})
    done()
  })
  it('testing queryObject2String', (done) => {
    const result = AwesomeHttp.queryObject2String('https://blog.5udou.cn', { role: 'admin', page: 1, isOk: 1})
    should(result).equal('https://blog.5udou.cn?role=admin&page=1&isOk=1')
    done()
  })
  it('testing queryObject2String when queryObject is not object', (done) => {
    const result = AwesomeHttp.queryObject2String('https://blog.5udou.cn')
    should(result).equal('https://blog.5udou.cn')
    done()
  })
})
