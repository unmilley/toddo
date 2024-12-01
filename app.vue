<template>
  <div>
    <NuxtRouteAnnouncer>
      <template #default="{ message }">
        <p>{{ message }} was loaded.</p>
      </template>
    </NuxtRouteAnnouncer>
    <ClientOnly>
      <Toaster
        position="top-right"
        :duration="4e3"
        :theme="($colorMode.value as Theme)"
        offset="17px"
        :visibleToasts="5"
        closeButton
      />
    </ClientOnly>
    <NuxtLoadingIndicator color="repeating-linear-gradient(to right, oklch(var(--bc)) 0%, oklch(var(--p)) 100%)" />
    <!-- <NuxtLoadingIndicator color="repeating-linear-gradient(to right,#00dc82 0%,#34cdfe 50%,#0047e1 100%)" /> -->
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
import { Toaster } from 'vue-sonner'
type Theme = 'light' | 'dark'

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
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(0.05rem);
}
</style>
