const path = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors : {
        darkestblue : `#15244A`,
        darkblue : `#18416C`,
        lightblue : `#8AD0EB`,
        darkcream : `#E1D3D0`,
        lightcream : `#F9DBD1`,
        lightestcream : `#F9E4DA`,
        lightestpurple : `#8E94B6`,
        lightpurplered : `#996C92`,
        darkpurplered : `#84375C`
      },
      fontFamily: {
        helvetica: ['HelveticaNeueCyr', 'sans-serif'],
      },
      fontWeight: {
        light: 100,
        roman: 200,
        medium: 500,
        bold: 700,
      }
    },
  },
  plugins: [],
}

