export const useUnState = () => {
  const localSetting = useCookie('LOCAL_SETTINGS', {
    expires: new Date(+new Date() + 99e9),
    default: () => ({ isHiddenIdTasks: false, switchOndblclick: true, compactAction: false, showUncompleted: false }),
  })

  const isLoggedIn = useState('loginState', () => false)

  return { localSetting, isLoggedIn }
}
