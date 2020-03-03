var counter = (function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  };
})();

console.log(counter.value()); // logs 0
counter.increment();
counter.increment();
console.log(counter.value()); // logs 2
counter.decrement();
console.log(counter.value()); // logs 1

// custom class
function Person(_name, _age) {
  let name = _name;
  let age = _age;

  function setName(_name) {
    name = _name;
  }

  function setAge(_age) {
    age = _age;
  }

  function getInfo() {
    return name + ", " + age;
  }

  return {
    setName: setName,
    setAge: setAge,
    getInfo: getInfo
  };
}

const p1 = Person("John", 22);
console.log(p1.getInfo());
p1.setAge(55);
console.log(p1.getInfo());
p1.setName("Kim");
console.log(p1.getInfo());
