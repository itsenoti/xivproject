import { ThemeProvider } from "next-themes";
import { createGlobalStyle } from "styled-components";

import "../styles/fonts.css";
import "../styles/globals.css";

// Do not call styles/globals_old.css in this file, else themeswitcher wont work

const GlobalStyle = createGlobalStyle`
  [data-theme="light"] {
    color: var(--light-color);
    background-color: var(--light-bg);
  }

  [data-theme="dark"] {
    --fg: #fff;
    --bg: #000;
  }

  p.MuiTypography-root.MuiTypography-body2.MuiListItemText-secondary {
    font-size: 0.6rem;
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
