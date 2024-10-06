<template>
  <Teleport to="#teleports">
    <ClientOnly>
      <transition @enter="toggleVisible" @leave="toggleVisible">
        <dialog
          class="modal modal-bottom sm:modal-middle"
          v-if="visible"
          @click="handleClose"
          @keydown.escape="handleClose"
        >
          <div class="modal-box" :class="{ 'pt-4': !header }" @click.stop="" @keydown.escape="handleClose">
            <div v-if="header">
              <slot name="header" />
            </div>
            <slot name="content" />

            <div class="modal-action" :class="buttonPosition" v-if="isButtonsEnabled">
              <slot name="buttons">
                <button class="btn btn-error" @click="handleClose">Отменить</button>
                <button class="btn btn-success" @click="handleProceed">Продолжить</button>
              </slot>
            </div>
          </div>
        </dialog>
      </transition>
    </ClientOnly>
  </Teleport>
</template>

<script lang="ts" setup>
const modelValue = defineModel<boolean>({ required: false, default: false })

type ModalProps = {
  title?: string
  header?: boolean
  buttons?: {
    enabled?: boolean
    position?: 'left' | 'right' | 'center' | 'between'
  }
}

const { title, buttons } = withDefaults(defineProps<ModalProps>(), {
  header: true,
  buttons: () => ({
    enabled: true,
    position: 'right',
  }),
})
const isButtonsEnabled = computed(() => (typeof buttons.enabled === 'undefined' ? true : buttons.enabled))

const buttonPosition = computed(() => {
  const positionClasses = {
    left: 'justify-start',
    right: 'justify-end',
    center: 'justify-center',
    between: 'justify-between',
  }

  return positionClasses[buttons.position ?? 'right']
})

const { open, close, toggle, visible } = useModal(title)

const emit = defineEmits<{
  closed: []
  proceed: []
}>()

defineExpose({ open, close, toggle, visible })

const handleClose = () => {
  close()
  emit('closed')
}

const handleProceed = () => {
  close()
  emit('proceed')
}

watch(
  modelValue,
  (value, oldValue) => {
    if (value !== oldValue) toggle(value)
  },
  { immediate: true }
)

watch(visible, (value) => (modelValue.value = value))

const toggleVisible = (el: Element, done: () => void) => {
  el.classList.toggle('modal-open')
  setTimeout(done, 200)
}
</script>

<style>
:root:has(:is(.modal-open, .modal:target, .modal-toggle:checked + .modal, .modal[open])) {
  overflow: hidden;
  scrollbar-gutter: auto;
}
</style>
