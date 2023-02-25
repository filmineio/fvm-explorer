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
      'small': '2px',
      'base': '4px',
      "3": "3px",
      "6": "6px",
      "9": "9px"

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
        green: "#13ce66",
        gray: "#8492a6",
        "gray-light": "#d3dce6",
        "gray-text": "#6E7191",
        yellowrgba: "rgba(213, 255, 100, 0.2)",
        bglight: " rgba(89, 97, 132, 0.2)",
        darckgry: "#EFF0F7",
        analogous: "#B7006E",
        rgbaanalogous: "rgba(183, 0, 110, 0.3)",
        popupbg: "rgb(41 46 66 / 45%)",
        switchs: "#596184",
        Crusta: "#F89358",
        newdarck: "#D9DBE9",
        colorcod: "#FCFCFC",
        "body": "#292E42",
        "body_opacity-50": "#292E4280",
        "slate": "#141620",
        "label": "#596184",
        "label_opacity-30": "#5961844d",
        "blue-400": "#59A9FF",
        "blue-500": "#0576F0",
        "transparent": "rgba(0, 0, 0, 0)",
      },

      fontSize: {
        "pagination": ["13px", "22px"],
        "28": "28px",
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

      width: {
        "14/25": "56%",
        "11/25": "44%"
      },

      lineHeight: {
        "compact": "1.2"
      },

      margin: {
        "0.75": "3px",
        "1.25": "5px",
        "1.75": "7px",
        "2.25": "9px"
      },

      padding: {
        "0.75": "3px",
        "1.25": "5px",
        "1.75": "7px",
        "2.25": "9px",
        "2.75": "11px",
        "3.25": "13px",
        "3.75": "15px",
        "6.5": "28px"
      }
    },
    fontFamily: {
      roboto: ['Roboto Mono', "monospace"],
      space: ["Space Mono", "monospace"],
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
