<template>
  <div class="form-control relative">
    <label class="label">
      <span class="label-text">{{ label ?? name }}</span>
      <slot name="label" />
    </label>
    <input
      ref="input"
      :type="type ?? 'text'"
      v-model.trim="value"
      class="input input-bordered"
      :class="[inputClass, { 'input-error': isError }]"
      :placeholder="placeholder ?? name"
      v-bind="args"
      @blur="setTouched(true)"
    />
    <label class="label">
      <span class="label-text-alt text-left text-error" v-show="isError" v-html="errorMessage" />
    </label>
    <slot name="default" />
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import type { InputHTMLAttributes, InputTypeHTMLAttribute } from 'vue'

const props = defineProps<{
  name: string
  type?: InputTypeHTMLAttribute
  label?: string
  placeholder?: string
  inputClass?: string
  args?: InputHTMLAttributes
  autoFocus?: boolean
}>()

const input = ref<HTMLInputElement | null>(null)

onMounted(() => {
  if (input.value && props.autoFocus) input.value.focus()
})

const isError = computed(() => errorMessage && meta.touched && errors.value.length)

const { errorMessage, meta, value, setTouched, errors } = useField(() => props.name)
</script>
