import React from "react";
import "./App.css";
import { Square } from "@cabezonidas/shop-ui";
import { App as SubApp } from "@cabezonidas/shop-sub-app";
import { SecretSanta } from "./secret-santa";
import { useUsersQuery } from "./generated/graphql";

const App: React.FC = () => {
  const { data, loading } = useUsersQuery();

  if (loading || !data) {
    return <div>loading...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <SecretSanta />
        {data && (
          <div>
            {data.users.map(u => (
              <div key={u._id}>{u.email}</div>
            ))}
          </div>
        )}
        <Square />
        <SubApp />
      </header>
    </div>
  );
};

export default App;
