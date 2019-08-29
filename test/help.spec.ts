import { describe, it } from 'mocha'
import { AwesomeHelp } from '../lib'

const should = require('should')

describe('testing the help functions', () => {
  it('testing addFloat', (done) => {
    const result = AwesomeHelp.addFloat(0.1, 0.2)
    should(result.toString()).equal('0.3')
    done()
  })
  it('testing minusFloat', (done) => {
    const result = AwesomeHelp.minusFloat(0.3, 0.1)
    should(result.toString()).equal('0.2')
    done()
  })
  it('testing divFloat', (done) => {
    const result = AwesomeHelp.divFloat(0.3, 0.1)
    should(result.toString()).equal('3')
    done()
  })
  it('testing timesFloat', (done) => {
    const result = AwesomeHelp.timesFloat(0.2, 0.1)
    should(result.toString()).equal('0.02')
    done()
  })
  it('testing toFixed', (done) => {
    const result = AwesomeHelp.toFixed(0.015, 2)
    should(result.toString()).equal('0.02')
    done()
  })

  describe('testing convertDate', () => {
    it('normal case', (done) => {
      const result = AwesomeHelp.convertDate(new Date(2019, 7, 27, 9, 0, 0), 'YYYY-MM-DD hh:mm:ss')
      should(result).equal('2019-08-27 09:00:00')
      done()
    })
    it('support Chinese', (done) => {
      const result = AwesomeHelp.convertDate(new Date(2019, 7, 27, 9, 0, 0), 'YYYY年MM月DD日 hh时mm分ss秒')
      should(result).equal('2019年08月27日 09时00分00秒')
      done()
    })
  })

  it('testing groupBySomeFields', (done) => {
    const data = [{ type: 1, name: 'a'}, { type: 2, name: 'b'}, { type: 3, name: 'c'}, {type: 2, name: 'c'}, { type: 3, name: 'd'}]
    const result = AwesomeHelp.groupBySomeFields(data, (item) => item.type)

    should(result.length).equal(3)
    should(result[0].length).equal(1)
    should(result[1].length).equal(2)
    should(result[2].length).equal(2)
    should(result[2][0].name).equal('c')
    done()
  })

  it('testing isGenerator', (done) => {
    function *myGenerator() {
      let count = 0
      while(true) {
        yield count++
      }
    }
    function notGenerator() {
      let count = 0;
      while(true) {
        count++
      }
    }
    const result = AwesomeHelp.isGenerator(myGenerator.prototype)
    const result1 = AwesomeHelp.isGenerator(notGenerator.prototype)
    const result2 = AwesomeHelp.isGeneratorFunction(myGenerator)
    const result3 = AwesomeHelp.isGeneratorFunction(notGenerator)

    should(result).equal(true)
    should(result1).equal(false)
    should(result2).equal(true)
    should(result3).equal(false)
    done()
  })

  it('testing isPromise', (done) => {
    const p = new Promise((resolve, reject) => resolve(1))

    const result = AwesomeHelp.isPromise(p)

    should(result).equal(true)
    done()
  })

  it('testing toThousands', (done) => {
    const result = AwesomeHelp.toThousands(1000000000)

    should(result).equal('1,000,000,000')
    done()
  })
  it('testing hiddenNumberExpectSpecified', (done) => {
    const result = AwesomeHelp.hiddenNumberExpectSpecified(1000000000, 0, '?')
    const result1 = AwesomeHelp.hiddenNumberExpectSpecified(1000000000, 8, '*')
    should(result).equal('1?????????')
    should(result1).equal('********0*')
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
