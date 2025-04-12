/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    // Reference theme colors defined in _root.scss
    colors: {
      ...Object.fromEntries(
        ['blue', 'purple', 'orange', 'yellow', 'green', 'red', 'gray', 'shade'].map((color) => [
          color,
          Object.fromEntries(
            [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((value) => [value, `var(--${color}-${value})`]),
          ),
        ]),
      ),
      'text-secondary': 'var(--text-secondary)',
      'bg-neutral-accent': 'var(--bg-neutral-accent)',
      'brand-light': 'var(--brand-light)',
      brand: 'var(--brand)',
      white: 'white',
      stone: {
        50: 'var(--novel-stone-50)',
        100: 'var(--novel-stone-100)',
        200: 'var(--novel-stone-200)',
        300: 'var(--novel-stone-300)',
        400: 'var(--novel-stone-400)',
        500: 'var(--novel-stone-500)',
        600: 'var(--novel-stone-600)',
        700: 'var(--novel-stone-700)',
        800: 'var(--novel-stone-800)',
        900: 'var(--novel-stone-900)',
      },
    },

    // Reference theme spacing values defined in _root.scss
    spacing: Object.fromEntries(
      [0, 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128].map((value) => [value, `var(--space-${value})`]),
    ),

    // Reference font size values defined in _root.scss
    fontSize: Object.fromEntries(
      ['050', 100, 275, 300, 325, 350, 400, 500, 600, 750, 800, 900, 1000, 1200].map((value) => [
        value,
        `var(--size-${value})`,
      ]),
    ),

    // Reference font weigh values defined in _root.scss
    fontWeight: Object.fromEntries(
      ['regular', 'medium', 'semibold', 'bold'].map((value) => [value, `var(--weight-${value})`]),
    ),

    extend: {},

    animation: {
      wiggle: 'wiggle 0.5s ease-in-out 1',
    },
    keyframes: {
      wiggle: {
        '0%, 100%': { transform: 'scale(1)' },
        '50%': { transform: 'scale(1.15)' },
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('tailwindcss-animate')],
};