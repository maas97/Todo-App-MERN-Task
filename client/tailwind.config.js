/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
    },
    colors: {
      primary: '#E78C3B',
      'primary-light': 'rgba(231, 140, 59, 0.25)',
      secondary: '#273D5D',
      'secondary-accent': '#3165AE',
      'secondary-light': 'rgba(49, 101, 174, 0.25)',
      dark: '#3D3D3D',
      'semi-dark': '#666666',
      bright: '#ffffff',
      'semi-bright': '#f5f5f5',
      error: '#EF4444',
    },
    boxShadow: {
      weak: '0px 2px 5px 0px rgba(0, 0, 0, 0.15)',
      medium: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
      strong: '0px 6.25px 6.25px 0px rgba(0, 0, 0, 0.25)',
    },
    borderRadius: {
      small: '4px',
      medium: '7px',
      large: '12px',
      xlarge: '40px',
      xxlarge: '50px',
      full: '50%',
    },
    extend: {
      keyframes: {
        reveal: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        reveal: 'reveal 2s ease-out infinite',
      },
    },
  },
  plugins: [],
};
