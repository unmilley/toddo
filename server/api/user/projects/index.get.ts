import { getFirestore } from 'firebase-admin/firestore'
import { defineFirebaseAdmin, getUser } from '~/server/utils/firebaseAdmin'

export default defineEventHandler(async (event): Promise<string[]> => {
  try {
    defineFirebaseAdmin(event)
    const db = getFirestore()

    const { sub: uid } = await getUser(event, 'sub')
    if (!uid) throw createError('No uid')

    const user = await db.collection('users').doc(uid).get()
    const data = user.exists ? user.data() : undefined

    if (data && 'todoIndexes' in data) return data.todoIndexes

    await db.collection('users').doc(uid).set({ todoIndexes: [] })
    return []
  } catch (error: any) {
    console.warn('api/user/projects/index.get ', error.message)
    return []
  }
})
