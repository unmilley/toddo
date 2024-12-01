<template>
  <div class="relative w-full h-full">
    <ClientOnly>
      <!-- <div class="flex flex-row gap-2"> -->
      <div class="flex-auto flex w-full px-2.5 py-0 overflow-hidden h-[calc(100dvh-5.5rem)] overflow-x-auto flex-col">
        <div class="grid grid-flow-col auto-cols-max h-full">
          <template v-if="data">
            <VueDraggable
              class="flex gap-4 m-2 w-full bg-base-200"
              v-model="data.orders"
              :animation="150"
              ghostClass="ghost"
              handle=".handle"
              group="group"
              @start="dragGroup = true"
              @end="dragGroup = false"
            >
              <template v-for="order in data.orders" :key="order.path">
                <div class="card card-compact bg-base-300 rounded-box w-80 group select-none">
                  <div class="card-body">
                    <div class="flex justify-between">
                      <div class="flex gap-1 items-center">
                        <Icon name="bx:grid-vertical" class="handle text-primary cursor-pointer" size="1.2rem" />
                        <h2 class="card-title">{{ order.title }}</h2>
                      </div>
                      <div class="card-actions">
                        <div class="tooltip" data-tip="New">
                          <button
                            class="btn btn-ghost btn-square btn-sm"
                            @click="createTask(order)"
                            :disabled="status === 'pending'"
                          >
                            <Icon name="bx:plus" size="1.2rem" />
                          </button>
                        </div>
                        <details class="dropdown dropdown-end" v-if="isAdmin">
                          <summary class="btn btn-ghost btn-square btn-sm opacity-25 group-hover:opacity-100">
                            <Icon name="bx:menu" size="1.2rem" />
                          </summary>
                          <ul
                            class="dropdown-content menu bg-base-300/70 backdrop-blur-lg rounded-btn border border-base-content/20 absolute w-max mt-3 outline outline-2 outline-offset-2 outline-base-content/20 z-[1]"
                          >
                            <li><a>Rename</a></li>
                            <div class="divider my-0"></div>
                            <li><a>Delete group</a></li>
                          </ul>
                        </details>
                      </div>
                    </div>
                    <!--  -->
                    <VueDraggable
                      v-model="data.collections[order.path]"
                      :animation="150"
                      ghostClass="ghost"
                      group="task"
                      class="space-y-3"
                      @start="dragTask = true"
                      @end="dragTask = false"
                    >
                      <project-card v-for="item in data.collections[order.path]" :key="item.title" :task="item" />
                    </VueDraggable>
                    <!--  -->
                  </div>
                </div>
              </template>
            </VueDraggable>
            <div class="card card-compact bg-base-300 rounded-box h-20 mt-2.5 w-80" v-if="isAdmin">
              <div class="card-body">
                <div class="flex justify-between">
                  <h2 class="card-title font-mono text-base">Create group</h2>
                  <div class="card-actions">
                    <div class="tooltip" data-tip="New">
                      <button class="btn btn-ghost btn-square btn-sm">
                        <Icon name="bx:add-to-queue" size="1.2rem" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>

      <template #fallback>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Icon name="bx:loader-alt" class="animate-spin text-primary" size="3rem" />
        </div>
      </template>
    </ClientOnly>

    <ClientOnly>
      <button class="btn btn-square btn-primary fixed bottom-4 right-4" @click="refresh()">
        <Icon name="bx-revision" :class="{ 'animate-spin': status === 'pending' }" size="2rem" />
      </button>
    </ClientOnly>

    <ProjectCreateTask :group-title="chosenGroup.title" :labels-list="uniqueLabels" />
  </div>
</template>

<script lang="ts" setup>
import slugify from 'slugify'
import { VueDraggable } from 'vue-draggable-plus'
import type { DB } from '~/shared/types'

type FetchResponse = {
  orders: DB.Collections[]
  collections: Record<string, DB.Task[]>
}
const author = useRouteParams('author', '', { transform: String })
const isAdmin = computed(() => author.value === user.value?.displayName)
const slug = computed(() =>
  slugify(useRoute().path.slice(1), {
    trim: true,
    lower: true,
    remove: /[*+~.()'"?!:@#№;,\\$%^={}[\]%]/g,
  }).replace('/', '@')
)

const { data, refresh, status } = await useFetch<FetchResponse>('/api/todo/project', {
  query: { projectId: slug.value },
})
const { user } = useAuth()

const dragGroup = ref(false)
const dragTask = ref(false)

watchDebounced(
  () => data.value?.orders,
  async (val, oldVal) => {
    if (!val || dragGroup.value || oldVal === undefined || areObjectsEqual(val, oldVal)) return
    const res = await $fetch('/api/todo/project/group', {
      method: 'put',
      body: {
        projectId: slug.value,
        orders: val,
      },
    })
    if (!res) refresh()
  },
  { debounce: 1500 }
)

const { open: openModal, close: closeModal } = useModal('createTask')

const chosenGroup = shallowRef<DB.Collection>({
  path: '',
  title: '',
  collection: '',
})

const uniqueLabels = computed(() => {
  if (!data.value?.collections) return []
  const labels: Set<string> = new Set()

  Object.values(data.value.collections).forEach((tasks) => {
    tasks.forEach((task) => {
      if (task.labels) task.labels.forEach((label) => labels.add(label))
    })
  })

  return Array.from(labels)
})

const createTask = (order: Collection) => {
  chosenGroup.value = order
  openModal()
}

defineOgImageComponent('Toddo', {
  title: 'Toddo',
  description: slug.value,
})
</script>
