<template>
  <section>
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body min-w-[20rem] max-w-2xl">
        <div class="flex gap-4 w-full justify-center">
          <h2 class="card-title">Groups</h2>
        </div>
        <div class="flex gap-4 w-full justify-center">
          <label class="input input-bordered input-md w-full max-w-xs flex items-center gap-2">
            <input type="text" class="grow" placeholder="Search" v-model="searchTerm" maxlength="20" />
            <Icon name="bx:search" class="size-4 opacity-70" />
          </label>
          <div>
            <button class="btn btn-success btn-outline" @click="createGroup()">New</button>
          </div>
        </div>
        <!--  -->
        <div class="overflow-x-auto">
          <table class="table" v-if="groups.length">
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Completed</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(t, idx) in groups"
                :key="t.title"
                @click="navigateTo(`/todo/${t.title}`)"
                class="hover group cursor-pointer"
              >
                <td>{{ idx }}</td>
                <th>{{ t.title }}</th>
                <td>{{ t.completed }} / {{ t.total }}</td>
                <td class="text-center">
                  <button
                    class="btn btn-outline btn-square ~btn-ghost btn-xs opacity-25 group-hover:opacity-100"
                    @click.stop="renameStart(t.title)"
                  >
                    <Icon name="bx:edit-alt" size="1.2rem" />
                  </button>
                </td>
                <td class="text-center">
                  <button
                    class="btn btn-error btn-outline btn-square ~btn-ghost btn-xs opacity-25 group-hover:opacity-100"
                    @click.stop="deleteGroup(t.title, t.total)"
                  >
                    <Icon name="bx:x" size="1.2rem" />
                  </button>
                </td>
              </tr>
            </tbody>
            <tfoot v-if="groups.length >= 10">
              <tr>
                <th></th>
                <th>Title</th>
                <th>Completed</th>
                <th>Actions</th>
                <th></th>
              </tr>
            </tfoot>
          </table>
          <p :class="{ invisible: groups.length }">
            The group “{{ searchTerm }}” was not found, but you can
            <button class="btn-link" @click="createGroup(searchTerm)">create it</button>
          </p>
        </div>
        <!--  -->
      </div>
    </div>
    <GroupEdition ref="editTitleComponent" />
    <GroupDelete ref="deleteGroupComponent" />
    <GroupCreate ref="createGroupComponent" />
  </section>
</template>

<script setup lang="ts">
import type { DefineComponent } from 'vue'
import type { Database } from '~/types'

definePageMeta({
  middleware: 'auth',
})
const searchTerm = ref('')

const { todo, checkUserInDB } = useDatabase()

onMounted(() => {
  checkUserInDB()
})

const editTitleComponent = ref<DefineComponent | null>(null)
const deleteGroupComponent = ref<DefineComponent | null>(null)
const createGroupComponent = ref<DefineComponent | null>(null)

const renameStart = (title: string) => {
  if (!editTitleComponent.value || !todo.value) return
  editTitleComponent.value.renameStart(title, Object.keys(todo.value))
}

const deleteGroup = (title: string, taskLength: number) => {
  if (!deleteGroupComponent.value) return
  deleteGroupComponent.value.openModal({ title, taskLength })
}
const createGroup = (title: string = '') => {
  if (!createGroupComponent.value || !todo.value) return
  createGroupComponent.value.openModal(title, Object.keys(todo.value))
}

const groups = computed(() => {
  if (!todo.value) return []

  const term = searchTerm.value.toLowerCase()

  return Object.entries(todo.value).reduce<Database.Groups[]>((acc, [title, tasks]) => {
    const totalCount = Object.keys(tasks).length // Количество задач
    const completedCount = Object.values(tasks).filter(({ isDone }) => isDone).length // Завершенные задачи

    // Добавляем объект в аккумулятор, если заголовок соответствует поисковому терму
    if (title.toLowerCase().includes(term)) {
      acc.push({
        title,
        tasks: tasks,
        completed: completedCount,
        total: totalCount,
      })
    }

    return acc
  }, [])
})

// const groups = computed(() => {
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
