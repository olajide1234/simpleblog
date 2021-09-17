import React, { useState } from "react";
import { makeStyles, Container } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import ManualAuth from "./ManualAuth";
import { ExecutionResult } from "graphql";
import { AuthProvider } from "../../service/models/user.model";
import { useCookies } from "react-cookie";

const useStyles = makeStyles(() => ({
  loginPage__button: {
    display: "block",
    marginBottom: "24px",
    marginTop: "40px"
  },
  loginPage__mainContainer: {
    marginTop: "40px",
    textAlign: "center"
  }
}));

export type AuthenticationData = {
  email: string;
  password?: string;
  passwordConfirm?: string;
  authProvider?: AuthProvider;
};

type Props = {
  title: string;
  confirmPassword: boolean;
  onSubmit: (data: AuthenticationData) => Promise<void | ExecutionResult<any>>;
};

function Login(props: Props) {
  const { title, confirmPassword, onSubmit } = props;
  const styles = useStyles();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [cookies, setCookies] = useCookies();

  const onSubmitManualAuth = (data: AuthenticationData) => {
    if (!isPasswordValid(data)) {
      setError("Invalid password confirmation");
      return;
    }
    onSubmit(data)
      .then(() => {
        setIsLoggedIn(true);
      })
      .catch(error => {
        const errorJSON = JSON.parse(JSON.stringify(error));
        setError(errorJSON ?.networkError ?.result ?.message);
      });
  };

  const onLoginSuccess = (data: any, authProvider: AuthProvider) => {
    const dataAuth = {
      email: data?.email || data?.profileObj?.email,
      authProvider: authProvider
    };
    onSubmit(dataAuth)
      .then(() => {
        setCookies("token", data.access_token);
        setIsLoggedIn(true);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const onLoginFailure = () => {
    setIsLoggedIn(false);
  };

  const isPasswordValid = (data: AuthenticationData) => {
    const { password, passwordConfirm } = data;
    return !passwordConfirm || password === passwordConfirm;
  };
  return (
    <>
      {isLoggedIn ? (
        <Redirect to={"/"} />
      ) : (
        <Container component="main" maxWidth="xs">
          <div className={styles.loginPage__mainContainer}>
            'Username: test; password: test'
            <ManualAuth
              submitError={error}
              title={title}
              confirmPassword={confirmPassword}
              onClickSubmit={onSubmitManualAuth}
            />
          </div>
        </Container>
      )}
    </>
  );
}

export default Login;
