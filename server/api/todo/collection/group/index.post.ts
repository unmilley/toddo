import { getFirestore } from 'firebase-admin/firestore'
import { z } from 'zod'
import { defineFirebaseAdmin, getUser } from '~/server/utils/firebaseAdmin'
import slugGenerator from '~/server/utils/slugGenerator'

const defaultCollection = [
  { path: 'Backlog', title: 'Backlog' },
  { path: 'Doing', title: 'Doing' },
  { path: 'Review', title: 'Review' },
  { path: 'Done', title: 'Done' },
]

export default defineEventHandler(async (event) => {
  defineFirebaseAdmin(event)
  try {
    const bodyResult = await readValidatedBody(event, (body) => z.object({ title: z.string() }).safeParse(body))
    if (!bodyResult.success) throw createError('No body')

    const { sub: userId, name: username } = await getUser(event, 'sub', 'name')
    if (!userId) throw createError('No uid')

    const db = getFirestore()

    const { title } = bodyResult.data
    const collection = slugGenerator(title)
    const projectId = slugGenerator(username) + '@' + collection

    /* Create collection */
    for await (const el of defaultCollection) {
      await db
        .collection('todos')
        .doc(projectId)
        .collection(collection)
        .doc('data')
        .collection(el.path)
        .doc('data')
        .set({ data: [] })
    }
    await db.collection('todos').doc(projectId).set({ collection, title, path: projectId })
    await db.collection('todos').doc(projectId).collection(collection).doc(userId).set({ orders: defaultCollection })

    /* Update author "todoIndexes" */

    const todoIndexes = await event.$fetch<string[]>('/api/user/projects')
    todoIndexes.push(projectId)
    await event.$fetch('/api/user/projects', { method: 'put', body: { todoIndexes } })

    return projectId
  } catch (error: any) {
    console.warn('api/todo/collection/index.post: ', error.message)
    return false
  }
})
