<template>
  <Modal title="createGroup" @closed="close">
    <template #content>
      <ui-input
        name="new"
        type="text"
        placeholder="New Group"
        label="Creating a new group"
        auto-focus
        :args="{ autocomplete: 'off', maxlength: 20 }"
      />
    </template>

    <template #buttons>
      <button @click="create" class="btn btn-success" :class="{ 'btn-disabled': !meta.valid }">Continue</button>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import { CreateGroupSchema } from '~/src/validation'

const { open, close: closeModal } = useModal('createGroup')

const { meta, handleSubmit, setFieldValue, resetField, setFieldError } = useForm<{ new: string }>({
  validationSchema: CreateGroupSchema,
  initialErrors: {
    new: 'Field is required.',
  },
  keepValuesOnUnmount: true,
})

const allTitles = ref<string[]>([])

const openModal = async (title: string, _allTitles: string[]) => {
  setFieldValue('new', title)

  allTitles.value = _allTitles
  open()
}

const create = handleSubmit(async (value) => {
  if (allTitles.value.includes(value.new)) {
    setFieldError('new', 'This group already exists')
    return
  }

  navigateTo(`/todo/${value.new}`)
  resetField('new')
  allTitles.value = []
  closeModal()
})

const close = () => {
  resetField('new')
  allTitles.value = []
  closeModal()
}

defineExpose({ openModal })
</script>
