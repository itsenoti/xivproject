import { Paper } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { ThemeContext } from "../contexts/themeContext";

import "../styles/globals.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

export default function App({ Component, pageProps }) {
  const [isDarkMode, setDarkMode] = useState(true);
  return (
    <ThemeContext.Provider value={{ isDarkMode, setDarkMode }}>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <Paper>
          <Component {...pageProps} />
        </Paper>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
