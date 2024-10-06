<template>
  <Modal title="deleteGroup" :buttons="{ position: 'between' }">
    <template #header>
      <h1>
        Are you sure you want to delete the <span class="bg-error text-error-content">{{ data.title }}</span> group?
      </h1>
    </template>
    <template #content>
      <div class="divider my-0.5"></div>
      <p class="font-mono">
        <span class="bg-error text-error-content">{{ data.taskLength }}</span> tasks will also be deleted, forever!
      </p>
    </template>

    <template #buttons>
      <button class="btn btn-error btn-outline" @click="closeModal">Cancel</button>
      <button class="btn btn-success" @click="handleProceed">Continue</button>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
const { open, close: closeModal } = useModal('deleteGroup')

const { deleteGroup } = useDatabase()

type Data = { title: string; taskLength: number }

const data = reactive<Data>({
  title: '',
  taskLength: 0,
})

const openModal = ({ title, taskLength }: Data) => {
  data.title = title
  data.taskLength = taskLength
  open()
}

const handleProceed = async () => {
  await deleteGroup(data.title)
  closeModal()
}

defineExpose({ openModal })
</script>
