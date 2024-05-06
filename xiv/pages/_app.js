// import { ThemeProvider } from "next-themes";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "animate.css";
import "tailwindcss/tailwind.css";
import "../styles/fonts.css";
import "../styles/global.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline enableColorScheme />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
