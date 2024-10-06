<template>
  <div class="container mx-auto">
    <NuxtRouteAnnouncer>
      <template #default="{ message }">
        <p>{{ message }} was loaded.</p>
      </template>
    </NuxtRouteAnnouncer>
    <NuxtLayout>
      <NuxtPage
        :transition="{
          name: 'page',
          mode: 'out-in',
        }"
      />
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
useHead({
  titleTemplate: (titleChunk) => (titleChunk ? `${titleChunk} · Toddo` : 'Toddo'),
})

const { isLoggedIn } = useUnState()

if (import.meta.server) {
  const authCookie = useCookie('Authorization')
  isLoggedIn.value = authCookie.value ? true : false
} else {
  const { user } = useAuth()
  watchImmediate(user, (newValue) => {
    isLoggedIn.value = newValue ? true : false
  })
  whenever(user, (val) => console.log(val))
}
</script>

<style>
.qwe {
  border: 1px solid salmon;
}
.qwe2 > * {
  border: 1px solid salmon;
}
.qwe3 * {
  border: 1px solid salmon;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(0.05rem);
}
</style>
