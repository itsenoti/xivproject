import { Head, Html, Main, NextScript } from "next/document";
import { poppins } from "../public/fonts/fonts.js";

export default function Document() {
  return (
    <Html lang="en" className={poppins.className}>
      <Head />
      <body sx={{ fontFamily: "Poppins" }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
