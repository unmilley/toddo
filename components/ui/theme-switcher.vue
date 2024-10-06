<template>
  <button>
    <!-- <ClientOnly> -->
    <label class="btn btn-square btn-ghost swap swap-rotate">
      <input type="checkbox" v-model="isDark" />
      <Icon name="bx-sun" class="swap-on fill-current size-6" />
      <Icon name="bx-moon" class="swap-off fill-current size-6" />
    </label>
    <!-- </ClientOnly> -->
  </button>
</template>

<script lang="ts" setup>
const { $colorMode } = useNuxtApp()

const isDark = ref(true)

onMounted(() => {
  isDark.value = $colorMode.value === 'dark'
})

watch(isDark, (val) => {
  val ? ($colorMode.value = 'dark') : ($colorMode.value = 'light')
})
</script>

<style></style>
