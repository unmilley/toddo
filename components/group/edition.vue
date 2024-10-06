<template>
  <Modal title="rename" @closed="close">
    <template #content>
      <ui-input
        name="new"
        type="text"
        placeholder="New Group"
        label="Rename this group"
        auto-focus
        :args="{ autocomplete: 'off' }"
      />
      <pre>meta: {{ meta }}</pre>
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
import { RenameGroupSchema } from '~/src/validation'

const { updateGroup } = useDatabase()
const { open: openModal, close: closeModal } = useModal('rename')

const title = reactive<{ old: string; all: string[] }>({
  old: '',
  all: [],
})

const { meta, handleSubmit, isSubmitting, setFieldValue, resetField, setFieldError } = useForm<{ new: string }>({
  validationSchema: RenameGroupSchema,
  initialErrors: {
    new: 'Field is required.',
  },
  keepValuesOnUnmount: true,
})

const renameStart = async (_title: string, all: string[]) => {
  title.old = _title
  title.all = all
  setFieldValue('new', _title)
  openModal()
}

const renameSave = handleSubmit(async (value) => {
  if (title.old === value.new) {
    close()
    return
  }

  if (title.all.includes(value.new)) {
    setFieldError('new', 'This group already exists')
    return
  }

  await updateGroup(title.old, value.new)
  resetField('new')
  title.old = ''
  closeModal()
})

const close = () => {
  resetField('new')
  title.old = ''
  closeModal()
}
defineExpose({ renameStart })
</script>
