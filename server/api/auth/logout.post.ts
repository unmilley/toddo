import { REFRESH_TOKEN } from '~/src/runtimeConfig'

export default defineEventHandler(async (event) => {
  deleteCookie(event, REFRESH_TOKEN)
  return {
    statusCode: 200,
    message: 'Logout successful',
  }
})
