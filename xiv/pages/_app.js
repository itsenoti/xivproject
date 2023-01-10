import { ThemeProvider } from "next-themes";

import "../styles/fonts.css";
import "../styles/globals.css";

// Do not call styles/globals_old.css in this file, else themeswitcher wont work

export default function App({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
