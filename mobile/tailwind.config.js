/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
extend: {
  colors: {
    primary: {
      DEFAULT: "#D4A24C",   // gold
      light: "#E6BE6A",
      dark: "#A97C2C",
      soft: "#F2D7A1",
    },

    background: {
      DEFAULT: "#0F0F10",   // main black
      light: "#1A1A1D",     // elevated bg
      dark: "#050506",      // deep black
    },

    surface: {
      DEFAULT: "#18181B",   // cards
      light: "#232326",
      dark: "#0C0C0E",
      card: "#1F1F23",
    },

    accent: {
      DEFAULT: "#2F5D50",   // subtle green from icon
      light: "#3E7A68",
      dark: "#1F3F36",
    },

    foreground: "#F5F5F5",
    "muted-foreground": "#A1A1AA",
    "subtle-foreground": "#71717A",
  },
}
  },
  plugins: [],
}