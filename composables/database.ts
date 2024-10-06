import { child, get, getDatabase, push, ref, remove, set, update } from 'firebase/database'

export interface Todo {
  task: string
  create_at: Date
  isDone: boolean
}
export interface GroupTodo {
  [key: string]: Todo
}

export const useDatabase = () => {
  useFirebase()

  const { user } = useAuth()
  const db = getDatabase()

  const todo = useState<GroupTodo | null>('todo', () => null)

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

  const updateTask = async (group: string, id: number | string, newTask: string) => {
    if (!user.value) return
    await update(child(ref(db), `users/${user.value.uid}/${group}/${id}`), { task: newTask })
  }

  const deleteTask = async (group: string | string[], id: number | string) => {
    if (!user.value) return
    await remove(ref(db, `users/${user.value.uid}/${group}/${id}`))
  }

  const deleteGroup = async (group: string | string[]) => {
    if (!user.value) return
    await remove(ref(db, `users/${user.value.uid}/${group}`))
  }

  const updateGroup = async (group: string, newGroup: string) => {
    if (!user.value) return

    try {
      const data = await get(child(ref(db), `users/${user.value.uid}/${group}`))
      if (data.exists()) {
        await set(ref(db, `/users/${user.value.uid}/${newGroup}`), data.val())
        await deleteGroup(group)
        await checkUserInDB()
      }
    } catch (error) {
      console.log('error: ', error)
    }
  }

  const addTask = async (group: string, task: string) => {
    if (!user.value) return
    const res = await push(ref(db, `users/${user.value.uid}/${group}`), {
      task,
      isDone: false,
      create_at: Number(new Date()),
    })
    return res
  }

  return { todo, checkUserInDB, switchDone, updateTask, deleteTask, deleteGroup, addTask, updateGroup }
}
