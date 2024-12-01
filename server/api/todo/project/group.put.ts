import { getFirestore } from 'firebase-admin/firestore'
import { z } from 'zod'
import { defineFirebaseAdmin, getUser } from '~/server/utils/firebaseAdmin'

const BodySchema = z.object({
  projectId: z.string().min(3),
  orders: z.array(
    z.object({
      title: z.string(),
      path: z.string(),
    })
  ),
})

export default defineEventHandler(async (event) => {
  defineFirebaseAdmin(event)
  try {
    const bodyResult = await readValidatedBody(event, (body) => BodySchema.safeParse(body))
    if (!bodyResult.success) throw createError('No body')

    const { sub: userId } = await getUser(event, 'sub')
    if (!userId) throw createError('No uid')

    const db = getFirestore()

    const { projectId, orders } = bodyResult.data
    const title = projectId.split(/[@/]/)[1]

    await db.collection('todos').doc(projectId).collection(title).doc(userId).update({ orders })

    return true
  } catch (error: any) {
    console.warn('api/todo/project/group.put ', error.message)
    return false
  }
})
