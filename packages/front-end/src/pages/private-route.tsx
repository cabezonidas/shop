import { Route, Redirect } from "react-router-dom";
import React, { FC, ComponentProps } from "react";
import { useMeQuery } from "@cabezonidas/shop-graphql";

export const PrivateRoute: FC<ComponentProps<typeof Route>> = props => {
  const { data } = useMeQuery();
  const authenticated = !!data?.me;

  if (!authenticated) {
    return (
      <Route
        render={({ location }) => <Redirect to={{ pathname: "/me", state: { from: location } }} />}
      />
    );
  } else {
    return <Route {...props} />;
  }
};
