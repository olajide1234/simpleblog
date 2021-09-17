import React from "react";
import { useCookies } from "react-cookie";
import { useMutation } from "@apollo/react-hooks";

import AuthenticationLayout, {
  AuthenticationData
} from "../components/authentication/AuthenticationLayout";
import Navigation from "../components/routes/Navigation";

import { LOGIN } from "../service/apollo/mutations";
import { AuthProvider } from "../service/models/user.model";

function Login() {
  const [login] = useMutation(LOGIN);
  const [cookies, setCookies] = useCookies();
  const onSubmit = (data: AuthenticationData) => {
    const { email, password, authProvider } = data;
    // For demo purposes, we don't do an actual login
    return Promise.resolve(setCookies("userId", 5));
    
    // return Promise.resolve(
    //   login({
    //     variables: { request: { email, password, authProvider } }
    //   }).then(response => {
    //     setCookies("userId", response ?.data ?.login ?.user ?.id);
    //     if (!data.authProvider) {
    //       setCookies("token", response ?.data ?.login ?.token);
    //     }
    //   })
    // );
  };

  return (
    <>
      <Navigation linkPath="/signup" linkTitle="Sign Up" />
      <AuthenticationLayout
        title="Login"
        confirmPassword={false}
        onSubmit={onSubmit}
      />
    </>
  );
}

export default Login;
