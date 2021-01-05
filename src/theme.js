import React, { createContext, useState, useContext } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { deepPurple, grey } from "@material-ui/core/colors";

const Theme = createContext();
const changeTheme = createContext();

export function useMyTheme() {
  return [useContext(Theme), useContext(changeTheme)];
}

export default function ThemeProvider({ children }) {
  const [darkTheme, setDarkTheme] = useState(true);

  const theme = createMuiTheme({
    palette: {
      type: darkTheme ? "dark" : "light",
      primary: {
        main: grey[500],
      },
      secondary: {
        main: deepPurple[500],
      },
    },
    typography: {
      // Use the system font.
      // fontSize: 12,
      fontFamily: "Fira Code",
      "@media (min-width:600px)": {
        fontSize: "1.5rem",
      },
    },
    overrides: {
      MuiSlider: {
        thumb: {
          color: "grey",
        },
        track: {
          color: "green",
        },
        rail: {
          color: "grey",
        },
      },
    },
  });

  theme.typography.h5 = {
    fontSize: "0.67rem",
    fontFamily: "Fira Code",
    fontWeight: 200,
    "@media (min-width:600px)": {
      fontSize: "0.4rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.2rem",
      fontFamily: "Fira Code",
      fontWeight: 100,
    },
  };

  theme.typography.body1 = {
    fontSize: "0.62rem",
    fontFamily: "Fira Code",
    fontWeight: 100,
    "@media (min-width:600px)": {
      fontSize: "0.4rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "0.9rem",
      fontFamily: "Fira Code",
      fontWeight: 100,
    },
  };

  // children is a special property of React components which contains any
  // child elements defined within the component and they don’t know
  // their children exactly ahead of time.

  return (
    <Theme.Provider value={darkTheme}>
      <changeTheme.Provider value={setDarkTheme}>
        <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
      </changeTheme.Provider>
    </Theme.Provider>
  );
}
