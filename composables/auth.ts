import {
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  type User,
} from 'firebase/auth'

export type SignInCredential = {
  email: string
  password: string
}

export type SignUpCredential = SignInCredential & { username: string }

const errorCodes: Record<string, string> = {
  'auth/user-not-found': 'Пользователь не найден',
  'auth/wrong-password': 'Не верный пароль',
  'auth/email-already-in-use': 'Email уже занят',
  'auth/invalid-credential': 'Недействительные учетные данные',
  'auth/too-many-requests': 'Слишком много запросов, попробуйте позже',
}

const extractErrorCode = (errorString: string) => {
  const startIndex = errorString.indexOf('(')
  const endIndex = errorString.indexOf(')')
  let code: string | null = null

  if (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) {
    code = errorString.substring(startIndex + 1, endIndex)
  }
  return code ? errorCodes[code] ?? 'Что-то пошло не так' : null
}

export const useAuth = () => {
  const user = useState<User | null>('userStore', () => null)

  const isUser = computed(() => !!user.value)

  useFirebase()
  // const { userDB } = useDatabase()

  const auth = getAuth()

  const handleSignWithGithub = async () => {
    try {
      const provider = new GithubAuthProvider()
      provider.addScope('repo')

      const data = await signInWithPopup(auth, provider)

      // await userDB.set(data.user)
      await sendEmailVerification(data.user)
      user.value = data.user
      const token = await data.user.getIdToken()
      await serverAuth(token)
    } catch (error: any | { message: string }) {
      const errorMessage = extractErrorCode(error.message)
      console.log('errorMessage: ', errorMessage)
      if (errorMessage) alert(errorMessage)
    }
  }

  const handleSignIn = async ({ email, password }: SignInCredential) => {
    try {
      const data = await signInWithEmailAndPassword(auth, email, password)

      user.value = data.user
      const token = await data.user.getIdToken()
      await serverAuth(token)
      navigateTo('/')
    } catch (error: any | { message: string }) {
      const errorMessage = extractErrorCode(error.message)
      console.log('errorMessage: ', errorMessage)
      if (errorMessage) alert(errorMessage)
    }
  }
  const handleSignUp = async ({ email, password, username }: SignUpCredential) => {
    try {
      const data = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(data.user, {
        displayName: username,
        photoURL: `https://avatar.iran.liara.run/username?username=${username}`,
      })
      // await userDB.set(data.user)
      await sendEmailVerification(data.user)
      user.value = data.user
      const token = await data.user.getIdToken()
      await serverAuth(token)
    } catch (error: any | { message: string }) {
      const errorMessage = extractErrorCode(error.message)
      console.log('errorMessage: ', errorMessage)
      if (errorMessage) alert(errorMessage)
    }
  }
  const logout = async () => {
    await auth.signOut()
    const data = await $fetch('/api/auth/logout', { method: 'post' })
    if (data.statusCode === 200) {
      navigateTo('/')
    }
  }

  const serverAuth = async (token: string) => {
    try {
      const data = await $fetch('/api/auth/login', { method: 'post', body: JSON.stringify({ token }) })
      if (data.statusCode === 200) {
        // navigateTo('/dashboard')
      }
    } catch (error) {
      console.log('error: ', error)
      alert('Invalid credentials.....')
    }
  }

  onAuthStateChanged(auth, async (userDetails) => {
    user.value = userDetails

    // if (userDetails) userDB.get(userDetails.uid)
    // else userDB.user.value = null
  })
  return { user, isUser, handleSignIn, handleSignUp, logout, handleSignWithGithub }
}
