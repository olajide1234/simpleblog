import React from "react";
import { Redirect } from "react-router";
import { Route } from "react-router-dom";

interface Props {
  isUserLoggedIn: boolean;
  route: {
    path: string;
    name: string;
    exact: boolean;
    protected: boolean;
    component: any;
  };
}

function ProtectedRoute(props: Props) {
  const {
    isUserLoggedIn,
    route: { component: Component, path },
  } = props;

  return (
    <Route
      path={path}
      render={(props) =>
        isUserLoggedIn ? <Component {...props} /> : <Redirect to={"/login"} />
      }
    />
  );
}

export default ProtectedRoute;
