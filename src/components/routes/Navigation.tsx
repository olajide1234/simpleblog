import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  navBar__linkBtn: {
    marginRight: 16,
  },
  navBar__link: {
    color: "white",
    textDecoration: "none",
  },
  navBar__menuBtn: {
    marginLeft: 16,
    flexGrow: 1,
  },
}));

interface Props {
  linkPath: string;
  linkTitle: string;
}

function Navigation(props: Props) {
  const { linkPath, linkTitle } = props;
  const styles = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={styles.navBar__menuBtn}>
          Reader's Haven
        </Typography>
        <Button color="inherit" className={styles.navBar__linkBtn}>
          <Link to={linkPath} className={styles.navBar__link}>
            {linkTitle}
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;
