import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        dmSans: ['var(--font-dm-sans)'],
        inter: ['var(--font-inter)'],
        mPlus1: ['var(--font-m-plus-1)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'primary-base': '#6B4EFF',
        'border-base': '#2D3648',
        'text-dark': '#090A0A',
        'text-light': '#72777A',
        'text-error': '#FF0000',
      },
      screens: {
        sm: { min: '640px' },
        md: { min: '768px' },
        lg: { min: '1024px' },
        xl: { min: '1280px' },
        xxl: { min: '1512px' },
        fhd: { min: '1920px' },
      },
    },
  },
  plugins: [],
};
export default config;
