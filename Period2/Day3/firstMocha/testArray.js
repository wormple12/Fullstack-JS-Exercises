const expect = require("chai").expect;

describe("Test of JS Array", function() {
  describe("Verify the #indexOf()", function() {
    it("should return -1 when the value is not present", function() {
      expect([1, 2, 3].indexOf(0)).to.be.equal(-1);
      expect([1, 2, 3].indexOf(5)).to.be.equal(-1);
      expect([1, 2, 3].indexOf(3)).to.be.equal(2);
    });
  });
});

describe("Testing async behaviour", function() {
  var foo = false;
  before(function(done) {
    setTimeout(function() {
      foo = true;
      done(); //Test will fail without this
    }, 1000);
  });
  it("should pass (with done called)", function() {
    expect(foo).to.equal(true);
  });
});
