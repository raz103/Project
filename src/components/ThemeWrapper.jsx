import React, { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline, createMuiTheme } from "@material-ui/core";
import WbSunnyTwoToneIcon from "@material-ui/icons/WbSunnyTwoTone";
import Brightness2TwoToneIcon from "@material-ui/icons/Brightness2TwoTone";

const highZIndex = {
  zIndex: 999
};

const lightTheme = createMuiTheme({
  palette: {
    type: "light"
  }
});

const darkTheme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const ThemeWrapper = ({ children }) => {
  const { current: prefersDark } = useRef(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const [darkMode, setDarkMode] = useState(prefersDark);

  function toggleTheme() {
    setDarkMode((prev) => !prev);
  }

  // TODO: change toggler to look like the one on the redux-toolkit site:
  // https://redux-toolkit.js.org/api/createAsyncThunk

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <div
        className={"theme-toggle" + (darkMode ? " dark" : "")}
        onClick={toggleTheme}
        style={highZIndex}
      >
        <CSSTransition
          appear
          in={!darkMode}
          unmountOnExit
          timeout={0}
          classNames="light-mode"
        >
          <WbSunnyTwoToneIcon />
        </CSSTransition>
        <CSSTransition
          appear
          in={darkMode}
          unmountOnExit
          timeout={0}
          classNames="dark-mode"
        >
          <Brightness2TwoToneIcon />
        </CSSTransition>
      </div>
      {children}
    </ThemeProvider>
  );
};

export default ThemeWrapper;
