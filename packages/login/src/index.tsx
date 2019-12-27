import React from "react";
import ReactDOM from "react-dom";
import App from "./LoginApp";
import * as serviceWorker from "./serviceWorker";
import { GraphqlProvider } from "@cabezonidas/shop-graphql";
import { ThemeProvider } from "@cabezonidas/shop-ui";

ReactDOM.render(
  <GraphqlProvider uri={"http://localhost:8899"}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </GraphqlProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
