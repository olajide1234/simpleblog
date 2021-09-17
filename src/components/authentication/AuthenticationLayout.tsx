import React, { useState } from "react";
import { makeStyles, Container } from "@material-ui/core";
import { Redirect } from "react-router-dom";

import ManualAuth from "./ManualAuth";

import { ExecutionResult } from "graphql";
import { AuthProvider } from "../../service/models/user.model";

const useStyles = makeStyles(() => ({
  loginPage__button: {
    display: "block",
    marginBottom: "24px",
    marginTop: "40px",
  },
  loginPage__mainContainer: {
    marginTop: "40px",
    textAlign: "center",
  },
}));

export interface AuthenticationData {
  email: string;
  password?: string;
  passwordConfirm?: string;
  authProvider?: AuthProvider;
};

interface Props {
  title: string;
  confirmPassword: boolean;
  onSubmit: (data: AuthenticationData) => Promise<void | ExecutionResult<any>>;
};

function Login(props: Props) {
  const { title, confirmPassword, onSubmit } = props;
  const styles = useStyles();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const onSubmitManualAuth = (data: AuthenticationData): void => {
    if (!isPasswordValid(data)) {
      setError("Invalid password confirmation");
      return;
    }
    onSubmit(data)
      .then(() => {
        setIsLoggedIn(true);
      })
      .catch((error) => {
        const errorJSON = JSON.parse(JSON.stringify(error));
        setError(errorJSON?.networkError?.result?.message);
      });
  };

  const isPasswordValid = (data: AuthenticationData): boolean => {
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
              onSubmit={onSubmitManualAuth}
            />
          </div>
        </Container>
      )}
    </>
  );
}

export default Login;
