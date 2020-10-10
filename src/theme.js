import React, { createContext, useState, useContext } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { deepPurple, grey } from "@material-ui/core/colors";

const Theme = createContext();
const changeTheme = createContext();

export function useMyTheme() {
  return [useContext(Theme), useContext(changeTheme)];
}

export default function ThemeProvider({ children }) {
  const [darkTheme, setDarkTheme] = useState(false);

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
      fontSize: 12,
      fontFamily: "Balsamiq Sans",
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

  return (
    <Theme.Provider value={darkTheme}>
      <changeTheme.Provider value={setDarkTheme}>
        <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
      </changeTheme.Provider>
    </Theme.Provider>
  );
}
