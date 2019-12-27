import React, { forwardRef, ComponentProps, useState, useContext } from "react";
import { Input, Form, Label, Button, Box } from "@cabezonidas/shop-ui";
import { useLoginMutation, MeQuery, MeDocument, GraphqlContext } from "@cabezonidas/shop-graphql";

export const LoginForm = forwardRef<
  HTMLFormElement,
  ComponentProps<typeof Form> & { onRegister: () => void }
>((props, ref) => {
  const [email, setEmail] = useState("seba1@mailinator.com");
  const [password, setPassword] = useState("12345");
  const [login] = useLoginMutation();
  const { setAccessToken } = useContext(GraphqlContext);
  const { onRegister, ...formProps } = props;
  return (
    <Form
      onSubmit={async e => {
        e.preventDefault();
        const response = await login({
          variables: {
            email,
            password,
          },
          update: (store, { data }) => {
            if (!data) {
              return null;
            }
            store.writeQuery<MeQuery>({
              query: MeDocument,
              data: {
                me: data.login.user,
              },
            });
          },
        });

        if (response && response.data) {
          setAccessToken(response.data.login.accessToken);
        }
      }}
      {...formProps}
      ref={ref}
    >
      <Label htmlFor="user">Usuario</Label>
      <Input
        id="user"
        placeholder="email"
        value={email}
        onChange={e => {
          setEmail(e.target.value);
        }}
      />
      <Label htmlFor="password">Contrasena</Label>
      <Input
        type="password"
        id="password"
        placeholder="password"
        value={password}
        onChange={e => {
          setPassword(e.target.value);
        }}
      />

      <Box display="flex" justifyContent="space-between">
        <Button type="submit">Login</Button>
        <Button
          onClick={e => {
            e.preventDefault();
            onRegister();
          }}
        >
          Don't have an account? register now!
        </Button>
      </Box>
    </Form>
  );
});
