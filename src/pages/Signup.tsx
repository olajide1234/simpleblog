import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { useCookies } from "react-cookie";

import AuthenticationLayout, {
  AuthenticationData,
} from "../components/authentication/AuthenticationLayout";
import Navigation from "../components/routes/Navigation";

import { SIGNUP } from "../service/apollo/mutations";

function Signup() {
  const [signup] = useMutation(SIGNUP);
  const [cookies, setCookies] = useCookies(["token"]);

  const onSubmit = (data: AuthenticationData) => {
    const { email, password } = data;

    // For demo purposes, we don't do an actual signup
    return Promise.resolve(setCookies("userId", 5))
    // return Promise.resolve(
    //   signup({
    //     variables: { request: { email, password } }
    //   }).then(response => {
    //     setCookies("userId", response ?.data ?.signup ?.user ?.id);
    //     setCookies("token", response ?.data ?.signup ?.token);
    //   })
    // );
  };

  return (
    <>
      <Navigation linkPath="/login" linkTitle="Login" />
      <AuthenticationLayout
        title="Signup"
        confirmPassword
        onSubmit={onSubmit}
      />
    </>
  );
}

export default Signup;
