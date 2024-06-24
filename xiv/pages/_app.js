// import { ThemeProvider } from "next-themes";

import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
import "animate.css";
import { Poppins } from "next/font/google";
import { createContext, useContext } from "react";
import "tailwindcss/tailwind.css";
import "../styles/fonts.css";
import "../styles/global.css";

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
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
