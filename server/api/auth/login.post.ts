import { getAuth } from 'firebase-admin/auth'
import { defineFirebaseAdmin, getUser } from '~/server/utils/firebaseAdmin'
import { REFRESH_TOKEN } from '~/src/runtimeConfig'

export default defineEventHandler(async (event) => {
  defineFirebaseAdmin(event)

  const { token } = await readBody<{ token: string }>(event)
  const expiresIn = 432e5 // 60 * 60 * 24 * 5 * 1000
  const config = useRuntimeConfig(event)
  const secure = config.public.nodeEnv === 'production'

  try {
    const options = {
      maxAge: expiresIn,
      httpOnly: true,
      secure,
    }
    const authCookie = await getAuth().createSessionCookie(token, { expiresIn })
    setCookie(event, REFRESH_TOKEN, authCookie, options)
    const { sub: uid } = await getUser(event, 'sub')
    return uid
  } catch (error) {
    console.log('error: ', error)
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
})
