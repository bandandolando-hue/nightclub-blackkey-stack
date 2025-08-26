import type { Config } from "tailwindcss";
const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { accent: "hsl(120, 100%, 50%)" },
      fontFamily: { mono: ["ui-monospace","SFMono-Regular","Menlo","Monaco","Consolas","monospace"] }
    }
  },
  plugins: []
};
export default config;
