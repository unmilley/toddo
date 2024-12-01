<template>
  <div class="card compact card-bordered bg-base-100 shadow-xl first:mt-2">
    <div class="card-body">
      <p>{{ task.title }}</p>
      <div class="card-actions" v-if="task.labels && task.labels.length">
        <div class="badge badge-outline" v-for="(label, index) in task.labels" :key="index">{{ label }}</div>
      </div>
      <div class="card-actions" v-if="task.deadline">
        <div class="badge badge-outline" :class="{ 'badge-error': isDeadLine }">{{ formatted }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { task } = defineProps<{ task: Task }>()

const formatted = useDateFormat(task.deadline, 'DD.MM (dddd) | HH:mm', { locales: 'ru-RU' })

const isDeadLine = computed(() => (task.deadline ? Number(new Date()) >= task.deadline : undefined))
</script>
