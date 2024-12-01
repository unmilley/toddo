<template>
  <div class="card card-compact h-full shadow-xl" :class="{ 'focus-dashed': !isAsideFull }">
    <div class="card-body bg-base-300 rounded-box h-min max-h-min">
      <div class="flex justify-between">
        <h2 class="card-title">Projects</h2>
        <div class="card-actions">
          <div class="tooltip" data-tip="Refresh">
            <button class="btn btn-ghost btn-square btn-sm" @click="refresh()" :disabled="status === 'pending'">
              <Icon name="bx-revision" :class="{ 'animate-spin': status === 'pending' }" />
            </button>
          </div>
          <div class="tooltip" data-tip="New">
            <button
              class="btn btn-ghost btn-square btn-sm"
              @click="isNewProjectVisible = true"
              :disabled="status === 'pending'"
            >
              <Icon name="bx:plus" size="1.2rem" />
            </button>
          </div>
        </div>
      </div>
      <div class="max-h-[calc(100dvh-16rem)] overflow-x-visible overflow-y-auto">
        <ClientOnly>
          <VueDraggable
            v-if="projects && status === 'success' && projects.length"
            v-model="projects"
            :animation="200"
            :disabled="false"
            ghostClass="ghost"
            class="menu"
            handle=".handle"
            @start="drag = true"
            @end="drag = false"
          >
            <div class="flex items-center relative" v-for="el in projects" :key="el.path">
              <Icon name="bx:grid-vertical" class="handle absolute -left-3 text-primary cursor-pointer" size="1.2rem" />
              <li class="w-full ml-2">
                <nuxt-link :to="`/${el.path.replace('@', '/')}`" active-class="active">
                  {{ el.title }}
                </nuxt-link>
              </li>
            </div>
          </VueDraggable>
          <div
            v-else-if="projects && !projects.length && status !== 'pending' && !isNewProjectVisible"
            class="flex justify-between items-center"
          >
            <h2 class="font-mono">Add the first one</h2>
            <div class="btn-square btn-sm flex items-center justify-center opacity-70">
              <Icon name="bx:up-arrow-alt" size="1.2rem" />
            </div>
          </div>

          <div
            v-if="status === 'pending'"
            class="flex -ml-1 justify-start space-y-2 items-center"
            v-for="_ in savedGroups"
          >
            <Icon name="bx:grid-vertical" size="1.2rem" />
            <div class="skeleton w-52 h-7 ml-2"></div>
          </div>

          <div v-if="isNewProjectVisible">
            <UiTextarea
              name="newProject"
              placeholder="Goods"
              label=""
              input-class="m-1"
              auto-focus
              @keydown.enter="addProject"
              @keydown.esc="isNewProjectVisible = false"
              @focusout="isNewProjectVisible = false"
              :args="{ maxlength: 20 }"
            />
          </div>

          <template #fallback>
            <div>
              <div class="flex -ml-1 justify-start space-y-2 items-center" v-for="_ in savedGroups">
                <Icon name="bx:grid-vertical" size="1.2rem" />
                <div class="skeleton w-52 h-7 ml-2"></div>
              </div>
            </div>
          </template>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { DB } from '#shared/types'

import { VueDraggable } from 'vue-draggable-plus'
import { ProjectSchema } from '~/src/validation'

withDefaults(defineProps<{ isAsideFull?: boolean }>(), { isAsideFull: false })

const { $toast } = useNuxtApp()
const { localData } = useUnState()
const { user } = useAuth()

const {
  data: projects,
  refresh,
  status,
} = await useFetch<DB.Collection[]>('/api/todo/collection', {
  onResponse: ({ response }) => {
    if (response.status !== 200 || !Array.isArray(response._data)) return
    localData.value.projects = response._data
  },
  // default: () => localData.value.projects,
})

// const titles = reactive<string[]>([])
const titles = computed(() => (projects.value ? projects.value.map(({ title }) => title) : []))

const isNewProjectVisible = ref(false)
const drag = ref(false)
const savedGroups = computed((): DB.Collections[] => {
  return localData.value.projects.length ? localData.value.projects : Array.from({ length: 1 })
})

const { handleSubmit, values, setFieldError } = useForm<{ newProject: string }>({
  validationSchema: ProjectSchema,
  initialErrors: {
    newProject: 'Field is required',
  },
  keepValuesOnUnmount: true,
})

watch(values, ({ newProject }) => {
  if (typeof newProject === 'string' && !newProject.length) isNewProjectVisible.value = false
})

const titleCheck = (t: string) => {
  if (!projects.value) return false
  const author = user.value?.displayName ?? ''

  const hasMatchingTitle = projects.value.some(({ path, title }) => {
    const projectAuthor = path.split(/[@/]/)[0]
    return projectAuthor === author && title === t
  })

  return !hasMatchingTitle
}

const addProject = handleSubmit(async ({ newProject: title }) => {
  if (!titleCheck(title)) {
    setFieldError('newProject', `${title} is already taken`)
    return
  }
  const res = await $fetch('/api/todo/collection', {
    method: 'post',
    body: { title },
  })
  if (res) {
    $toast.success(`Project ${title} was create`)
    user.value!.projects?.push(res)
    refresh()
  } else $toast.error(`Project ${title} wasn't create`)
  isNewProjectVisible.value = false
})

const compareArrays = (a: any[], b: any[]) => JSON.stringify(a) === JSON.stringify(b)

watchDebounced(
  [projects, drag],
  async ([val, isDrag], [oldVal]) => {
    if (!oldVal || !val || compareArrays(val, oldVal) || isDrag) return
    const todoIndexes = val.map(({ path }) => path)
    const res = await $fetch('/api/user/projects', { method: 'put', body: { todoIndexes } })
    if (!res) refresh()
  },
  { debounce: 1500 }
)
</script>
