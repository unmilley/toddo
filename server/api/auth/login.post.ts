import { getAuth } from 'firebase-admin/auth'

export default defineEventHandler(async (event) => {
  defineFirebaseAdmin(event)

  const { token } = await readBody<{ token: string }>(event)
  const expiresIn = 432e5 // 60 * 60 * 24 * 5 * 1000

  try {
    const options = {
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    }
    const authCookie = await getAuth().createSessionCookie(token, { expiresIn })
    setCookie(event, 'Authorization', authCookie, options)
    return {
      statusCode: 200,
      message: 'Auth successful',
    }
  } catch (error) {
    console.log('error: ', error)
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
})
