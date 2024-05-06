import { describe, it } from "mocha";
import { AwesomeGis } from "../lib";

const should = require("should");

const defaultPoints = [
  [116.169465, 39.93267],
  [116.16026, 39.924492],
  [116.150625, 39.710019],
  [116.183198, 39.70992],
  [116.22695, 39.777616],
  [116.442621, 39.799892],
  [116.463478, 39.790066],
  [116.588276, 39.809551],
  [116.536091, 39.808859],
  [116.573856, 39.839643],
  [116.70638, 39.91674],
  [116.600293, 39.93777],
  [116.514805, 39.982375],
  [116.499935, 40.01371],
  [116.54652, 40.030443],
  [116.687668, 40.129961],
  [116.539697, 40.080659],
  [116.50339, 40.058474],
  [116.4688, 40.052578],
];

describe("testing math functions", () => {
  describe("testing centroid", () => {
    it("testing centroid when anything is ok", (done) => {
      const ins = new AwesomeGis.Region(defaultPoints);
      const result = ins.centroid();
      should(result.longitude).equal(116.39325968060704);
      should(result.latitude).equal(39.899984799534096);
      done();
    });
    it("testing centroid when point is not pass", (done) => {
      const ins = new AwesomeGis.Region([]);
      const result = ins.centroid();
      should(result.longitude).equal(0);
      should(result.latitude).equal(0);
      done();
    });
  });

  it("testing getDistance", (done) => {
    const result = AwesomeGis.getDistance(
      116.368904,
      39.923423,
      116.387271,
      39.922501
    );
    should(result.toFixed(0)).equal("1571");
    done();
  });
  it("testing decodeLatLng", (done) => {
    const result = AwesomeGis.decodeLatLng(116368904);
    should(result).equal(116.368904);
    done();
  });
  it("testing decodeLatLng when lat is null", (done) => {
    const result = AwesomeGis.decodeLatLng(null);
    should(result).equal(null);
    done();
  });
  it("testing encodeLatLng", (done) => {
    const result = AwesomeGis.encodeLatLng(116.368904);
    should(result).equal(116368904);
    done();
  });
  it("testing encodeLatLng when lat is null", (done) => {
    const result = AwesomeGis.encodeLatLng(null);
    should(result).equal(null);
    done();
  });
});
