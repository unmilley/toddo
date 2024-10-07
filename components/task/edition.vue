<template>
  <Modal title="rename" @closed="close">
    <template #content>
      <ui-textarea
        name="editTask"
        placeholder="On wednesday i should buy ..."
        label="Edit this task"
        auto-focus
        :args="{ autocomplete: 'off', maxlength: 120 }"
      />
    </template>

    <template #buttons>
      <button v-if="!isSubmitting" @click="renameSave" class="btn btn-success" :class="{ 'btn-disabled': !meta.valid }">
        Continue
      </button>

      <button v-else type="button" class="btn btn-success pointer-events-none select-none">
        <span class="invisible">Continue</span>
        <span class="loading loading-ring absolute"></span>
      </button>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import { EditTaskSchema } from '~/src/validation'

const { updateTask } = useDatabase()
const { open: openModal, close: closeModal } = useModal('rename')

const group = ref<string>('')
const taskId = ref<string>('')
const oldTask = ref<string>('')

const { meta, handleSubmit, isSubmitting, setFieldValue, resetField } = useForm<{ editTask: string }>({
  validationSchema: EditTaskSchema,
  keepValuesOnUnmount: true,
})

const open = async (_group: string, id: string, task: string) => {
  group.value = _group
  taskId.value = id
  oldTask.value = task
  setFieldValue('editTask', task)
  openModal()
}

const renameSave = handleSubmit(async (value) => {
  if (oldTask.value === value.editTask) {
    close()
    return
  }

  await updateTask(group.value, taskId.value, value.editTask)
  resetField('editTask')
  oldTask.value = ''
  closeModal()
})

const close = () => {
  resetField('editTask')
  oldTask.value = ''
  closeModal()
}
defineExpose({ open })
</script>
