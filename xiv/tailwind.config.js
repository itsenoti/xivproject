/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  prefix: "tw-",
  content: ["./pages/*/*.js}", "./pages/maps/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  style: {
    postcss: {
      plugins: [require("tailwindcss")("./src/tailwind.config.js"), require("autoprefixer")],
    },
  },
};
