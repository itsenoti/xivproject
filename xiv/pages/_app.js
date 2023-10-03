// import { ThemeProvider } from "next-themes";

import "animate.css";
import "tailwindcss/tailwind.css";
import "../styles/fonts.css";
import "../styles/global.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* <ThemeProvider> */}
      <Component {...pageProps} />
      {/* </ThemeProvider> */}
    </>
  );
}
