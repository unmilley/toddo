import daisyui from 'daisyui'
import type { Config } from 'tailwindcss'

import themes from 'daisyui/src/theming/themes'
import type { Theme } from './types'

const dark: Theme = {
  ...themes.dark,
  primary: '#FBD38D',
  'base-100': '#202023',
  'base-200': '#1F1F21',
  'base-300': '#1C1C1E',
  neutral: '#a6adbb',
  'neutral-content': '#202023',
}

const light: Theme = {
  primary: '#4A90E2',
  'primary-content': '#FFFFFF',
  secondary: '#50E3C2',
  'secondary-content': '#FFFFFF',
  accent: '#FFB74D',
  'accent-content': '#1F2937',
  neutral: '#6B7280',
  'neutral-content': '#1F2937',
  'base-100': '#FFFFFF',
  'base-200': '#F7F7F7',
  'base-300': '#F1F1F1',
  'base-content': '#1F2937',
  info: '#3B82F6',
  'info-content': '#FFFFFF',
  success: '#4CAF50',
  'success-content': '#FFFFFF',
  warning: '#FF9800',
  'warning-content': '#FFFFFF',
  error: '#F44336',
  'error-content': '#FFFFFF',
}

export default <Partial<Config>>{
  content: ['./components/**/*.vue', './layouts/**/*.vue', './pages/**/*.vue', './app.vue'],
  darkMode: ['class', 'data-theme'],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [{ dark, light }],
    darkTheme: 'dark',
    base: true,
    styled: true,
    utils: true,
    prefix: '',
    logs: false,
    themeRoot: ':root',
  },
}
