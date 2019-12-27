import React, { forwardRef, ComponentProps, useState } from "react";
import { Input, Form, Label, Button, Box } from "@cabezonidas/shop-ui";
import { useRegisterMutation } from "@cabezonidas/shop-graphql";

export const RegisterForm = forwardRef<
  HTMLFormElement,
  ComponentProps<typeof Form> & { onLogin: () => void }
>((props, ref) => {
  const { onLogin, ...formProps } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register] = useRegisterMutation();

  return (
    <Form
      onSubmit={async e => {
        e.preventDefault();
        await register({
          variables: {
            email,
            password,
          },
        });
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
        <Button type="submit">Register</Button>
        <Button
          onClick={e => {
            e.preventDefault();
            onLogin();
          }}
        >
          Got an account? log in!
        </Button>
      </Box>
    </Form>
  );
});

export default RegisterForm;
