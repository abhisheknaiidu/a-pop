import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Link,
  Switch,
  IconButton,
} from "@material-ui/core";
import { HeadsetTwoTone } from "@material-ui/icons";
import { useMyTheme } from "../theme";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import WbSunnyIcon from "@material-ui/icons/WbSunny";

// Got access to theme as well
const useStyles = makeStyles((theme) => ({
  heading: {
    marginLeft: theme.spacing(2),
  },
  switchTheme: {
    marginLeft: "auto",
  },
}));

function Header() {
  //Styles can be used as hooks.
  const classes = useStyles();
  const [darkTheme, changeTheme] = useMyTheme();

  return (
    <AppBar color="secondary" position="fixed">
      <Toolbar>
        <HeadsetTwoTone />
        <Typography className={classes.heading} variant="h6" component="h1">
          <Link
            target="_blank"
            rel="noreferrer"
            href="https://github.com/abhisheknaiidu/A-POP"
            style={{ paddingLeft: 10, textDecoration: "none" }}
            color="inherit"
          >
            A-POP
          </Link>
        </Typography>
        <Switch
          className={classes.switchTheme}
          color="inherit"
          checked={darkTheme}
          onChange={() => changeTheme(!darkTheme)}
        />
        <IconButton
          color="primary"
          size="big"
          style={{ marginLeft: "auto" }}
          onClick={() => changeTheme(!darkTheme)}
        >
          <>{!darkTheme ? <Brightness4Icon /> : <WbSunnyIcon />}</>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
