import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B1020",
        panel: "#111827",
        violet: "#635BFF",
        aqua: "#3DD9C5"
      }
    },
  },
  plugins: [],
};
export default config;
