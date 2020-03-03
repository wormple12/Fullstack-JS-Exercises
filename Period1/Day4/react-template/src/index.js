import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import "./style.css";
import Icon from "./image.jpg";
import printMe from "./print.js";

/* function component() {
  const element = document.createElement("div");

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(["Hello", "webpack"], " ");
  element.classList.add("hello");

  // Add the image to our existing div
  const myIcon = new Image();
  myIcon.src = Icon;
  element.appendChild(myIcon);

  // Button
  const btn = document.createElement("button");
  btn.innerHTML = "Click me and check the console!";
  btn.onclick = printMe;
  element.appendChild(btn);

  return element;
}

let element = component(); // Store the element to re-render on print.js changes
document.body.appendChild(element); */

const myIcon = new Image();
myIcon.src = Icon;

const Index = () => {
  return (
    <div className="hello">
      {_.join(["Hello", "webpack"], " ")}
      {myIcon}
      <button onClick={printMe}>Click me and check the console!</button>
    </div>
  );
};

ReactDOM.render(<Index />, document.getElementById("index"));

/* if (module.hot) {
  module.hot.accept("./print.js", function() {
    console.log("Accepting the updated printMe module!");
    document.body.removeChild(element);
    element = component(); // Re-render the "component" to update the click handler
    document.body.appendChild(element);
  });
} */
