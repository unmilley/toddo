<template>
  <section>
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Groups</h2>
        <label class="input input-bordered input-md w-full max-w-xs flex items-center gap-2">
          <input type="text" class="grow" placeholder="Search" v-model="searchTerm" />
          <Icon name="bx:search" class="size-4 opacity-70" />
        </label>
        <!--  -->
        <div class="overflow-x-auto">
          <table class="table">
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Completed</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(t, idx) in todos"
                :key="t.title"
                @click="navigateTo(`/todo/${t.title}`)"
                class="hover group cursor-pointer"
              >
                <td>{{ idx }}</td>
                <th>{{ t.title }}</th>
                <td>{{ t.completed }} / {{ t.total }}</td>
                <td>
                  <button
                    class="btn btn-ghost btn-xs opacity-25 group-hover:opacity-100"
                    @click.stop="renameStart(t.title)"
                  >
                    edit
                  </button>
                </td>
              </tr>
            </tbody>
            <tfoot v-if="todos.length >= 10">
              <tr>
                <th></th>
                <th>Title</th>
                <th>Completed</th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
        <!--  -->
      </div>
    </div>
    <GroupEdition ref="editTitleComponent" />
  </section>
</template>

<script setup lang="ts">
import type { DefineComponent } from 'vue'

definePageMeta({
  middleware: 'auth',
})
const searchTerm = ref('')

const { todo, checkUserInDB } = useDatabase()

onMounted(() => {
  checkUserInDB()
})

const editTitleComponent = ref<DefineComponent | null>(null)

const renameStart = (t: string) => {
  if (!editTitleComponent.value || !todo.value) return
  editTitleComponent.value.renameStart(t, Object.keys(todo.value))
}

type Todos = { title: string; todo: globalThis.Todo; completed: number; total: number }[]

const todos = computed(() => {
  if (!todo.value) return []

  const term = searchTerm.value.toLowerCase()

  return Object.entries(todo.value).reduce<Todos>((acc, [title, tasks]) => {
    const totalCount = Object.keys(tasks).length // Количество задач
    const completedCount = Object.values(tasks).filter(({ isDone }) => isDone).length // Завершенные задачи

    // Добавляем объект в аккумулятор, если заголовок соответствует поисковому терму
    if (title.toLowerCase().includes(term)) {
      acc.push({
        title,
        todo: tasks,
        completed: completedCount,
        total: totalCount,
      })
    }

    return acc
  }, [])
})

// const todos = computed(() => {
//   if (!todo.value) return []
//   const term = searchTerm.value.toLowerCase()

//   return Object.entries(todo.value)
//     .map(([title, todo]) => {
//       const tasks = Object.values(todo)
//       const totalCount = tasks.length
//       const completedCount = tasks.filter(({ isDone }) => isDone).length

//       return {
//         title,
//         todo,
//         completed: completedCount,
//         total: totalCount,
//       }
//     })
//     .filter(({ title }) => title.toLowerCase().includes(term))
// })
</script>
