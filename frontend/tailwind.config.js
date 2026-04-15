/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#1e40af',
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        'slate': {
          '950': '#0a0e27'
        }
      },
      keyframes: {
        typing: {
          '0%, 60%, 100%': {
            opacity: '0.3',
            transform: 'translateY(0)',
          },
          '30%': {
            opacity: '1',
            transform: 'translateY(-10px)',
          },
        },
        slideIn: {
          from: {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        blob: {
          '0%, 100%': {
            transform: 'translate(0, 0) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
        },
        shake: {
          '0%, 100%': {
            transform: 'translateX(0)',
          },
          '10%, 30%, 50%, 70%, 90%': {
            transform: 'translateX(-2px)',
          },
          '20%, 40%, 60%, 80%': {
            transform: 'translateX(2px)',
          },
        },
      },
      animation: {
        typing: 'typing 1.4s infinite',
        slideIn: 'slideIn 0.3s ease',
        blob: 'blob 7s infinite',
        shake: 'shake 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
}

