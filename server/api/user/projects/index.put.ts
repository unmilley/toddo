import { getFirestore } from 'firebase-admin/firestore'
import { z } from 'zod'
import { defineFirebaseAdmin, getUser } from '~/server/utils/firebaseAdmin'

export default defineEventHandler(async (event) => {
  try {
    const bodyResult = await readValidatedBody(event, (body) =>
      z.object({ todoIndexes: z.string().or(z.array(z.string())) }).safeParse(body)
    )
    if (!bodyResult.success) throw createError('No body')

    defineFirebaseAdmin(event)
    const db = getFirestore()
    const { sub: uid } = await getUser(event, 'sub')
    if (!uid) throw createError('No uid')

    const { todoIndexes } = bodyResult.data

    await db.collection('users').doc(uid).update({ todoIndexes })

    return true
  } catch (error: any) {
    console.warn('api/user/projects/index.put: ', error.message)
    return false
  }
})
