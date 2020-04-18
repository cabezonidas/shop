import React, { FC } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { GraphqlProvider } from "@cabezonidas/shop-graphql";
import { UiProvider, useTranslation } from "@cabezonidas/shop-ui";

const uri = (() => {
  switch (process.env.NODE_ENV) {
    case "production":
      return "https://uzgz73amti.execute-api.us-east-1.amazonaws.com/prd";
    case "test":
      return "https://uzgz73amti.execute-api.us-east-1.amazonaws.com/test";
    default:
      return "http://localhost:8899";
  }
})();

const GraphqlState: FC = ({ children }) => {
  const { i18n } = useTranslation();
  return (
    <GraphqlProvider
      language={i18n.language}
      uri={uri}
      onErrorResponse={({ operation, networkError }) => {
        // Use toast/alert here.
        if (networkError) {
          console.log(networkError, operation);
        }
      }}
    >
      {children}
    </GraphqlProvider>
  );
};

ReactDOM.render(
  <UiProvider>
    <GraphqlState>
      <App />
    </GraphqlState>
  </UiProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
