<template>
  <div class="pt-4" :class="{ 'flex flex-col items-center w-full': !isAsideFull }" v-if="projects">
    <transition name="slide-up" mode="out-in">
      <layout-aside-project-card
        :isAsideFull="isAsideFull"
        v-model:projects="projects"
        v-if="isAsideFull"
        @refresh="refresh()"
        :status="status"
      />
      <details ref="dropdown" class="dropdown dropdown-right" v-else>
        <summary class="btn btn-square btn-outline">
          <Icon name="bxs:parking" size="1.75rem" />
        </summary>

        <layout-aside-project-card
          :isAsideFull="isAsideFull"
          v-model:projects="projects"
          :status="status"
          class="dropdown-content min-w-56 w-max z-10 ml-4"
          @refresh="refresh()"
        />
      </details>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import type { DB } from '#shared/types'

defineProps<{ isAsideFull: boolean }>()

const { localData } = useUnState()

const {
  data: projects,
  refresh,
  status,
} = await useFetch<DB.Collection[]>('/api/todo/collection', {
  onResponse: ({ response }) => {
    if (response.status !== 200 || !Array.isArray(response._data)) return
    localData.value.projects = response._data
  },
})
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 75ms ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateX(-18rem) scaleX(0.5);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateX(-18rem) scaleX(0.5);
}
</style>
