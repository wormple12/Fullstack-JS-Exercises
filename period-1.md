
# Period 1
Mappestruktur og filnavne burde være tilstrækkeligt deskriptiv til at beskrive alt, om hvilke filer der hører til hvilke af periodens opgaver.

## Vanilla JavaScript, es2015/15.., Node.js, Babel + Webpack and TypeScript
Note: This description is too big for a single exam-question. It will be divided up into a number of smaller questions for the exam

**Explain and Reflect:**
 - Explain the differences between Java and JavaScript and Java and node.
	- Java is an OOP language and a runtime environment all at once, while Javascript is simply a scripting language.
	- Java is compiled into bytecode and run by Java Virtual Machine anywhere, while JS requires an external platform (typically a browser) to be able to execute the code.
	- Java is strongly typed, while in JS variables can change their type at any time.
	- JS is a single-threaded language and as such is blocking, while Java can distribute the workload to many threads (non-blocking).
	- JS uses many features like callback functions and hoisting described further below.
- Explain generally about node.js, when it “makes sense” and npm, and how it “fits” into the node echo system.
	- Node.js is a development runtime environment for Javascript built on Chrome's V8 engine. It enables you to run your JS code outside of a browser, and as such also enables serverside JS. It is lightweight and non-blocking. Npm (Node Package Manager) manages fetching and installing modules and dependencies for node.js so that you can easily integrate useful services (e.g. React, Babel and Node-Fetch) into your JS project.
- Explain about the Event Loop in JavaScript, including terms like: blocking, non-blocking, event loop, callback que and "other" API's. Make sure to include why this is relevant for us as developers.
	- JS is a single-threaded blocking language at default so it's essential to make use of external WebAPIs to delegate the workload to and in this way make the application asynchronous and non-blocking. All tasks go to the synchronous Stack which can redirect a task to a WebAPI that completes the task while the Stack is able to continue in parallel. When a result is returned from the WebAPI it is placed in the Callback Queue. Whenever the Stack becomes empty, the Event Loop returns a process from the Queue to the Stack if possible.
	- (Continue! Insert more reasons for it being important.)
