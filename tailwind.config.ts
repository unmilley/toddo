import daisyui from 'daisyui'
import type { Config } from 'tailwindcss'

import themes from 'daisyui/src/theming/themes'

const dark = {
  ...themes.dracula,
}

const light = {
  ...themes.pastel,
}

export default <Partial<Config>>{
  content: [],
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
