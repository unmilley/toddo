<template>
  <div class="form-control relative">
    <label v-if="label || label !== ''" class="label">
      <span class="label-text">{{ label ?? name }}</span>
      <slot name="label" />
    </label>
    <textarea
      ref="textarea"
      v-model="input"
      class="textarea textarea-bordered resize-none"
      :class="[inputClass, { 'textarea-error': isError }]"
      :placeholder="placeholder ?? name"
      v-bind="args"
      @blur="setTouched(true)"
      @focus="setTouched(true)"
    />
    <label class="label" v-if="!withoutError">
      <span class="label-text-alt text-left text-error" v-show="isError" v-html="errorMessage" />
    </label>
    <slot name="default" />
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import type { InputTypeHTMLAttribute, TextareaHTMLAttributes } from 'vue'

const props = defineProps<{
  name: string
  type?: InputTypeHTMLAttribute
  label?: string
  placeholder?: string
  inputClass?: string
  args?: TextareaHTMLAttributes
  autoFocus?: boolean
  withoutError?: boolean
}>()

// const textarea = ref<HTMLTextAreaElement | null>(null)
const { textarea, input } = useTextareaAutosize()

onMounted(() => {
  if (textarea.value && props.autoFocus) textarea.value.focus()
  input.value = value.value
})

const isError = computed(() => errorMessage && meta.touched && errors.value.length)

const { errorMessage, meta, value, setTouched, errors, setValue } = useField<string>(() => props.name)

watch(input, (val) => {
  setValue(val, true)
})
</script>

<style>
textarea {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

textarea::-webkit-scrollbar {
  display: none;
}
</style>
