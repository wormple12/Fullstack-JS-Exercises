// a
interface myFunc {
  (s1: string, s2: string, s3: string): string[];
}

// b
const myFunc01: myFunc = (s1: string, s2: string, s3: string) => {
  return [s1, s2, s3];
};

// c
const myFunc02: myFunc = (s1: string, s2: string, s3: string) => {
  return [s1.toUpperCase(), s2.toUpperCase(), s3.toUpperCase()];
};

// d
let f2 = function logger(f1: myFunc) {
  //Simulate that we get data from somewhere and uses the provided function
  let [a, b, c] = ["a", "b", "c"];
  console.log(f1(a, b, c));
};

// e
f2(myFunc01);
f2(myFunc02);

// f
const myFunc03 = (n1: number) => {
  return ["stupid"];
};
// f2(myFunc03);
// TypeScript doesnt allow it
