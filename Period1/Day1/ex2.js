// a) homemade filter function
function myFilter(array, callback) {
  let result = [];
  array.forEach(element => {
    if (callback(element)) {
      result.push(element);
    }
  });
  return result;
}

var ages = [32, 33, 16, 40];

function checkAdult(age) {
  return age >= 18;
}

console.log("a) FILTERING");
console.log(ages);
console.log(myFilter(ages, checkAdult));

// b) homemade map function
function myMap(array, callback) {
  let result = [];
  array.forEach(element => {
    result.push(callback(element));
  });
  return result;
}

var numbers = [4, 9, 16, 25];

console.log("b) MAPPING");
console.log(numbers);
console.log(myMap(numbers, Math.sqrt));
