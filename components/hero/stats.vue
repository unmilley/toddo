<template>
  <div class="flex flex-col gap-2">
    <div class="stats ~stats-vertical ~lg:stats-horizontal shadow bg-base-300">
      <div class="stat">
        <div class="stat-figure">
          <Icon name="bx:bxl-firebase" class="inline-block size-10" />
        </div>
        <div class="stat-title">Projects created</div>
        <div class="stat-value">{{ projectsCount }}</div>
        <div class="stat-actions"></div>
      </div>
      <div class="stat">
        <div class="stat-figure">
          <Icon name="material-symbols:authenticator" class="inline-block size-10" />
        </div>
        <div class="stat-title">Created users</div>
        <div class="stat-value">{{ usersCount }}</div>
        <div class="stat-actions"></div>
      </div>
    </div>

    <div class="stats ~stats-vertical ~lg:stats-horizontal shadow bg-base-300">
      <div class="stat">
        <div class="stat-figure">
          <Icon name="bx:bxl-github" class="inline-block size-10" />
        </div>
        <div class="stat-title">Stars on Github</div>
        <div class="stat-value">{{ github.stars }}</div>
        <div class="stat-desc">
          <nuxt-link href="https://github.com/unmilley/toddo" target="_blank" class="btn-link text-base-content">
            Make star
          </nuxt-link>
        </div>
      </div>
      <div class="stat">
        <div class="stat-title">App version</div>
        <div class="stat-value">{{ version }}</div>
        <div class="stat-desc">Last commit at {{ formatted }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { DataStats } from '#shared/types'
const { github } = defineProps<DataStats>()

const { appVersion: version } = useRuntimeConfig().public
const formatted = useDateFormat(github.lastCommitAt, 'YYYY-MM-DD')
</script>
