import type { NuxtAppConfig } from 'nuxt/schema'

export const pwa: NuxtAppConfig['head'] = {
  link: [
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' },
    { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon/favicon-96x96.png' },
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon/favicon.svg' },
    { rel: 'manifest', href: '/favicon/site.webmanifest' },
    { rel: 'shortcut icon', href: '/favicon/favicon.ico' },
  ],
  meta: [
    { name: 'apple-mobile-web-app-title', content: 'Toddo' },
    { name: 'application-name', content: 'Toddo' },
    { name: 'msapplication-Config', content: '/favicon/browserconfig.xml' },
    { name: 'msapplication-TileColor', content: '#1E1E1E', media: '(prefers-color-scheme: dark)' },
    { name: 'msapplication-TileColor', content: '#ffffff', media: '(prefers-color-scheme: light)' },
    { name: 'theme-color', content: '#1E1E1E', media: '(prefers-color-scheme: dark)' },
    { name: 'theme-color', content: '#ffffff', media: '(prefers-color-scheme: light)' },
  ],
}
