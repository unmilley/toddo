import { getApps, initializeApp, type FirebaseOptions } from 'firebase/app'
import { initializeAuth } from 'firebase/auth'
import 'firebase/firestore'

export const useFirebase = () => {
  if (getApps().length === 0) {
    const config = useRuntimeConfig()
    const firebaseConfig = config.public.firebase as FirebaseOptions

    const app = initializeApp(firebaseConfig)
    const auth = initializeAuth(app, { persistence: undefined })

    return { app, auth }
  }
}
