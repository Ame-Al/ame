import type { Config } from 'tailwindcss'

export default {
  darkMode: ['variant', '&:where(.dark, .dark *):not(:where(.light, .light *))'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '../sim/app/(landing)/**/*.{js,ts,jsx,tsx,mdx}',
    '../sim/components/**/*.{js,ts,jsx,tsx,mdx}',
    '../sim/lib/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/emcn/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        season: ['var(--font-season)'],
      },
      spacing: {
        px: 'var(--border-width)',
      },
      borderWidth: {
        DEFAULT: 'var(--border-width)',
      },
      colors: {
        border: 'var(--border)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config
