/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Sage / "билки и пазар" палитра - умишлено различна от типичното SaaS синьо
        sage: {
          50: "#f3f7f4",
          100: "#e1ebe3",
          200: "#c3d7c8",
          300: "#9bbda3",
          400: "#6f9c7b",
          500: "#4c7a5e", // primary
          600: "#3c624b",
          700: "#314f3d",
          800: "#283f32",
          900: "#22342a",
        },
        clay: {
          50: "#fdf3ee",
          100: "#fae1d5",
          300: "#e7ab87",
          500: "#c2733b", // accent за предупреждения/надхвърлен бюджет
          600: "#a85f2c",
          700: "#864a23",
        },
        ink: "#1f2a24",
        sand: "#faf8f3", // фон
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        soft: "0 2px 12px -2px rgba(31, 42, 36, 0.08)",
        card: "0 4px 20px -4px rgba(31, 42, 36, 0.10)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
