import React from "react";
import { LoginApp } from "@cabezonidas/shop-login";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { useTranslation, Box, useTheme } from "@cabezonidas/shop-ui";
import Users from "./pages/Users";

const enUsRoutes = {
  routes: {
    me: "Me",
    home: "Home",
    users: "Users",
  },
};
const esArRoutes = {
  routes: {
    me: "Yo",
    home: "Inicio",
    users: "Usuarios",
  },
};

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  i18n.addResourceBundle("en-US", "translation", { main: enUsRoutes }, true, true);
  i18n.addResourceBundle("en-AR", "translation", { main: esArRoutes }, true, true);
  const theme = useTheme();
  return (
    <BrowserRouter>
      <Box height="100vh" display="flex" flexDirection="row">
        <Box
          width="40%"
          bg={theme.colors.neutral.mediumLight}
          textAlign="right"
          padding="3"
          fontSize="5"
          justifyContent="space-around"
        >
          <Box>
            <Link to="/">{t("main.routes.home")}</Link>
          </Box>
          <Box>
            <Link to="/me">{t("main.routes.me")}</Link>
          </Box>
          <Box>
            <Link to="/users">{t("main.routes.users")}</Link>
          </Box>
        </Box>
        <Box width="60%" margin="2">
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/me" exact={true} component={LoginApp} />
            <Route path="/users" component={Users} />
          </Switch>
        </Box>
      </Box>
    </BrowserRouter>
  );
};

export default App;
