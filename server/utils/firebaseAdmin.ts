import type { ServiceAccount } from 'firebase-admin'
import { cert, getApps, initializeApp } from 'firebase-admin/app'
import type { EventHandlerRequest, H3Event } from 'h3'

export const defineFirebaseAdmin = (event: H3Event<EventHandlerRequest>) => {
  try {
    if (getApps().length === 0) {
      const config = useRuntimeConfig(event)
      const firebaseConfig = config.fbAdmin as ServiceAccount

      initializeApp({
        credential: cert(firebaseConfig),
      })
    }
  } catch (err) {
    return { err }
  }
}
