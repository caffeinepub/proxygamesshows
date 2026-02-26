/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        background: 'oklch(var(--background) / <alpha-value>)',
        foreground: 'oklch(var(--foreground) / <alpha-value>)',
        card: {
          DEFAULT: 'oklch(var(--card) / <alpha-value>)',
          foreground: 'oklch(var(--card-foreground) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'oklch(var(--popover) / <alpha-value>)',
          foreground: 'oklch(var(--popover-foreground) / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'oklch(var(--primary) / <alpha-value>)',
          foreground: 'oklch(var(--primary-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'oklch(var(--secondary) / <alpha-value>)',
          foreground: 'oklch(var(--secondary-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'oklch(var(--muted) / <alpha-value>)',
          foreground: 'oklch(var(--muted-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
          foreground: 'oklch(var(--accent-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'oklch(var(--destructive) / <alpha-value>)',
          foreground: 'oklch(var(--destructive-foreground) / <alpha-value>)',
        },
        border: 'oklch(var(--border) / <alpha-value>)',
        input: 'oklch(var(--input) / <alpha-value>)',
        ring: 'oklch(var(--ring) / <alpha-value>)',
        'nav-bg': 'oklch(var(--nav-bg) / <alpha-value>)',
        'neon-blue':   'oklch(var(--neon-blue) / <alpha-value>)',
        'neon-green':  'oklch(var(--neon-green) / <alpha-value>)',
        'neon-cyan':   'oklch(var(--neon-cyan) / <alpha-value>)',
        'neon-purple': 'oklch(var(--neon-purple) / <alpha-value>)',
        'neon-pink':   'oklch(var(--neon-pink) / <alpha-value>)',
        'neon-orange': 'oklch(var(--neon-orange) / <alpha-value>)',
        'neon-yellow': 'oklch(var(--neon-yellow) / <alpha-value>)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'glow-blue-sm':  '0 0 8px 0 oklch(0.82 0.20 220 / 0.5)',
        'glow-blue-md':  '0 0 16px 0 oklch(0.82 0.20 220 / 0.4)',
        'glow-blue-lg':  '0 0 32px 0 oklch(0.82 0.20 220 / 0.35)',
        'glow-green-sm': '0 0 8px 0 oklch(0.82 0.20 220 / 0.5)',
        'glow-green-md': '0 0 16px 0 oklch(0.82 0.20 220 / 0.4)',
        'glow-green-lg': '0 0 32px 0 oklch(0.82 0.20 220 / 0.35)',
        'glow-cyan-sm':  '0 0 8px 0 oklch(0.85 0.18 195 / 0.4)',
        'glow-cyan-md':  '0 0 16px 0 oklch(0.85 0.18 195 / 0.35)',
        'glow-cyan-lg':  '0 0 32px 0 oklch(0.85 0.18 195 / 0.3)',
        'glow-purple-sm':'0 0 8px 0 oklch(0.72 0.22 290 / 0.4)',
        'glow-purple-md':'0 0 16px 0 oklch(0.72 0.22 290 / 0.35)',
        'glow-purple-lg':'0 0 32px 0 oklch(0.72 0.22 290 / 0.3)',
        'glow-pink-sm':  '0 0 8px 0 oklch(0.72 0.28 340 / 0.4)',
        'glow-pink-md':  '0 0 16px 0 oklch(0.72 0.28 340 / 0.35)',
        'glow-pink-lg':  '0 0 32px 0 oklch(0.72 0.28 340 / 0.3)',
        'glow-orange-sm':'0 0 8px 0 oklch(0.75 0.22 55 / 0.4)',
        'glow-orange-md':'0 0 16px 0 oklch(0.75 0.22 55 / 0.35)',
        'glow-orange-lg':'0 0 32px 0 oklch(0.75 0.22 55 / 0.3)',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse at 50% 0%, oklch(0.20 0.06 220 / 0.4) 0%, oklch(0.12 0.018 330) 70%)',
        'grid-pattern': 'linear-gradient(oklch(0.82 0.20 220 / 0.04) 1px, transparent 1px), linear-gradient(90deg, oklch(0.82 0.20 220 / 0.04) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
};
