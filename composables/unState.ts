import { breakpointsTailwind } from '@vueuse/core'
import type { DB } from '~/shared/types'

type LocalData = {
  projects: DB.Collections[]
  todoIndexes: string[]
}

export const useUnState = () => {
  const localSetting = useCookie('LOCAL_SETTINGS', {
    expires: new Date(+new Date() + 99e9),
    default: () => ({ isAsideFull: true }),
  })

  const localData = useCookie<LocalData>('LOCAL_DATA', {
    expires: new Date(+new Date() + 99e9),
    default: () => ({ projects: [], todoIndexes: [] }),
  })

  const breakpoints = useBreakpoints(breakpointsTailwind)
  const isMobile = breakpoints.smaller('md')

  const localDataGroupsPath = computed(() => localData.value.projects.filter(Boolean).map(({ path }) => path))

  const isLoggedIn = useState('loginState', () => false)

  return { localSetting, isLoggedIn, localData, localDataGroupsPath, isMobile }
}
