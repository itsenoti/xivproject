"use client";

import { Head, Html, Main, NextScript } from "next/document";
import { poppins } from "../public/fonts/fonts";

export default function Document() {
  return (
    <Html lang="en" className={poppins.className}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
