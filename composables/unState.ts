export const useUnState = () => {
  const isLoggedIn = useState('loginState', () => false)

  return { isLoggedIn }
}