![](https://miro.medium.com/max/1600/1*iHhUyO4DliDwa6x_cO5E3A.gif)
- Explain the terms JavaScript Engine (name at least one) and JavaScript Runtime Environment (name at least two)
	- A JS Runtime Environment (e.g. web browsers and node.js) sets the frameworks for how to run JS code and what is immediately available. It contains a JS Engine (e.g. Chrome's V8) consisting of the Heap and the Stack, which checks for syntax errors and, if it finds none, reads and executes JS code from top to bottom. The RE could also contain the references to WebAPIs, the Callback Queue and the Event Loop.
- Explain (some) of the purposes with the tools Babel and WebPack and how they differ from each other. Use examples from the exercises.
	- Babel is a JS transpiler that converts the newest JS features into backwards-compatible JS code. It takes time for browsers to update their Engine whenever a new JS update comes out, but Babel enables you to use the newest JS anyway.
	- WebPack is a file/module bundler that takes a dependancy graph and bundles it into a single file (using a config file). Webpack figures out all dependencies among the modules we use in our code and compile them into one big chunk of JS code that the browser actually understands.
	- (Continue! examples from the exercises.)

**Explain using sufficient code examples the following features in JavaScript (and node)**
- Variable/function-Hoisting
	- Hoisting is the JS feature that hoists all "var" declarations to the top of their scope, allowing vars to be declared after they are used. The same is true for entire function declarations. Variable initializations are never moved, neither are let and const variables.
- this in JavaScript and how it differs from what we know from Java/.net.
	- (Continue! But for now, just see https://www.w3schools.com/js/js_this.asp)
- Function Closures and the JavaScript Module Pattern
	- The module pattern is splitting your JS code into different modules in different files, exporting and importing them as needed. This enables much more re-usability, and makes it easier to structure the code.
	- (Continue! But for now, just see https://www.w3schools.com/js/js_function_closures.asp)
- User-defined Callback Functions (writing your own functions that take a callback)
	- Callbacks are function references that can be passed around like any other variable and then be called whenever it is appropiate. These are essential to asynchronous coding, so that you don't have to run a function right away in the main thread, but rather can send a reference to it along to another thread and let it be called when relevant. 
- Explain the methods map, filter and reduce
	- Map() calls a provided callback function on every element in a given array and return a new array with the results.
	- Filter() returns a new array based on a given array, but only with elements that fit the provided callback condition.
	- Reduce() takes an array and runs the provided callback function on it to return a single value based on that array.
- Provide examples of user-defined reusable modules implemented in Node.js (learnynode - 6)
	- learnyounode6:
```
const fs = require("fs");

function doWithFilesInFolderWithExtension(path, extension, callback) {
  fs.readdir(path, (err, list) => {
    if (err) return callback(err);
    const result = list.filter(file => file.endsWith("." + extension));
    callback(null, result);
  });
}

module.exports = doWithFilesInFolderWithExtension;
```
```
const mymodule = require("./mymodule.js");

const path = process.argv[2];
const extension = process.argv[3];
const printAll = (err, data) => {
  if (err) console.log("ERROR");
  if (data) data.forEach(file => console.log(file));
};

mymodule(path, extension, printAll);
```
- Provide examples and explain the es2015 features: let, arrow functions, this, rest parameters, destructuring objects and arrays, maps/sets etc.
	- "Let" is block-scope variable (meaning it can only be accessed from within the context that it was declared).
	- Arrow functions (lambda functions) are anonymous functions that is an alternative way to pass a callback function. They operate in the context of their enclosing scope (where they were defined), meaning that they have no binding of this, unless enforcing it with bind()/apply().
	- Destructuring objects is a special syntax that enables quick copying, and/or declaration and initialization, of any number of variables in a new context that already existed in the context of the object. You can also destructure an array to copy the elements into another context.
	- (Continue to expand later.)
- Provide an example of ES6 inheritance and reflect over the differences between Inheritance in Java and in ES6.
	- ES6 inheritance is prototype-based. Also classes, interfaces and inheritance is all just syntactic sugar to make it look like OOP languages like Java. Behind the scenes, there is no such thing as inheritance in JS.
```
class Vehicle {
 
  constructor (name, type) {
    this.name = name;
    this.type = type;
  }
 
  getName () {
    return this.name;
  }
 
  getType () {
    return this.type;
  }
 
}
class Car extends Vehicle {
 
  constructor (name) {
    super(name, 'car');
  }
 
  getName () {
    return 'It is a car: ' + super.getName();
  }
 
}
```
- Explain and demonstrate, how to implement your own events, how to emit events and how to listen for such events
	- addEventListener can be used on any element, custom or DOM-based, executing a provided callback function whenever a given event is triggered. This "publish-subscriber" pattern means that any number of elements can subscribe to the same event on the same object, and when that object emits/publishes an event-trigger, then all the listening subscribers will be notified and immediately put their callbacks on the stack.

**ES6,7,8,ES-next and TypeScript**
- Provide examples with es-next, running in a browser, using Babel and Webpack
	- See and run Period1-Day4 for examples. Babel and webpack compiles ES-next to a backwards commpatible JS that the browsers can read.
- Explain the two strategies for improving JavaScript: Babel and ES6 (es2015) + ES-Next, versus Typescript. What does it require to use these technologies: In our backend with Node and in (many different) Browsers
	- Babel allows for next-gen JS. Typescript expands on top of that, and adds even more improvements and changes. Both needs to be transpiled down to a browser-acceptable format.
	- Both strategies require installing npm modules. Babel is in itself a transpiler but requires the .babelrc file. Typescript needs to be compiled by a Typescript Compiler before it can be read by browsers.
- Provide a number of examples to demonstrate the benefits of using TypeScript, including, types, interfaces, classes and generics
	- See Period1-Day5 for examples of all of the above.
- Explain the ECMAScript Proposal Process for how new features are added to the language (the TC39 Process)
	- https://tc39.es/process-document/

**Callbacks, Promises and async/await**
- Explain about (ES-6) promises in JavaScript including, the problems they solve, a quick explanation of the Promise API:
	- Promises (as used by the external WebAPIs) help solve the problem of JS being synchronous as explained further above. When something needs to be processed asynchronously, the task is sent away, returning a promise that will only continue processing when it is completed running and returned to the stack through the callback queue. Then() or catch() is then called in the relevant context if applied.
- Example(s) that demonstrate how to avoid the callback hell  (“Pyramid of Doom")
	- Use async-await instead (see Period1-Day3-ex2.js)
- Example(s) that demonstrate how to execute asynchronous (promise-based) code in serial or parallel
	- (... deleted after conversion to async-await. Must repeat exercise.)
- Example(s) that demonstrate how to implement our own promise-solutions.
	- See Period1-Day3-ex1.js for examples.
- Example(s) that demonstrate error handling with promises
	- See exam projects from 3rd semester, until I get the solutions copied in here.

**Explain about JavaScripts async/await, how it relates to promises and reasons to use it compared to the plain promise API.
Provide examples to demonstrate** 
- Why this often is the preferred way of handling promises
	- Async/await is exactly the same as using promises - just syntactic sugar to simplify the code, and make it much easier to understand and debug.
- Error handling with async/await
	- You can use normal try-catch blocks instead of then().catch().
- Serial or parallel execution with async/await.
	- See Period1-Day3-ex3.js for an example that shows exactly this.
