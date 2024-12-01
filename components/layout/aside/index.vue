<template>
  <div class="bg-base-300 h-full relative w-2" :class="ls.isAsideFull ? 'w-80' : '!w-20 flex flex-col items-center'">
    <div class="flex items-center h-16" :class="{ 'pl-2': ls.isAsideFull }">
      <nuxt-link to="/" class="btn btn-ghost text-lg flex md:hidden">
        <Icon name="bx:book-heart" size="1.4rem" />
        Toddo
      </nuxt-link>
      <label class="btn btn-square swap hidden md:inline-grid">
        <input type="checkbox" v-model="ls.isAsideFull" />
        <Icon name="t:left-panel-open" size="1.5rem" class="swap-off" />
        <Icon name="t:left-panel-close" size="1.5rem" class="swap-on" />
      </label>
    </div>
    <div class="p-4 pt-0 max-h-[calc(100dvh-11rem)]" v-if="ls.isAsideFull">
      <LayoutAsideProjects />
    </div>
    <Teleport to="#teleports">
      <div class="fixed top-16 left-4" v-if="!ls.isAsideFull">
        <details ref="dropdown" class="dropdown dropdown-right">
          <summary class="btn btn-square btn-outline">
            <Icon name="bxs:parking" size="1.75rem" />
          </summary>

          <LayoutAsideProjects class="dropdown-content ml-4" is-aside-full />
        </details>
      </div>
    </Teleport>
    <div class="fixed bottom-4 w-[calc(100%-1rem)] inset-x-2" v-if="ls.isAsideFull">
      <UserProfile is-aside-full />
    </div>
    <Teleport to="#teleports">
      <div class="fixed bottom-4 left-4" v-if="!ls.isAsideFull">
        <UserProfile />
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
const { localSetting: ls, isMobile } = useUnState()

watchImmediate(isMobile, (val) => {
  if (val) ls.value.isAsideFull = val
})

const dropdown = ref<HTMLDetailsElement>()
onClickOutside(dropdown, () => (dropdown.value!.open = false))
</script>
