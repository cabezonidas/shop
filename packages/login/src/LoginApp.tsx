import React, { useContext, useState } from "react";
import { LoginForm } from "./components/login-form";
import { useMeQuery, GraphqlContext, useLogoutMutation } from "@cabezonidas/shop-graphql";
import RegisterForm from "./components/register-form";
import { Box, Button } from "@cabezonidas/shop-ui";

export const LoginApp: React.FC = () => {
  const [mode, setMode] = useState<"register" | "login">("login");
  const { data, loading } = useMeQuery();
  const [logout, { client }] = useLogoutMutation();
  const { loadingUser, setAccessToken } = useContext(GraphqlContext);

  if (loading || loadingUser) {
    return <Box>Loading</Box>;
  }

  if (data && data.me) {
    return (
      <Box>
        {data.me.email}
        <Button
          onClick={async () => {
            await logout();
            setAccessToken("");
            if (client) {
              await client.resetStore();
            }
          }}
        >
          logout
        </Button>
      </Box>
    );
  }

  if (mode === "login") {
    return <LoginForm onRegister={() => setMode("register")} />;
  } else {
    return <RegisterForm onLogin={() => setMode("login")} />;
  }
};

export default LoginApp;
