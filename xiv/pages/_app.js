// import { ThemeProvider } from "next-themes";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
import "animate.css";
import { createContext, useContext } from "react";
import "tailwindcss/tailwind.css";
import "../styles/fonts.css";
import "../styles/global.css";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App({ Component, pageProps }) {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline enableColorScheme />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
