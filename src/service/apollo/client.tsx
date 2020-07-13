import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";

const target_uri = "Any uri when we wish to connect to a backend";

const httpLink = createHttpLink({
  uri: target_uri,
  // credentials: "include", // sends cookies
  fetchOptions: {
    mode: "cors"
  }
});


const authLink = (cookies: any) => {
  return setContext((_, { headers }) => {
    const token = cookies["token"];
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ""
      }
    };
  });
};

export const client = (cookies: any) => {
  return new ApolloClient({
    link: authLink(cookies).concat(httpLink),
    cache: new InMemoryCache(),
  });
};
