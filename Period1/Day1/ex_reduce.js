// a)
const all = ["Lars", "Peter", "Jan", "Bo"];
console.log("(A) JOIN");
console.log(all.join(","));
console.log(all.join(" "));
console.log(all.join("#"));

// b)
const numbers = [2, 3, 67, 33];
const sum = numbers.reduce((total, num) => total + num);
console.log("(B) REDUCE TO SUM");
console.log(sum);

// c)
let members = [
  { name: "Peter", age: 18 },
  { name: "Jan", age: 35 },
  { name: "Janne", age: 25 },
  { name: "Martin", age: 22 }
];
const average = members.reduce((result, member, i, arr) => {
  result += member.age;
  if (i === arr.length - 1) return result / arr.length;
  return result;
}, 0);
console.log("(C) REDUCE TO AVERAGE AGE");
console.log(average);

// d)
var votes = ["Clinton", "Trump", "Clinton", "Clinton", "Trump", "Trump", "Trump", "None"];
const voteObj = votes.reduce(
  (result, vote) => {
    return { ...result, [vote]: result[vote] + 1 };
  },
  { Clinton: 0, Trump: 0, None: 0 }
);

console.log("(D) REDUCE TO VOTE COUNT");
console.log(voteObj);
