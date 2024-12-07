<template>
  <aside
    class="[grid-area:_aside] flex flex-col items-center transition-all z-10 h-full md:relative md:translate-x-0 bg-base-300 fixed top-0 -translate-x-80"
    :class="[ls.isAsideFull ? 'w-72' : 'w-[4.5rem]', { 'translate-x-[-0.5rem]': isOpen }]"
  >
    <div class="flex flex-col items-center w-full h-full p-2 md:p-0">
      <div
        class="flex items-center w-full h-16 relative transition-transform"
        :class="{ 'translate-x-3': !ls.isAsideFull }"
      >
        <NuxtLink to="/" class="btn text-xl" :class="{ 'btn-square ': !ls.isAsideFull }">
          <Icon name="t:logo" size="1.5rem" />
          <span class="transition-opacity" v-show="ls.isAsideFull">Toddo</span>
        </NuxtLink>
      </div>

      <div class="relative flex-grow w-full">
        <layout-aside-projects :isAsideFull="ls.isAsideFull" />
      </div>
      <UserProfile :isAsideFull="ls.isAsideFull" />
    </div>
    <Teleport to="body">
      <Transition name="page" mode="out-in">
        <div
          id="drawer-overlay"
          aria-label="close sidebar"
          class="fixed cursor-pointer transition duration-200 top-0 left-0 h-dvh w-full z-[1] bg-[#0006]"
          v-if="isOpen"
          @click="isOpen = false"
        ></div>
      </Transition>
    </Teleport>
  </aside>
</template>

<script setup lang="ts">
const { localSetting: ls, isMobile } = useUnState()

watchImmediate(isMobile, (val) => {
  if (val) ls.value.isAsideFull = val
})

const isOpen = ref(false)

defineExpose({ openDrawer: () => (isOpen.value = true) })
</script>
