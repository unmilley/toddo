<template>
  <div class="h-full w-full">
    <client-only>
      <div>
        <HeroStats
          v-if="data"
          :projects-count="data.projectsCount"
          :users-count="data.usersCount"
          :github="data.github"
        />
      </div>
    </client-only>
  </div>
</template>

<script lang="ts" setup>
const { data, status, error, refresh, execute } = await useAsyncData<DataStats>('stats', () => $fetch('/api/stats'))
</script>
