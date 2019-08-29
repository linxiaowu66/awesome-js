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
  it('testing queryObject2String', (done) => {
    const result = AwesomeHttp.queryObject2String('https://blog.5udou.cn', { role: 'admin', page: 1, isOk: 1})
    should(result).equal('https://blog.5udou.cn?role=admin&page=1&isOk=1')
    done()
  })
})
