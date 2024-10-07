<template>
  <div>
    <details class="dropdown dropdown-end" ref="details">
      <summary class="btn btn-outline btn-square"><Icon name="bx:menu" size="2rem" /></summary>
      <ul
        class="menu dropdown-content ~bg-base-100 backdrop-blur-lg rounded-lg min-w-72 border border-dashed border-base-content/70 mt-1 z-[1]"
      >
        <li>
          <a @click="$emit('deleteAllCompletedTasks')" class="flex !flex-col items-start !gap-0">
            <p>Delete completed tasks</p>
            <span class="bg-warning text-warning-content text-xs leading-3">Without confirmation</span>
          </a>
        </li>
        <div class="divider my-0.5"></div>
        <li>
          <label class="label justify-between w-full cursor-pointer">
            <span class="label-text">Show IDs</span>
            <input type="checkbox" class="toggle" v-model="localSetting.isHiddenIdTasks" />
          </label>
        </li>
        <li>
          <label class="label justify-between w-full cursor-pointer">
            <span class="label-text">Double-click to switch task execution</span>
            <input type="checkbox" class="toggle" v-model="localSetting.switchOndblclick" />
          </label>
        </li>
        <li>
          <label class="label justify-between w-full cursor-pointer">
            <span class="label-text">Compact the action section</span>
            <input type="checkbox" class="toggle" v-model="localSetting.compactAction" />
          </label>
        </li>
        <li>
          <label class="label justify-between w-full cursor-pointer">
            <span class="label-text">Show only uncompleted</span>
            <input type="checkbox" class="toggle" v-model="localSetting.showUncompleted" />
          </label>
        </li>
      </ul>
    </details>
  </div>
</template>

<script lang="ts" setup>
const { localSetting } = useUnState()

defineEmits<{ deleteAllCompletedTasks: [] }>()

const details = ref<HTMLDetailsElement>()
onClickOutside(details, () => (details.value!.open = false))
</script>
