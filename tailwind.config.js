/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,css}",
    "./src/*.html",
    "./src/script.js"
  ],
  theme: {
    extend: {
      animation: {
        'deal-card': 'dealCard 0.8s ease-out forwards',
      },
      keyframes: {
        dealCard: {
          '0%': { 
            transform: 'translateY(100vh) rotate(0deg)',
            opacity: '0'
          },
          '100%': { 
            transform: 'translateY(0) rotate(var(--rotation))',
            opacity: '1'
          }
        }
      }
    },
  },
  plugins: [],
}