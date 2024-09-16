import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        destructive: "var(--destructive)",
        "destructive-foreground": "var(--destructive-foreground)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
      },
      fontFamily: {
        poppinsExtraLight: "Poppins-ExtraLight",
        poppinsLight: "Poppins-Light",
        poppinsThin: "Poppins-thin",
        poppinsMedium: "Poppins-Medium",
        poppinsRegular: "Poppins-Regular",
        poppinsSemiBold: "Poppins-SemiBold",
        poppinsBold: "Poppins-Bold",
        poppinsExtraBold: "Poppins-ExtraBold",
        facundoExtraLight: "Facundo-ExtraLight",
        facundoLight: "Facundo-Light",
        facundoThin: "Facundo-thin",
        facundoRegular: "Facundo-Regular",
        facundoSemiBold: "Facundo-SemiBold",
        facundoBold: "Facundo-Bold",
      },
      screens: {
        sm: { min: "310px", max: "467px" },
        md: { min: "468px", max: "1023px" },
        lg: { min: "1024px", max: "1279px" },
        xl: { min: "1280px", max: "1439px" },
        "2xl": { min: "1440px", max: "1599px" },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
