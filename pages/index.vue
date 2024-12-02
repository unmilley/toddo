<template>
  <section
    class="flex flex-col items-start bg-base-100 p-2 h-[calc(100dvh-8rem)] overflow-x-hidden relative rounded-t-box"
  >
    <ClientOnly>
      <div v-if="isUser" class="">
        <pre>user: {{ user }}</pre>
      </div>
      <div v-else class="">
        <div class="w-full p-1">
          <Hero />
        </div>
      </div>

      <template #fallback>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Icon name="bx:loader-alt" class="animate-spin text-primary" size="3rem" />
        </div>
      </template>
    </ClientOnly>
  </section>
</template>

<script setup lang="ts">
const { user, isUser } = useAuth()
</script>
