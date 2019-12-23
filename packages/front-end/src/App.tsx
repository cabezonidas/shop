import React from "react";
import "./App.css";
import { Square } from "@cabezonidas/shop-ui";
import { App as SubApp } from "@cabezonidas/shop-sub-app";
import { SecretSanta } from "./secret-santa";
import { useUsersQuery } from "./generated/graphql";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <div style={{ flexShrink: 0, width: "200px", background: "#f3f3f3" }}>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/secret-santa">Secret santa</Link>
              </li>
              <li>
                <Link to="/imported-ui">Imported ui</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
              <li>
                <Link to="/sub-app">Sub app</Link>
              </li>
            </ul>
          </div>
          <div style={{ flexGrow: 1 }}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register} />
              <Route path="/secret-santa" component={SecretSanta} />
              <Route path="/imported-ui" component={Square} />
              <Route path="/users" component={Users} />
              <Route path="/sub-app" component={SubApp} />
            </Switch>
          </div>
        </BrowserRouter>
      </header>
    </div>
  );
};

export default App;

const Users = () => {
  const { data, loading } = useUsersQuery();

  if (loading || !data) {
    return <div>loading...</div>;
  }

  return (
    data && (
      <div>
        {data.users.map(u => (
          <div key={u._id}>{u.email}</div>
        ))}
      </div>
    )
  );
};
