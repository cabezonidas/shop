import React from "react";
import "./App.css";
import { Square } from "@cabezonidas/shop-ui";
import { App as SubApp } from "@cabezonidas/shop-sub-app";
import { SecretSanta } from "./secret-santa";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <SecretSanta />
        <Square />
        <SubApp />
      </header>
    </div>
  );
};

export default App;
