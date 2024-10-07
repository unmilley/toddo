// import { devServer } from './.temp/dev'
const devServer = { https: true }

import { pwa } from './src/pwa'
import { config } from './src/runtimeConfig'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true, telemetry: false, timeline: { enabled: false } },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon', '@vueuse/nuxt', '@nuxtjs/color-mode', '@vee-validate/nuxt'],
  tailwindcss: {
    cssPath: ['@/assets/css/tailwind.css', { injectPosition: 'first' }],
    configPath: '@/tailwind.config.ts',
    viewer: false,
  },
  colorMode: {
    preference: 'system',
    fallback: 'dark',
    classSuffix: '',
    dataValue: 'theme',
    storageKey: 'theme',
  },
  icon: {
    collections: ['bx', 'bxs'],
    mode: 'svg',
  },

  vite: { optimizeDeps: { exclude: ['vee-validate'] } },

  app: {
    head: {
      htmlAttrs: { dir: 'ltr', lang: 'ru' },
      link: [...pwa.link],
      meta: [...pwa.meta],
    },
  },

  runtimeConfig: {
    public: {
      fb: { ...config.public },
    },
    fbAdmin: { ...config.server },
  },

  devServer,
  ssr: false,
})
