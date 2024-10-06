import { env } from 'node:process'

export const config = {
  public: {
    apiKey: env.NUXT_PUBLIC_FB_APIKEY,
    authDomain: env.NUXT_PUBLIC_FB_AUTHDOMAIN,
    projectId: env.NUXT_PUBLIC_FB_PROJECTID,
    storageBucket: env.NUXT_PUBLIC_FB_STORAGEBUCKET,
    messagingSenderId: env.NUXT_PUBLIC_FB_MESSAGINGSENDERID,
    appId: env.NUXT_PUBLIC_FB_APPID,
    databaseURL: env.NUXT_PUBLIC_FB_DATABASE_URL,
  },
  server: {
    type: env.NUXT_FB_TYPE,
    project_id: env.NUXT_FB_PROJECT_ID,
    private_key_id: env.NUXT_FB_PRIVATE_KEY_ID,
    private_key: env.NUXT_FB_PRIVATE_KEY,
    client_email: env.NUXT_FB_CLIENT_EMAIL,
    client_id: env.NUXT_FB_CLIENT_ID,
    auth_uri: env.NUXT_FB_AUTH_URI,
    token_uri: env.NUXT_FB_TOKEN_URI,
    auth_provider_x509_cert_url: env.NUXT_FB_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: env.NUXT_FB_CLIENT_X509_CERT_URL,
    universe_domain: env.NUXT_FB_UNIVERSE_DOMAIN,
  },
}
