import type { DB } from '#shared/types'
import { getFirestore } from 'firebase-admin/firestore'
import { defineFirebaseAdmin, getUser } from '~/server/utils/firebaseAdmin'

export default defineEventHandler(async (event) => {
  defineFirebaseAdmin(event)

  try {
    const LOCAL_DATA = getCookie(event, 'LOCAL_DATA') ?? ''
    const savedProjects: string[] | undefined = JSON.parse(LOCAL_DATA).todoIndexes
    if (!savedProjects) return []

    const { sub: userId } = await getUser(event, 'sub')
    if (!userId) throw createError('No uid')

    const db = getFirestore()

    const projects: DB.Collection[] = []

    for await (const id of savedProjects) {
      const data = await db.collection('todos').doc(id).get()
      if (data.exists) projects.push(data.data() as DB.Collection)
    }
    return projects
  } catch (error: any) {
    console.warn('api/todo/collection/index.get: ', error.message)
    return []
  }
})
