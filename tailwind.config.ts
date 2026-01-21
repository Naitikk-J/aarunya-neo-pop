import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
      fontFamily: {
        display: ['"Press Start 2P"', 'monospace'],
        body: ['"Space Grotesk"', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Retro Carnival colors
        carnival: {
          golden: "hsl(var(--golden-yellow))",
          navy: "hsl(var(--deep-navy))",
          orange: "hsl(var(--warm-orange))",
          teal: "hsl(var(--soft-teal))",
          coral: "hsl(var(--sunset-coral))",
          purple: "hsl(var(--dream-purple))",
          cream: "hsl(var(--cream-white))",
          charcoal: "hsl(var(--charcoal-dark))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-neon": {
          "0%, 100%": { 
            opacity: "1",
            filter: "brightness(1)",
          },
          "50%": { 
            opacity: "0.8",
            filter: "brightness(1.2)",
          },
        },
        "bounce-in": {
          "0%": { transform: "scale(0)", opacity: "0" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "shake": {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-5px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(5px)" },
        },
        "tv-flicker": {
          "0%": { opacity: "1" },
          "3%": { opacity: "0.8" },
          "6%": { opacity: "1" },
          "7%": { opacity: "0.9" },
          "8%": { opacity: "1" },
          "9%": { opacity: "0.7" },
          "10%": { opacity: "1" },
          "100%": { opacity: "1" },
        },
        "color-shift": {
          "0%": { filter: "hue-rotate(0deg)" },
          "100%": { filter: "hue-rotate(360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-neon": "pulse-neon 2s ease-in-out infinite",
        "bounce-in": "bounce-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        "shake": "shake 0.5s ease-in-out",
        "tv-flicker": "tv-flicker 4s infinite",
        "color-shift": "color-shift 10s linear infinite",
      },
      boxShadow: {
        "retro": "6px 6px 0px hsl(217 33% 15%)",
        "retro-lg": "12px 12px 0px hsl(217 33% 15%)",
        "carnival-gold": "0 0 30px hsl(42 100% 55% / 0.6), 0 0 60px hsl(42 100% 55% / 0.3)",
        "carnival-orange": "0 0 30px hsl(28 100% 50% / 0.6), 0 0 60px hsl(28 100% 50% / 0.3)",
        "carnival-teal": "0 0 30px hsl(180 40% 50% / 0.5), 0 0 60px hsl(180 40% 50% / 0.3)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
