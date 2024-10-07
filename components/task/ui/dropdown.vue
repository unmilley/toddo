<template>
  <details class="dropdown dropdown-end" :class="{ 'dropdown-top': isLast }" ref="dropdown">
    <summary class="btn btn-outline ~btn-ghost btn-xs opacity-25 group-hover:opacity-100">details</summary>
    <ul
      class="menu dropdown-content ~bg-base-100 backdrop-blur-lg rounded-lg min-w-36 border border-dashed border-base-content/70 mt-1 z-[1]"
    >
      <li><a @click.prevent="emit('edit')">Edit task</a></li>
      <div class="divider my-0"></div>
      <li><a @click.prevent="emit('delete')">Delete task</a></li>
    </ul>
  </details>
</template>

<script lang="ts" setup>
const emit = defineEmits<{ edit: []; delete: [] }>()

withDefaults(defineProps<{ isLast?: boolean }>(), { isLast: false })

const dropdown = ref<HTMLDetailsElement>()
onClickOutside(dropdown, () => (dropdown.value!.open = false))
</script>
