import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default defineNuxtPlugin(async () => {
  useFirebase()
  const auth = getAuth()
  const { user } = useAuth()
  const { localData } = useUnState()
  onAuthStateChanged(auth, async (userDetails) => {
    if (!userDetails) user.value = null
    else {
      const projects = await $fetch('/api/user/projects')
      user.value = userDetails
      user.value!.projects = projects ? projects : []
      localData.value.todoIndexes = projects ? projects : []
    }
  })
})
