import { getFirestore } from 'firebase-admin/firestore'
import { z } from 'zod'
import { defineFirebaseAdmin, getUser } from '~/server/utils/firebaseAdmin'
import type { DB, ResponseProjectGroup } from '~/shared/types'

const querySchema = z.object({
  projectId: z.string().min(3),
})

const checkUpdateGroups = (data: ResponseProjectGroup) => {
  const coll = Object.keys(data.collections)
  const ordersPath = data.orders.map(({ path }) => path)

  const newOrders = coll.filter((val) => !ordersPath.includes(val))
  const deletedColl = ordersPath.filter((val) => !coll.includes(val))

  if (deletedColl.length) {
    deletedColl.forEach((path) => (data.orders = data.orders.filter((val) => val.path !== path)))
  }
  if (newOrders.length) {
    newOrders.forEach((path) => data.orders.push({ path, title: path, isNew: true }))
  }

  return { data, isUpdate: Boolean(newOrders.length + deletedColl.length) }
}

export default defineEventHandler(async (event) => {
  defineFirebaseAdmin(event)
  try {
    const queryResult = await getValidatedQuery(event, (query) => querySchema.safeParse(query))
    if (!queryResult.success) throw createError('No query')

    const { sub: userId } = await getUser(event, 'sub')
    if (!userId) throw createError('No uid')

    const { projectId } = queryResult.data
    const title = projectId.split(/[@/]/)[1]

    const db = getFirestore()

    const project = db.collection('todos').doc(projectId).collection(title)

    const ordersData = await project.doc(userId).get()
    // console.log('ordersData: ', ordersData.data())
    if (!ordersData.exists) throw createError('No Data')

    const returnedData: ResponseProjectGroup = {
      orders: ordersData.data()?.orders as DB.Collections[],
      collections: {} as Record<string, any[]>,
    }

    // const collections = returnedData.orders.map(({ path }) => path)
    const collections = (
      await db.collection('todos').doc(projectId).collection(title).doc('data').listCollections()
    ).map((val) => val.id)

    for await (const collection of collections) {
      returnedData.collections[collection] = []

      const data = await project.doc('data').collection(collection).doc('data').get()
      if (data.exists) {
        const d = data.data()
        if (d && d.data) returnedData.collections[collection] = d.data
      }
    }

    const { data, isUpdate } = checkUpdateGroups(returnedData)

    if (isUpdate) {
      await event.$fetch('/api/todo/project/group', {
        method: 'put',
        body: { projectId, orders: data.orders },
      })
    }

    return data
  } catch (error: any) {
    console.warn('api/todo/project/index.get: ', error.message)
    return {
      orders: [],
      collections: {},
    }
  }
})
