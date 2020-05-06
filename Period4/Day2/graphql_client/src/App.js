import React, { useEffect, useState } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import All from "./components/AllFriends";
import Dummy2 from "./components/Dummy2";

function App() {
  return (
    <Router>
      <Header />
      <div className="mainContainer">
        <Switch>
          <Route exact path="/">
            <h3>Welcome.</h3>
          </Route>
          <Route path="/all">
            <All />
          </Route>
          <Route path="/dummy2">
            <Dummy2 />
          </Route>
          <Route>
            <h3>The page was not found.</h3>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
