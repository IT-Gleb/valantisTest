/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts,js,tsx}","./src/main.tsx","./src/index.html"],
  theme: {
    extend: {
      keyframes:{
        fromLeft:{
          "0%": {transform: "translateX(-800px)"},
        "100%": {transform: "translateX(0)"},
        }
      },
      animation:{
        abc: "fromLeft 0.3s linear",
      }
    },
  },
  plugins: [],
}

