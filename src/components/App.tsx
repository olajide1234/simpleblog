import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { useCookies } from "react-cookie";
import { Route, Switch } from "react-router";

import { client } from "../service/apollo/client";
import routes from "../routes/routes";
import ProtectedRoute from "./routes/ProtectedRoute";

import store from "../store/store";


function isUserLoggedIn(cookies: any) {
  const userId: number = +cookies["userId"];
  return !!userId;
}

const Routes = (cookies: { [name: string]: number }) => {
  return routes.map((route) =>
    route.protected ? (
      <ProtectedRoute
        isUserLoggedIn={isUserLoggedIn(cookies)}
        route={route}
        key={route.name}
      />
    ) : (
      <Route {...route} key={route.name} />
    )
  );
};

function App() {
  const [cookies, setCookies] = useCookies(["userId"]);
  const clientApollo = client(cookies);
  return (
    <ApolloProvider client={clientApollo}>
      <Provider store={store}>
        <Router>
          <Switch>{Routes(cookies)}</Switch>
        </Router>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
