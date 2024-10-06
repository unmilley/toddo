import { getApps, initializeApp, type FirebaseOptions } from 'firebase/app'

export const useFirebase = () => {
  if (getApps().length === 0) {
    const config = useRuntimeConfig()
    const firebaseConfig = config.public.fb as FirebaseOptions

    const app = initializeApp(firebaseConfig)

    return { app }
  }
}
