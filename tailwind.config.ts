import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      /**
       * NUO “Premium Cyberpunk” — base #020617, primary glow cyan #06b6d4, innovation #d946ef.
       * Use `bg-nuo-base`, `text-nuo-cyan`, `shadow-nuo-cyan` / `shadow-nuo-magenta` for branded UI.
       */
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-space-grotesk)", "var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"]
      },
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
      boxShadow: {
        "nuo-cyan": "0 0 0 1px rgba(6,182,212,0.35), 0 0 24px rgba(6,182,212,0.35)",
        "nuo-magenta":
          "0 0 0 1px rgba(217,70,239,0.35), 0 0 24px rgba(217,70,239,0.35)",
        "nuo-node-core":
          "0 0 60px 20px rgba(6,182,212,0.35), 0 0 120px 40px rgba(217,70,239,0.12), inset 0 0 40px rgba(6,182,212,0.15)"
      },
      backgroundImage: {
        "nuo-grid":
          "linear-gradient(to right, rgba(30,41,59,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(30,41,59,0.4) 1px, transparent 1px)",
        "nuo-radial":
          "radial-gradient(circle at 50% 50%, rgba(6,182,212,0.2), rgba(2,6,23,0.95) 52%)"
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        },
        "nuo-orbit": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" }
        },
        "nuo-float": {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-6px) scale(1.02)" }
        },
        "nuo-ring-pulse": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.03)" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "nuo-orbit": "nuo-orbit 32s linear infinite",
        "nuo-orbit-slow": "nuo-orbit 48s linear infinite reverse",
        "nuo-float": "nuo-float 5s ease-in-out infinite",
        "nuo-ring-pulse": "nuo-ring-pulse 3.5s ease-in-out infinite"
      }
    }
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/container-queries")]
};

export default config;
