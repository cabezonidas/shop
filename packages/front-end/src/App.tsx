import React from "react";
import { useUsersQuery } from "@cabezonidas/shop-graphql";
import { LoginApp } from "@cabezonidas/shop-login";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Home } from "./pages/Home";

const App: React.FC = () => {
  return (
    <div>
      <header style={{ display: "flex", flexDirection: "row" }}>
        <BrowserRouter>
          <div style={{ flexShrink: 0, width: "200px", background: "#f3f3f3" }}>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/me">Me</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
            </ul>
          </div>
          <div style={{ flexGrow: 1 }}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/me" exact component={LoginApp} />
              <Route path="/users" component={Users} />
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
