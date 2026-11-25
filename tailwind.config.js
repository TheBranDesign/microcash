/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        royal: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#1D4ED8',
          700: '#1E40AF',
          800: '#1E3A8A',
        },
        turquoise: {
          50: '#ECFEFF',
          100: '#CFFAFE',
          400: '#22D3EE',
          500: '#06B6D4',
          600: '#0891B2',
        },
        skyaccent: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          400: '#38BDF8',
          500: '#0EA5E9',
        },
        navy: '#0F172A',
        charcoal: '#334155',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'fintech': '0 10px 30px -10px rgba(29, 78, 216, 0.12), 0 4px 12px -4px rgba(15, 23, 42, 0.04)',
        'fintech-lg': '0 20px 45px -12px rgba(29, 78, 216, 0.18), 0 8px 20px -6px rgba(6, 182, 212, 0.10)',
        'card': '0 2px 12px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.03)',
      },
    },
  },
  plugins: [],
};
