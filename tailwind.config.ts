import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'rounded-full',
    'pl-[2px]',
    'pl-[6px]',
    'pt-[2px]',
    'pt-[6px]',
    'top-[-2px]',
    'top-[-6px]',
    'left-[-2px]',
    'left-[-6px]',
    'border-[#333]',
  ],
  theme: {
    extend: {
      fontFamily: {
        dmSans: ['var(--font-dm-sans)'],
        inter: ['var(--font-inter)'],
        mPlus1: ['var(--font-m-plus-1)'],
        notoSans: ['var(--font-noto-san-jp)'],
        montserrat: ['var(--font-montserrat)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'btn-gradation': 'linear-gradient(90deg, #20FFFF 4.58%, #71FF6F 97.94%)',
        'campaign-detail-bg-1':
          'linear-gradient(2deg, rgba(160, 255, 158, 0.50) 1.61%, rgba(166, 255, 255, 0.50) 98.38%)',
        'completion-task': 'linear-gradient(0deg, #FFF4EA 0%, #FFF4EA 100%)',
      },
      listStyleType: {
        square: 'square',
        roman: 'upper-roman',
        'lower-alpha': 'lower-alpha',
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
        xxl: { min: '1440px' },
        fhd: { min: '1920px' },
        'mb-h': { raw: '(max-height: 767px)' },
      },
    },
  },
  plugins: [],
};
export default config;
