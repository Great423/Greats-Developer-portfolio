/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // Typography identity: Orbitron for display and labels, Rajdhani for
    // reading text, Aldrich for figures.
    fontFamily: {
      primary: ["Orbitron", "ui-sans-serif", "system-ui", "sans-serif"],
      secondary: ["Rajdhani", "ui-sans-serif", "system-ui", "sans-serif"],
      tertiary: ["Aldrich", "ui-sans-serif", "system-ui", "sans-serif"],
    },
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", md: "2rem", xl: "2.5rem" },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },
    extend: {
      colors: {
        primary: "#0a0a0a",
        accent: "#B809C3",
        ink: {
          DEFAULT: "#0a0a0a",
          950: "#070609",
          900: "#0a0a0a",
          850: "#0f0d13",
          800: "#141119",
          700: "#1c1823",
        },
        brand: {
          blue: "#406aff",
          sky: "#42A6E3",
          violet: "#b936ee",
          magenta: "#B809C3",
          pink: "#FF56F6",
        },
      },
      // Fluid type scale. Display sizes clamp between phone and desktop.
      fontSize: {
        display: ["clamp(2.6rem, 1.6rem + 4.4vw, 5.25rem)", { lineHeight: "0.98", letterSpacing: "-0.015em" }],
        "display-sm": ["clamp(2.4rem, 1.5rem + 3.8vw, 4.5rem)", { lineHeight: "1", letterSpacing: "-0.015em" }],
        title: ["clamp(1.75rem, 1.3rem + 1.9vw, 2.75rem)", { lineHeight: "1.12", letterSpacing: "-0.01em" }],
        lead: ["clamp(1.15rem, 1.05rem + 0.45vw, 1.4rem)", { lineHeight: "1.55" }],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(100deg, #406aff 0%, #b936ee 52%, #FF56F6 100%)",
        "brand-gradient-wide":
          "linear-gradient(100deg, #406aff 0%, #b936ee 25%, #FF56F6 50%, #b936ee 75%, #406aff 100%)",
        "brand-ring": "conic-gradient(from 0deg, #406aff, #b936ee, #FF56F6, #42A6E3, #406aff)",
      },
      boxShadow: {
        glow: "0 18px 50px -18px rgba(185, 54, 238, 0.65)",
        "glow-sm": "0 10px 30px -12px rgba(255, 86, 246, 0.5)",
        frame: "0 40px 80px -40px rgba(0, 0, 0, 0.9)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        aurora: {
          "0%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "100%": { transform: "translate3d(6%, 4%, 0) scale(1.08)" },
        },
      },
      animation: {
        aurora: "aurora 26s ease-in-out infinite alternate",
        "aurora-slow": "aurora 34s ease-in-out -10s infinite alternate-reverse",
      },
    },
  },
  plugins: [],
};
