/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      textColor: {
        gray: "#F1EFEE",
        primary: "#FAFAFA",
        secColor: "#efefef",
        navColor: "#BEBEBE",
      },
      keyframes: {
        "slide-in": {
          "0%": {
            "webkit-transform": "translateX(-200px)",
            transform: "translateX(-200px)",
          },
          "100%": {
            "webkit-transform": "translateX(0px)",
            transform: "translateX(0px)",
          },
        },
        "slide-fwd": {
          "0%": {
            "-webkit-transform": "translateZ(0px)",
            transform: "translateZ(0px)",
          },
          "100%": {
            "-webkit-transform": "translateZ(160px)",
            transform: "translateZ(160px)",
          },
        },
      },
      animation: {
        "slide-in": "slide-in 0.5s ease-out",
        "slide-fwd":
          " slide-fwd 0.45s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
      },
      backgroundColor: {
        'blackCover': 'rgba(0,0,0,0.7)'
      }
    },
  },
  plugins: [],
};
