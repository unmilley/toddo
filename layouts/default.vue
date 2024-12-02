<template>
  <div class="drawer md:drawer-open">
    <input id="drawer" type="checkbox" class="drawer-toggle" v-model="isDrawerOpen" />
    <div class="drawer-content w-full flex flex-col">
      <LayoutNavbar v-model="isDrawerOpen" />
      <main class="">
        <slot />
      </main>
      <LayoutFooter />
    </div>
    <div class="drawer-side">
      <div @click="isDrawerOpen = !isDrawerOpen" aria-label="close sidebar" class="drawer-overlay"></div>
      <LayoutAside />
    </div>
  </div>
</template>

<script lang="ts" setup>
const isDrawerOpen = ref(false)
</script>
