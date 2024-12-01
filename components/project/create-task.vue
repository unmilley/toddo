<template>
  <Modal name="createTask" :buttons="{ position: 'right' }">
    <template #header>
      <h2 class="text-lg">{{ groupTitle }}</h2>
    </template>
    <template #content>
      <div class="card card-compact bg-base-100 shadow-2xl">
        <form class="card-body">
          <UiTextarea
            name="task"
            placeholder="Implement password reset functionality"
            :args="{ maxlength: 250 }"
            label="Task"
            without-error
          />
          <div class="">
            <Typeahead
              id="labels-typeahead"
              placeholder="shopping"
              :items="mergedArray"
              :minInputLength="0"
              @selectItem="selectItem"
            />
            <div class="flex flex-wrap gap-2 mt-3 mb-2">
              <template v-for="(badge, idx) in labels" :key="badge + idx">
                <div class="badge badge-outline cursor-pointer" @click="removeOption(idx)">
                  {{ badge }}
                </div>
              </template>
            </div>
          </div>
        </form>
      </div>
    </template>

    <template #buttons>
      <button class="btn btn-success" @click="console.log('qwe')">Create</button>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
const props = defineProps<{ groupTitle: string; labelsList: string[] }>()
const labels = reactive<string[]>([])

const mergedArray = computed(() => {
  const combined = [...labels, ...props.labelsList]
  return combined.filter((el) => !(labels.includes(el) && props.labelsList.includes(el)) && !labels.includes(el))
})

const removeOption = (index: number) => {
  if (index >= 0 && index < labels.length) labels.splice(index, 1)
}

const selectItem = (item: string) => {
  if (labels.includes(item)) return
  labels.push(item)
}
</script>
