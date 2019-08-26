import { describe, it } from 'mocha'
import { AwesomeHelp } from '../lib'

const should = require('should')

describe('testing the help functions', () => {
  it('testing addFloat', (done) => {
    done()
  })

  describe('testing the checkSensitiveWord function', () => {
    it('using default sensitive sentences', (done) => {
      const result = AwesomeHelp.checkSensitiveWord('台独是一个敏感词')

      should((result as Map<string, { location: number}[] >).size).equal(1)
      should((result as Map<string, { location: number}[] >).get('台独').length).equal(1)
      done()
    })
    it('support the quick search', (done) => {
      const result = AwesomeHelp.checkSensitiveWord('闪电湖手段和速度哈师大会实打实大密诱阿萨德化手段时段是的哈USD哈', true)

      should((result as boolean)).equal(true)
      done()
    })
    it('support the custom sensitive sentences', (done) => {
      const sensitiveMap = AwesomeHelp.makeSensitiveMap(['这是自定义敏感词', '我也是'])
      const result = AwesomeHelp.checkSensitiveWord('闪电湖手段和速度哈师大会实打实大我也是德化手段时段是的这是自定义敏感词哈USD哈输的哈us后端少打我也是啥速度哈大了点啦', null, sensitiveMap)

      should((result as Map<string, { location: number}[] >).size).equal(2)
      should((result as Map<string, { location: number}[] >).get('我也是').length).equal(2)
      done()
    })
  })
})
