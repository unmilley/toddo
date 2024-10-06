<template>
  <section>
    <ClientOnly>
      <div v-if="isLoggedIn" class="flex justify-center items-center h-screen">
        <nuxt-link to="/todo" class="btn btn-secondary btn-outline btn-lg group">
          Toddo
          <Icon name="bx-chevron-right" class="group-hover:hidden" />
          <Icon name="bx-chevrons-right" class="hidden group-hover:inline-block" />
        </nuxt-link>
      </div>
      <Auth v-else />
    </ClientOnly>
  </section>
</template>

<script lang="ts" setup>
const { isLoggedIn } = useUnState()

whenever(isLoggedIn, () => navigateTo('/todo'))
</script>
