import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: ['rounded-full', 'bg-gradient-blue-to-green'],
  theme: {
    extend: {
      fontFamily: {
        dmSans: ['var(--font-dm-sans)'],
        inter: ['var(--font-inter)'],
        mPlus1: ['var(--font-m-plus-1)'],
        notoSans: ['var(--font-noto-san-jp)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'btn-gradation': 'linear-gradient(90deg, #20FFFF 4.58%, #71FF6F 97.94%)',
      },
      colors: {
        'primary-base': '#6B4EFF',
        'border-base': '#2D3648',
        'text-dark': '#090A0A',
        'text-light': '#72777A',
        'text-error': '#FF0000',
        'main-text': '#333',
        'gray-1': '#777',
        'gray-2': '#aaa',
        'base-color': '#D5FFFF',
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
