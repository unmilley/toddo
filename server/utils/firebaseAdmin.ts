import type { ServiceAccount } from 'firebase-admin'
import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getAuth, type DecodedIdToken } from 'firebase-admin/auth'
import type { EventHandlerRequest, H3Event } from 'h3'
import type { DecodedIdTokenKeys } from '~/shared/types'
import { REFRESH_TOKEN } from '~/src/runtimeConfig'

export const defineFirebaseAdmin = (event: H3Event<EventHandlerRequest>) => {
  try {
    if (getApps().length === 0) {
      const config = useRuntimeConfig(event)
      const firebaseConfig = config.firebaseServer as ServiceAccount

      initializeApp({
        credential: cert(firebaseConfig),
      })
    }
  } catch (err) {
    return { err }
  }
}

export const getUser = async (
  event: H3Event<EventHandlerRequest>,
  ...keys: DecodedIdTokenKeys[]
): Promise<Partial<DecodedIdToken> | DecodedIdToken> => {
  const cookie = getCookie(event, REFRESH_TOKEN)
  if (!cookie) return {}
  try {
    const user = await getAuth().verifySessionCookie(cookie ?? '')
    return keys.length
      ? (Object.fromEntries(keys.map((val) => [val, user[val]])) as Partial<DecodedIdToken>)
      : (user as DecodedIdToken)
  } catch {
    return {}
  }
}
