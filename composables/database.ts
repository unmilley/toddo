import { child, get, getDatabase, push, ref, remove, set, update } from 'firebase/database'
import type { Database } from '~/types'

export const useDatabase = () => {
  useFirebase()

  const { user } = useAuth()
  const db = getDatabase()

  const todo = useState<Database.Group | null>('todo', () => null)

  const checkUserInDB = async () => {
    if (!user.value) return
    try {
      const data = await get(child(ref(db), `users/${user.value.uid}`))
      if (data.exists()) todo.value = data.val()
      else {
        await addTask('Toddo', 'Add Task')
        await checkUserInDB()
      }
    } catch (error) {
      console.log('error: ', error)
    }
  }

  const switchDone = async (group: string, id: number | string, isDone: boolean) => {
    if (!user.value) return
    await update(child(ref(db), `users/${user.value.uid}/${group}/${id}`), { isDone })
  }

  const updateTask = async (group: string, id: string, newTask: string) => {
    if (!todo.value || !user.value) return
    await update(child(ref(db), `users/${user.value.uid}/${group}/${id}`), { task: newTask })
    todo.value[group][id].task = newTask
  }

  const deleteTask = async (group: string, id: string) => {
    if (!todo.value || !user.value) return
    await remove(ref(db, `users/${user.value.uid}/${group}/${id}`))
    delete todo.value[group][id]
  }

  const deleteAllCompletedTasks = async (groupId: string, ids: string[]) => {
    if (!todo.value || !user.value) return

    const group = todo.value[groupId]

    ids.forEach(async (id) => {
      if (!user.value) return
      await remove(ref(db, `users/${user.value.uid}/${groupId}/${id}`))
      delete group[id]
    })
    todo.value[groupId] = group
  }

  const deleteGroup = async (group: string) => {
    if (!user.value) return
    await remove(ref(db, `users/${user.value.uid}/${group}`))
    await checkUserInDB()
  }

  const updateGroup = async (group: string, newGroup: string) => {
    if (!user.value) return

    try {
      const data = await get(child(ref(db), `users/${user.value.uid}/${group}`))
      if (data.exists()) {
        await set(ref(db, `/users/${user.value.uid}/${newGroup}`), data.val())
        await deleteGroup(group)
      }
    } catch (error) {
      console.log('error: ', error)
    }
  }

  const addTask = async (group: string, task: string) => {
    if (!user.value || !todo.value) return
    const object: Database.Todo = {
      task,
      isDone: false,
      create_at: Number(new Date()),
    }
    const res = await push(ref(db, `users/${user.value.uid}/${group}`), object)
    const key = res.key
    if (!key) return

    todo.value[group][key] = object
  }

  return {
    todo,
    checkUserInDB,
    switchDone,
    updateTask,
    deleteTask,
    deleteGroup,
    addTask,
    updateGroup,
    deleteAllCompletedTasks,
  }
}
