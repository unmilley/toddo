import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import { defineFirebaseAdmin } from '~/server/utils/firebaseAdmin'
import type { DataStats, GithubData } from '~/shared/types'

export default defineEventHandler(async (event): Promise<DataStats | {}> => {
  defineFirebaseAdmin(event)

  try {
    const db = getFirestore()
    const usersCount = (await getAuth().listUsers()).users.length

    const projectsCount = (await db.collection('todos').count().get()).data().count

    const github = await event.$fetch<GithubData>('https://api.github.com/repos/unmilley/toddo', {
      parseResponse: (val) => {
        const { stargazers_count, pushed_at } = JSON.parse(val)
        return {
          lastCommitAt: pushed_at as string,
          stars: typeof stargazers_count === 'string' ? parseInt(stargazers_count) : stargazers_count ?? 0,
        }
      },
    })

    return { projectsCount, github, usersCount }
  } catch (error: any) {
    console.warn('api/stats/index.get: ', error.message)
    return {}
  }
})
