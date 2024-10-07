<template>
  <section>
    <div class="card card-compact bg-base-200 shadow-xl">
      <div class="card-body min-w-[20rem] max-w-2xl">
        <div class="flex gap-4 w-full justify-center relative mb-2">
          <h2 class="card-title">{{ title }}</h2>
          <ClientOnly>
            <span class="absolute right-4 top-1/2 -translate-y-1/2" v-if="totalTasks.total">
              [{{ totalTasks.completed }} / {{ totalTasks.total }}]
            </span>
          </ClientOnly>
        </div>
        <div class="flex gap-4 w-full justify-center">
          <label class="input input-bordered input-md w-full max-w-xs flex items-center gap-2">
            <input
              type="text"
              class="grow"
              placeholder="Search"
              enterkeyhint="search"
              v-model="searchTerm.model"
              @keypress.enter="search($event)"
            />
            <Icon name="bx:search" class="size-4 opacity-70" />
          </label>
          <div>
            <button class="btn btn-success btn-outline" @click="createTask">New</button>
          </div>
          <task-menu @delete-all-completed-tasks="deleteAllCompletedTasks" />
        </div>

        <div class="~overflow-x-auto max-h-[calc(100dvh_-_14.25rem)] overflow-y-scroll" v-if="tasks.length">
          <table class="table">
            <!-- head -->
            <thead>
              <tr>
                <th v-show="localSetting.isHiddenIdTasks"></th>
                <th></th>
                <th>Task</th>
                <th v-show="!localSetting.compactAction">Edit</th>
                <th v-show="!localSetting.compactAction">Delete</th>
                <th v-show="localSetting.compactAction">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(t, idx) in tasks" :key="t.id" class="hover group cursor-pointer">
                <td v-if="localSetting.isHiddenIdTasks">{{ idx }}</td>
                <td>
                  <label class="opacity-25 group-hover:opacity-100">
                    <input type="checkbox" class="checkbox" :checked="t.isDone" @click="checkTask(t.id, t.isDone)" />
                  </label>
                </td>
                <th @dblclick="localSetting.switchOndblclick ? checkTask(t.id, t.isDone) : null">
                  <p class="text-sm select-none">{{ t.task }}</p>
                </th>
                <td class="text-center" v-if="!localSetting.compactAction">
                  <button
                    class="btn btn-outline btn-square ~btn-ghost btn-xs opacity-25 group-hover:opacity-100"
                    @click.stop="editTask(t.id, t.task)"
                  >
                    <Icon name="bx:edit-alt" size="1.2rem" />
                  </button>
                </td>
                <td class="text-center" v-if="!localSetting.compactAction">
                  <button
                    class="btn btn-error btn-outline btn-square ~btn-ghost btn-xs opacity-25 group-hover:opacity-100"
                    @click.stop="deleteTask(t.id)"
                  >
                    <Icon name="bx:x" size="1.2rem" />
                  </button>
                </td>
                <td v-else>
                  <task-ui-dropdown
                    @edit="editTask(t.id, t.task)"
                    @delete="deleteTask(t.id)"
                    :is-last="tasks.length - 1 === idx"
                  />
                </td>
              </tr>
            </tbody>
            <tfoot v-if="tasks.length >= 10">
              <tr>
                <th v-show="localSetting.isHiddenIdTasks"></th>
                <th></th>
                <th>Task</th>
                <th v-show="!localSetting.compactAction">Edit</th>
                <th v-show="!localSetting.compactAction">Delete</th>
                <th v-show="localSetting.compactAction">Action</th>
              </tr>
            </tfoot>
          </table>
        </div>
        <div v-else-if="!totalTasks.total" class="">
          <p>
            You don't have any tasks created yet,
            <button class="btn-link" @click="createTask">add the first one</button>
          </p>
        </div>
      </div>
    </div>
    <TaskEdition ref="taskEdition" />
    <TaskDelete ref="taskDelete" />
    <TaskCreate ref="taskCreate" />
  </section>
</template>

<script lang="ts" setup>
import { useRouteParams } from '@vueuse/router'
import type { DefineComponent } from 'vue'
import type { Database } from '~/types'

const title = useRouteParams('title', '', { transform: String })
definePageMeta({ middleware: 'auth' })
useHead({ title: title.value })

const { todo, switchDone, checkUserInDB, deleteAllCompletedTasks: delCompleted } = useDatabase()

const { localSetting } = useUnState()

const taskEdition = ref<DefineComponent>()
const taskDelete = ref<DefineComponent>()
const taskCreate = ref<DefineComponent>()

const createTask = () => {
  if (!taskCreate.value) return
  taskCreate.value.open(title.value)
}

const editTask = (id: string, task: string) => {
  if (!taskEdition.value) return
  taskEdition.value.open(title.value, id, task) // _group: string, id: string, task: string
}

const deleteTask = (id: string) => {
  if (!taskDelete.value) return
  taskDelete.value.open({ group: title.value, idTask: id }) // group, idTask
}

const deleteAllCompletedTasks = async () => {
  if (!todo.value || !title.value) return []

  const todos = todo.value[title.value]
  if (!todos) return []

  const completedTaskIds = Object.entries(todos).reduce<string[]>((acc, [id, task]) => {
    if (task.isDone) acc.push(id)
    return acc
  }, [])

  await delCompleted(title.value, completedTaskIds)
}

const searchTerm = reactive({
  value: '',
  model: '',
})

const search = ({ target }: KeyboardEvent) => {
  const input = target as HTMLInputElement
  searchTerm.value = input.value.toLowerCase()
}

const totalTasks = computed(() => {
  if (!todo.value) return { total: 0, completed: 0 }

  const todos = todo.value[title.value]
  if (!todos) return { total: 0, completed: 0 }

  const tasks = Object.values(todo.value[title.value])
  const completed = tasks.filter(({ isDone }) => isDone).length
  const total = tasks.length
  return { total, completed }
})

const tasks = computed(() => {
  if (!todo.value) return []

  const todos = todo.value[title.value]
  if (!todos) return []

  return Object.entries(todos).reduce<Database.Todos[]>((acc, [id, task]) => {
    if (localSetting.value.showUncompleted && task.isDone) return acc
    if (task.task.toLowerCase().includes(searchTerm.value)) {
      acc.push({ id, ...task })
    }
    return acc
  }, [])
})

watch(searchTerm, ({ model }) => {
  if (!model) searchTerm.value = ''
})

const checkTask = async (id: string, isDone: boolean) => {
  if (!todo.value) return

  const reveredDone = !isDone

  todo.value[title.value][id].isDone = reveredDone
  await switchDone(title.value, id, reveredDone)
}

onMounted(() => {
  if (title.value.length > 20) return navigateTo('/todo')
  checkUserInDB()
})
</script>
