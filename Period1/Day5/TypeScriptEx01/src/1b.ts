let http = require("http");
// Error: Cannot find module 'node-fetch'...
const fetchFrom = require("node-fetch");
const url = "https://swapi.co/api/people/";

async function fetchPerson(url: string) {
  return await (await fetchFrom(url)).json();
}
async function printNamesSequential() {
  let result = "Before";
  const person1 = await fetchPerson(url + "1");
  const person2 = await fetchPerson(url + "2");
  result += person1.name;
  result += person2.name;
  result += "After";
  return result;
}

async function startServer() {
  const names = await printNamesSequential();
  //create a server object:
  http
    .createServer(function(req: any, res: any) {
      res.write(names); //write a response to the client
      res.end(); //end the response
    })
    .listen(8080); //the server object listens on port 8080
}

startServer();
