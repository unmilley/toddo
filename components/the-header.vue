<template>
  <header class="navbar bg-base-100">
    <div class="navbar-start">
      <nuxt-link :to="routerTo" class="btn btn-ghost text-xl uppercase">
        {{ isUser ? user?.displayName : 'Toddo' }}
      </nuxt-link>
    </div>
    <div class="navbar-center"></div>
    <div class="navbar-end">
      <button class="btn btn-square btn-ghost" v-if="isUser" @click="logout">sign out</button>
      <UiThemeSwitcher />
    </div>
  </header>
</template>

<script lang="ts" setup>
const { isUser, logout, user } = useAuth()

const routerTo = computed(() => (isUser.value ? '/todo' : '/'))
</script>
