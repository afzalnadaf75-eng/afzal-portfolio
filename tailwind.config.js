/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          darkest: '#050505',
          dark: '#0A0A0A',
          surface: '#111118',
          card: '#14141F',
          border: 'rgba(255, 255, 255, 0.08)',
          hover: 'rgba(255, 255, 255, 0.12)',
        },
        violet: {
          accent: '#9B5CFF',
          glow: 'rgba(155, 92, 255, 0.35)',
          muted: 'rgba(155, 92, 255, 0.15)',
        },
        cyan: {
          accent: '#42D9FF',
          glow: 'rgba(66, 217, 255, 0.35)',
          muted: 'rgba(66, 217, 255, 0.15)',
        },
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"Cabinet Grotesk"', '"Space Grotesk"', 'sans-serif'],
      },
      boxShadow: {
        'glow-violet': '0 0 30px -5px rgba(155, 92, 255, 0.4)',
        'glow-cyan': '0 0 30px -5px rgba(66, 217, 255, 0.4)',
        'glow-subtle': '0 0 20px 0 rgba(255, 255, 255, 0.05)',
        'cosmic-card': '0 8px 32px 0 rgba(0, 0, 0, 0.7), inset 0 1px 0 0 rgba(255, 255, 255, 0.06)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
