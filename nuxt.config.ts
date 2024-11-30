import { devServer } from './.temp/dev'
// const devServer = { https: true }
import { pwa } from './src/pwa'
import { config } from './src/runtimeConfig'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true, telemetry: false, timeline: { enabled: false } },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@vee-validate/nuxt',
    'vue-sonner/nuxt',
    '@nuxtjs/seo',
  ],
  tailwindcss: {
    cssPath: ['@/assets/css/tailwind.css', { injectPosition: 'first' }],
    configPath: '@/tailwind.config.ts',
    viewer: false,
  },

  veeValidate: {
    autoImports: true,
    typedSchemaPackage: 'zod',
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
    customCollections: [
      { prefix: 'mill', dir: './assets/icons/mill' },
      { prefix: 't', dir: './assets/icons/common' },
    ],
  },

  app: {
    head: {
      htmlAttrs: { dir: 'ltr', lang: 'ru' },
      titleTemplate: '%s %separator %siteName',
      link: [...pwa.link],
      meta: [...pwa.meta],
    },
  },

  runtimeConfig: { ...config },

  vite: { optimizeDeps: { exclude: ['vee-validate'] } },
  build: { transpile: ['@vuepic/vue-datepicker'] },
  devServer: devServer,

  imports: { dirs: ['./shared/types'] },
  nitro: { imports: { dirs: ['shared/types'] } },
})
