// import { env } from 'node:process'

export const config = {
  public: {
    firebase: {
      apiKey: process.env.NUXT_PUBLIC_FB_APIKEY,
      authDomain: process.env.NUXT_PUBLIC_FB_AUTHDOMAIN,
      projectId: process.env.NUXT_PUBLIC_FB_PROJECTID,
      storageBucket: process.env.NUXT_PUBLIC_FB_STORAGEBUCKET,
      messagingSenderId: process.env.NUXT_PUBLIC_FB_MESSAGINGSENDERID,
      appId: process.env.NUXT_PUBLIC_FB_APPID,
      databaseURL: process.env.NUXT_PUBLIC_FB_DATABASE_URL,
    },
    nodeEnv: process.env.NUXT_PUBLIC_NODE_ENV ?? 'development',
    appVersion: process.env.npm_package_version,
  },
  firebaseServer: {
    type: process.env.NUXT_FB_TYPE,
    project_id: process.env.NUXT_FB_PROJECT_ID,
    private_key_id: process.env.NUXT_FB_PRIVATE_KEY_ID,
    private_key: process.env.NUXT_FB_PRIVATE_KEY,
    client_email: process.env.NUXT_FB_CLIENT_EMAIL,
    client_id: process.env.NUXT_FB_CLIENT_ID,
    auth_uri: process.env.NUXT_FB_AUTH_URI,
    token_uri: process.env.NUXT_FB_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.NUXT_FB_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.NUXT_FB_CLIENT_X509_CERT_URL,
    universe_domain: process.env.NUXT_FB_UNIVERSE_DOMAIN,
  },
}

export const REFRESH_TOKEN = 'ref.tn'
export const expiresIn = 432e5 // 60 * 60 * 24 * 5 * 1000
