export default defineNuxtRouteMiddleware((to, from) => {
  const isLoggedIn = useState('loginState', () => false)

  if (import.meta.server) {
    const authCookie = useCookie('Authorization')
    isLoggedIn.value = authCookie.value ? true : false
    if (!authCookie.value) return navigateTo('/', { redirectCode: 401 })
  } else {
    const { user } = useAuth()
    if (!user.value) return navigateTo('/', { redirectCode: 401 })
  }
})
