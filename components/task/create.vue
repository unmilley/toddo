<template>
  <Modal title="taskCreate" @closed="close">
    <template #content>
      <ui-textarea
        name="task"
        placeholder="On wednesday i should buy ..."
        label="Creating a new task"
        auto-focus
        :args="{ autocomplete: 'off', maxlength: 120 }"
      />
    </template>

    <template #buttons>
      <button @click="create" class="btn btn-success" :class="{ 'btn-disabled': !meta.valid }">Continue</button>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import { CreateTaskSchema } from '~/src/validation'

const { open: openModal, close: closeModal } = useModal('taskCreate')
const { addTask } = useDatabase()

const { meta, handleSubmit, resetField } = useForm<{ task: string }>({
  validationSchema: CreateTaskSchema,
  initialValues: { task: '' },
  keepValuesOnUnmount: true,
})

const group = ref('')

const open = async (_group: string) => {
  group.value = _group
  openModal()
}

const create = handleSubmit(async (value) => {
  await addTask(group.value, value.task)

  // navigateTo(`/todo/${value.new}`)
  resetField('task')
  // allTitles.value = []
  closeModal()
})

const close = () => {
  // resetField('new')
  // allTitles.value = []
  closeModal()
}

defineExpose({ open })
</script>
