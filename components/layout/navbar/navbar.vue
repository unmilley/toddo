<template>
  <div class="navbar bg-base-300 w-full">
    <div class="navbar-start md:invisible">
      <button type="button" aria-label="open sidebar" class="btn btn-square" @click="isDrawerOpen = !isDrawerOpen">
        <Icon name="bx:menu" size="1.75rem" />
      </button>
    </div>
    <div class="navbar-center flex items-center md:invisible">
      <nuxt-link to="/" class="btn btn-ghost text-xl" v-if="!title">
        <Icon name="bx:book-heart" size="1.5rem" />
        Toddo
      </nuxt-link>
      <h1 v-else class="text-xl font-bold">{{ title }}</h1>
    </div>
    <div class="navbar-end">
      <LayoutNavbarTheme />
    </div>
  </div>
</template>

<script lang="ts" setup>
const isDrawerOpen = defineModel<boolean>({ required: true })
const Group = useRouteParams('group', '', { transform: String })
const Author = useRouteParams('author', '', { transform: String })

const { localData } = useUnState()
const title = computed(() => {
  if (!Group.value || !Author.value || !localData.value.projects.length) return
  return localData.value.projects.find(({ path }) => path === `${Author.value}@${Group.value}`)?.title
})
</script>
