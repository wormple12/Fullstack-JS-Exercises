function Calculator() {
  function add(n1, n2) {
    return n1 + n2;
  }
  function subtract(n1, n2) {
    return n1 - n2;
  }
  function times(n1, n2) {
    return n1 * n2;
  }
  function divide(n1, n2) {
    if (n2 === 0) throw new Error("Attempt to divide by zero");
    return n1 / n2;
  }
  return {
    add,
    subtract,
    times,
    divide
  };
}

module.exports = Calculator();
