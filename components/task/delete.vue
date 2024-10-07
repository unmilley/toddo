<template>
  <Modal title="deleteGroup" :buttons="{ position: 'between' }">
    <template #header>
      <h1>Are you sure you want to delete this task?</h1>
    </template>
    <template #content>
      <!-- <div class="divider my-0.5"></div>
      <p class="font-mono">
        <span class="bg-error text-error-content">{{ data.taskLength }}</span> tasks will also be deleted, forever!
      </p> -->
    </template>

    <template #buttons>
      <button class="btn btn-error btn-outline" @click="closeModal">Cancel</button>
      <button class="btn btn-success" @click="handleProceed">Continue</button>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
const { open: openModal, close: closeModal } = useModal('deleteGroup')

const { deleteTask } = useDatabase()

type Data = { group: string; idTask: string }

const data = reactive<Data>({
  group: '',
  idTask: '',
})

const open = ({ group, idTask }: Data) => {
  data.group = group
  data.idTask = idTask
  openModal()
}

const handleProceed = async () => {
  if (!data.group || !data.idTask) return closeModal()
  await deleteTask(data.group, data.idTask)
  closeModal()
}

defineExpose({ open })
</script>
