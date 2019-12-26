import React, { useEffect, useState } from "react";
import { Square } from "@cabezonidas/shop-ui";
import { useUsersQuery } from "@cabezonidas/shop-common";
import { App as SubApp } from "@cabezonidas/shop-sub-app";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { setAccessToken } from "./accessToken";
import { Header } from "./pages/Header";

const App: React.FC = () => {
  const { loadingUser } = useLoggedUser();
  if (loadingUser) {
    return <div>Loading</div>;
  }
  return (
    <div>
      <Header />
      <header style={{ display: "flex", flexDirection: "row" }}>
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

const useLoggedUser = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8899/refresh_token", {
      method: "POST",
      credentials: "include",
    }).then(async x => {
      const res = await x.json();
      const { accessToken } = res;
      setAccessToken(accessToken);
      setLoading(false);
    });
  }, []);
  return { loadingUser: loading };
};
