import React, { useState, ChangeEvent } from "react";
import {
  Typography,
  makeStyles,
  TextField,
  Button,
  Avatar,
} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import { AuthenticationData } from "./AuthenticationLayout";

const useStyles = makeStyles(() => ({
  manualAuth__textInput: {
    display: "block",
    marginTop: 40,
    marginBottom: 20,
  },
  manualAuth__submitBtn: {
    display: "block",
    marginTop: 40,
  },
  manualAuth__avatar: {
    margin: "auto",
    marginBottom: 8,
  },
  manualAuth__confirmPwd: {
    marginTop: 20,
  },
  manualAuth_errorMsg: {
    marginTop: 8,
    color: "red",
    fontWeight: "bold",
    whiteSpace: "pre-line",
  },
}));

interface Props {
  title: string;
  confirmPassword: boolean;
  onSubmit: (data: AuthenticationData) => void;
  submitError: string;
}

type formData = Exclude<keyof AuthenticationData, "authProvider">;

function ManualAuth(props: Props) {
  const { submitError, title, confirmPassword, onSubmit } = props;
  const [inputData, setInputData] = useState<AuthenticationData>({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const styles = useStyles();

  const onChangeData = (e: ChangeEvent<HTMLInputElement>): void => {
    const newData = { ...inputData };
    newData[e.currentTarget.id as formData] = e.currentTarget.value;
    setInputData(newData);
  };

  const handleSubmit = (): void => {
    onSubmit(inputData);
  };

  return (
    <div>
      <CssBaseline />
      <Avatar className={styles.manualAuth__avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography variant="h5">{title}</Typography>
      <form>
        <div className={styles.manualAuth__textInput}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email adress"
            placeholder="Email adress"
            onChange={onChangeData}
          />
        </div>
        <TextField
          variant="outlined"
          required
          fullWidth
          id="password"
          label="Password"
          placeholder="Password"
          onChange={onChangeData}
        />
        {confirmPassword && (
          <div className={styles.manualAuth__confirmPwd}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="passwordConfirm"
              label="Confirm password"
              placeholder="Confirmation"
              onChange={onChangeData}
            />
          </div>
        )}
        {submitError && !!submitError.trim() && (
          <Typography
            variant="subtitle1"
            className={styles.manualAuth_errorMsg}
          >
            {submitError}
          </Typography>
        )}
        <div className={styles.manualAuth__submitBtn}>
          <Button
            variant="contained"
            color="primary"
            component="span"
            fullWidth
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ManualAuth;
