/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ground: "#121619",
        panel: "#1A2025",
        raised: "#212930",
        rule: "#2B343B",
        ink: "#E6EBEE",
        muted: "#93A1AC",
        faint: "#66737D",
        signal: "#3FD0C4",
        amber: "#F0A73A",
      },
      fontFamily: {
        display: ['"Archivo Variable"', '"Archivo"', "system-ui", "sans-serif"],
        sans: ['"IBM Plex Sans"', "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      maxWidth: { sheet: "76rem", prose: "38rem" },
    },
  },
  plugins: [],
};
