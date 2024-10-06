export default defineEventHandler(async (event) => {
  deleteCookie(event, 'Authorization')
  return {
    statusCode: 200,
    message: 'Logout successful',
  }
})
