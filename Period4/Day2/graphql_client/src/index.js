import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const client = new ApolloClient({
  uri: "http://localhost:5555/graphql",
});

const Index = () => {
  return (
    <ApolloProvider client={client}>
      <div>
        <App />
      </div>
    </ApolloProvider>
  );
};

ReactDOM.render(<Index />, document.getElementById("root"));
