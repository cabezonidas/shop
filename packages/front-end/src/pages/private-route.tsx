import { Route, Redirect } from "react-router-dom";
import React, { FC, ComponentProps, useContext } from "react";
import { useMeQuery, GraphqlContext } from "@cabezonidas/shop-graphql";

export const PrivateRoute: FC<ComponentProps<typeof Route>> = props => {
  const { data, loading } = useMeQuery();
  const { loadingUser } = useContext(GraphqlContext);
  const authenticated = !!data?.me;

  if (loadingUser || loading) {
    return <></>;
  }

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
