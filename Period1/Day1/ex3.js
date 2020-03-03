function myFilter(callback) {
  let result = [];
  this.forEach(element => {
    if (callback(element)) {
      result.push(element);
    }
  });
  return result;
}

function myMap(callback) {
  let result = [];
  this.forEach(element => {
    result.push(callback(element));
  });
  return result;
}

Array.prototype.myFilter = myFilter;

var names = ["Lars", "Peter", "Jan", "Bo"];
var newArray = names.myFilter(name => name.includes("a"));
console.log(names);
console.log(newArray);
