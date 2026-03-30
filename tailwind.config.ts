import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        popover: "hsl(var(--popover))",
        "popover-foreground": "hsl(var(--popover-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        destructive: "hsl(var(--destructive))",
        "destructive-foreground": "hsl(var(--destructive-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        "nuo-base": "#020617",
        "nuo-cyan": "#06b6d4",
        "nuo-magenta": "#d946ef",
        "nuo-slate": "#1e293b"
      },
      fontFamily: {
        display: ["var(--font-display)"],
        mono: ["var(--font-mono)"],
        heading: ["var(--font-space-grotesk)", "var(--font-display)", "system-ui", "sans-serif"]
      },
      boxShadow: {
        "nuo-cyan": "0 0 0 1px rgba(6,182,212,0.35), 0 0 24px rgba(6,182,212,0.35)",
        "nuo-magenta":
          "0 0 0 1px rgba(217,70,239,0.35), 0 0 24px rgba(217,70,239,0.35)"
      },
      backgroundImage: {
        "nuo-grid":
          "linear-gradient(to right, rgba(30,41,59,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(30,41,59,0.4) 1px, transparent 1px)",
        "nuo-radial":
          "radial-gradient(circle at 50% 50%, rgba(6,182,212,0.2), rgba(2,6,23,0.95) 52%)"
      }
    }
  },
  plugins: []
};

export default config;
