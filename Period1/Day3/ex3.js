const fetch = require("node-fetch");
const URL = "https://swapi.co/api/people/";

async function fetchPerson(url) {
  return await (await fetch(url)).json();
}
async function printNamesSequential() {
  console.log("Before");
  const person1 = await fetchPerson(URL + "1");
  const person2 = await fetchPerson(URL + "2");
  console.log(person1.name);
  console.log(person2.name);
  console.log("After all");
}
async function printNamesParallel() {
  console.log("Before");
  const promise1 = fetchPerson(URL + "1");
  const promise2 = fetchPerson(URL + "2");
  console.log((await promise1).name);
  console.log((await promise2).name);
  console.log("After all");
}

//printNamesSequential();
printNamesParallel();
