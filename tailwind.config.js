/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        gaegu: ['"Gaegu"', "cursive", "sans-serif"],
      },
      colors: {
        // ── Faded Summer / Scrapbook palette ───────────
        'letter-bg':      '#F5EDD8',
        'letter-ink':     '#3B2A1A',
        'parchment':      '#F5EDD8',
        'envelope-cream': '#E8D5B0',
        'envelope-brown': '#8B6914',
        'cloud-gray':     '#9BA5B0',
        'cloud-dark':     '#6B7A87',
        'scrapbook-bg':   '#2C2318',
        'warm-cream':     '#E8D5B0',
        'warm-gold':      '#F4A045',
        // ── Cherry Rose (backward compat) ──────────────
        'cherry-rose':      '#C62A6E',
        'cherry-rose-dark': '#9B1F53',
        'cherry-rose-light':'#F2668B',
        'cherry-rose-pale': '#FFE4EE',
        'cherry-rose-blush':'#FFD0E2',
        'soft-red':         '#C62A6E',
        'blush-pink':       '#FFE4EE',
        'paper-white':      '#FFF8FB',
      },
      animation: {
        'float':        'float 6s ease-in-out infinite',
        'float-slow':   'float 8s ease-in-out infinite',
        'pulse-soft':   'pulse-soft 3s infinite',
        'spin-slow':    'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-15px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}
