import { ThemeProvider } from "next-themes";

import "../styles/styles.css";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
