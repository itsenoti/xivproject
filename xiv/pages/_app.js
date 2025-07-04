import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
import "animate.css";
import { createContext, useContext } from "react";
import "../styles/fonts.css";
import "../styles/global.css";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

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
        <div className={poppins.className}>
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </>
  );
}
