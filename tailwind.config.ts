import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      colors: {
        brand: {
          50: '#f4f8ff',
          100: '#e9f0ff',
          200: '#cddfff',
          300: '#a9c6ff',
          400: '#6c9dff',
          500: '#3b82f6',
          600: '#2162d8',
          700: '#1b4fab',
          800: '#173f87',
          900: '#132f63',
          950: '#0f172a'
        }
      }
    }
  },
  plugins: []
};

export default config;
