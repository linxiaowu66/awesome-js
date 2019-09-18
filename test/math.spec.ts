import { describe, it } from 'mocha'
import { AwesomeMath } from '../lib'

const should = require('should')

const defaultPoints = [
  [116.169465,39.932670],
  [116.160260,39.924492],
  [116.150625,39.710019],
  [116.183198,39.709920],
  [116.226950,39.777616],
  [116.442621,39.799892],
  [116.463478,39.790066],
  [116.588276,39.809551],
  [116.536091,39.808859],
  [116.573856,39.839643],
  [116.706380,39.916740],
  [116.600293,39.937770],
  [116.514805,39.982375],
  [116.499935,40.013710],
  [116.546520,40.030443],
  [116.687668,40.129961],
  [116.539697,40.080659],
  [116.503390,40.058474],
  [116.468800,40.052578]]

describe('testing math functions', () => {
  describe('testing centroid', () => {
    it('testing centroid when anything is ok', (done) => {
      const ins = new AwesomeMath.Region(defaultPoints)
      const result = ins.centroid()
      should(result.longitude).equal(116.39325968060704)
      should(result.latitude).equal(39.899984799534096)
      done()
    })
    it('testing centroid when point is not pass', (done) => {
      const ins = new AwesomeMath.Region([])
      const result = ins.centroid()
      should(result.longitude).equal(0)
      should(result.latitude).equal(0)
      done()
    })
  })

  it('testing getDistance', (done) => {
    const result = AwesomeMath.getDistance(116368904, 39923423, 116387271, 39922501)
    should(result.toFixed(0)).equal('1571')
    done()
  })
  it('testing decodeLatLng', (done) => {
    const result = AwesomeMath.decodeLatLng(116368904)
    should(result).equal(116.368904)
    done()
  })
  it('testing decodeLatLng when lat is null', (done) => {
    const result = AwesomeMath.decodeLatLng(null)
    should(result).equal(null)
    done()
  })
  it('testing encodeLatLng', (done) => {
    const result = AwesomeMath.encodeLatLng(116.368904)
    should(result).equal(116368904)
    done()
  })
  it('testing encodeLatLng when lat is null', (done) => {
    const result = AwesomeMath.encodeLatLng(null)
    should(result).equal(null)
    done()
  })
})
