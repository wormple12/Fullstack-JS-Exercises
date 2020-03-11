const calc = require("./calculator");
const expect = require("chai").expect;

describe("Test of Calculator module", function() {
  describe("Verify the #add()", function() {
    it("should return 7+6=13 and 5+(-2)=3", function() {
      expect(calc.add(7, 6)).to.equal(13);
      expect(calc.add(5, -2)).to.equal(3);
    });
  });
  describe("Verify the #subtract()", function() {
    it("should return 7-6=1 and 5-(-2)=7", function() {
      expect(calc.subtract(7, 6)).to.equal(1);
      expect(calc.subtract(5, -2)).to.equal(7);
    });
  });
  describe("Verify the #times()", function() {
    it("should return 7*6=42 and 5*(-2)=-10", function() {
      expect(calc.times(7, 6)).to.equal(42);
      expect(calc.times(5, -2)).to.equal(-10);
    });
  });
  describe("Verify the #divide()", function() {
    it("should return 6/2=3 and 10/0 throws an error", function() {
      expect(calc.divide(6, 2)).to.equal(3);
      expect(() => calc.divide(10, 0)).to.throw("Attempt to divide by zero");
    });
  });
});
