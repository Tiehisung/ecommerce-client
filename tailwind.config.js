/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryDark: "var(--primary-dark)",
        primColorDarkHover: "var(--prim-color-dark-hover)",

        

        outlineColor: "var(--outline-color)",
      },

      backgroundColor: {
        // Containers
        contbacklightgray1: "var(--cont-backlightgray1)",
        contbacklightgray2: "var(--cont-backlightgray2)",
        contBackwhite: "var(--cont-backwhite)",
        contBackblue: "var(--cont-backblue)",
        
        primaryTransDark: "var(--primary-trans-dark)",
        secondTransDark: "var(--second-trans-dark)",
        tertiaryTransDark: "var(--tertiary-trans-dark)",

        primaryViolet:'var(--primary-violet)',
        secondViolet:'var(--second-violet)',
        tertiaryViolet:'var(--tertiary-violet)',

        primaryGreen:'var(--primary-green)',
        secondGreen:'var(--second-green)',
        tertiaryGreen:'var(--tertiary-green)',
      },
      outlineColor: {
        inputOutlineColor: "var(--outline-color)",
        btnOutlineColor: "var(--btn-outline-color)",
      },
      placeholderColor: {
        placeholderColor1: "var(--placeholder-color1)",
        placeholderColor2: "var(--placeholder-color2)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
