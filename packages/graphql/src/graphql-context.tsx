import fetch from "isomorphic-fetch";
import React, { useState, useEffect, createContext, FC, useContext } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink, Observable } from "apollo-link";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";
import { polyfill } from "es6-promise";

polyfill();

interface IGraphqlContext {
  loadingUser: boolean;
  getAccessToken: () => string;
  setAccessToken: (token: string) => void;
}

const GraphqlContext = createContext<IGraphqlContext>(undefined as any);

export const GraphqlProvider: FC<{ uri: string }> = ({ uri, children }) => {
  const { getAccessToken, setAccessToken } = useAccessToken();
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    let alive = true;
    fetch(`${uri}/refresh_token`, {
      method: "POST",
      credentials: "include",
    }).then(async x => {
      const res = await x.json();
      const { accessToken } = res;
      if (alive) {
        setAccessToken(accessToken);
        setLoadingUser(false);
      }
    });
    return () => {
      alive = false;
    };
  }, []);

  const cache = new InMemoryCache({});
  const requestLink = new ApolloLink(
    (operation, forward) =>
      new Observable(observer => {
        let handle: any;
        Promise.resolve(operation)
          .then(operation => {
            const accessToken = getAccessToken();
            if (accessToken) {
              operation.setContext({
                headers: {
                  authorization: `bearer ${accessToken}`,
                },
              });
            }
          })
          .then(() => {
            handle = forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            });
          })
          .catch(observer.error.bind(observer));

        return () => {
          if (handle) handle.unsubscribe();
        };
      })
  );
  const client = new ApolloClient({
    link: ApolloLink.from([
      new TokenRefreshLink({
        accessTokenField: "accessToken",
        isTokenValidOrUndefined: () => {
          const token = getAccessToken();

          if (!token) {
            return true;
          }

          try {
            const { exp } = jwtDecode(token);
            if (Date.now() >= exp * 1000) {
              return false;
            } else {
              return true;
            }
          } catch {
            return false;
          }
        },
        fetchAccessToken: () => {
          return fetch(`${uri}/refresh_token`, {
            method: "POST",
            credentials: "include",
          });
        },
        handleFetch: accessToken => {
          setAccessToken(accessToken);
        },
        handleError: err => {
          console.warn("Your refresh token is invalid. Try to relogin");
          console.error(err);
        },
      }),
      onError(({ graphQLErrors, networkError }) => {
        console.log(graphQLErrors);
        console.log(networkError);
      }),
      requestLink,
      new HttpLink({
        uri: `${uri}/graphql`,
        credentials: "include",
      }),
    ]),
    cache,
  });
  return (
    <GraphqlContext.Provider value={{ loadingUser, setAccessToken, getAccessToken }}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </GraphqlContext.Provider>
  );
};

const useAccessToken = () => {
  const [token, setToken] = useState("");
  return {
    getAccessToken: () => token,
    setAccessToken: (t: string) => setToken(t),
  };
};

export const useGraphqlClient = () => {
  return useContext(GraphqlContext);
};
