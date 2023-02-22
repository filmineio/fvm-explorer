const { Container } = require("postcss");
const { range } = require("ramda");

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["pages/*.tsx", "pages/**/*.tsx", "src/ui/**/*.tsx"],
  theme: {
    container: {
      center: true,
    },
    borderRadius: {
      'small': '6px',
      'base': '9px',
    },
    letterSpacing: {
      tightest: '-.075em',
      tighter: '-.05em',
      tight: '-.025em',
      normal: '0',
      wide: '.025em',
      wider: '.0625em',
      widest: '.1em',
    },
    extend: {
      colors: {
        white: "#fff",
        yellow: "#D5FF64",
        lightgray: "#596184",
        green: "#13ce66",
        "gray-dark": "#141620",
        gray: "#8492a6",
        "gray-light": "#d3dce6",
        "gray-text": "#6E7191",
        yellowrgba: "rgba(213, 255, 100, 0.2);",
        bglight: " rgba(89, 97, 132, 0.2);",
        darckgry: "#EFF0F7",
        secect: "#292E42",
        analogous: "#B7006E",
        rgbaanalogous: "rgba(183, 0, 110, 0.3)",
        popupbg: "rgb(41 46 66 / 45%)",
        switchs: "#596184",
        Crusta: "#F89358",
        newdarck: "#D9DBE9",
        colorcod: "#FCFCFC",
      },

      fontSize: {
        sml: "13",
        sm: "14px",
        md: "32px",
      },
      minHeight: {
        sm: "50px",
        calc: "calc(100vh - 150px)",
      },
      maxWidth: {
        "2xl": "1440px",
        calc2: "calc(100% - 440px)",
        lg: "calc(100% - 120px)",
      },
      tablewidth: {
        tbw: "16%",
      },
      screens: {
        xs: { max: "420px" },
        sm: { max: "576px" },
        md: { max: "868px" },
        lg: { max: "924px" },
        xl: { max: "1024px" },
        "2xl": { max: "1336px" },
        "3xl": { max: "1920px" },
      },
    },
    fontFamily: {
      sans1: ["Archivo", "sans-serif"],
      mono1: ["IBM Plex Mono", "monospace"],
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
  breakpoints: {
    xs: "320px",
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
    "2xl": "1536px",
  },
};
