<template>
  <div :id="wrapperId" class="simple-typeahead w-full">
    <label class="form-control">
      <div class="label">
        <span class="label-text">Labels <small>(optional)</small></span>
      </div>
      <div class="relative">
        <input
          ref="inputRef"
          :id="inputId"
          class="input input-bordered w-full placeholder:text-sm"
          type="text"
          :placeholder="placeholder"
          v-model="input"
          @input="onInput"
          @focus="onFocus"
          @blur="onBlur"
          @keydown.down.prevent="onArrow('down')"
          @keydown.up.prevent="onArrow('up')"
          @keydown.enter.prevent="selectCurrentSelection"
          @keydown.tab.prevent="selectCurrentSelectionTab"
          @keydown.escape.prevent.stop="onBlur"
          autocomplete="off"
          v-bind="$attrs"
        />
        <ul
          v-if="isListVisible"
          class="menu backdrop-blur-lg rounded-btn border border-base-content/20 absolute w-full mt-3 outline outline-2 outline-offset-2 outline-base-content/20 z-[1]"
        >
          <li v-for="(item, index) in filteredItems" :key="index">
            <div
              class="py-1 text-sm font-normal"
              :class="{ active: currentSelectionIndex == index }"
              @mousedown.prevent
              @click="selectItem(item)"
              @mouseenter="currentSelectionIndex = index"
            >
              <span v-html="boldMatchText(item)"></span>
            </div>
          </li>
        </ul>
      </div>
    </label>
  </div>
</template>

<script setup lang="ts">
type TypeAHeadEvent = { input: string; items: string[] }
const emit = defineEmits<{
  (e: 'input', value: TypeAHeadEvent): void
  (e: 'focus', value: TypeAHeadEvent): void
  (e: 'blur', value: TypeAHeadEvent): void
  (e: 'selectItem', value: string): void
}>()

defineOptions({
  inheritAttrs: false,
})
const props = withDefaults(
  defineProps<{
    id?: string
    placeholder?: string
    items: string[]
    defaultItem?: any
    minInputLength?: number
    minItemLength?: number
    selectOnTab?: boolean
  }>(),
  {
    placeholder: '',
    defaultItem: null,
    minInputLength: 2,
    minItemLength: 0,
    selectOnTab: true,
  }
)

const inputId = ref(props.id || `typeahead_${(Math.random() * 1000).toFixed()}`)
const input = ref('')
const isInputFocused = ref(false)
const currentSelectionIndex = ref(0)
const inputRef = ref<HTMLInputElement>()

onMounted(() => {
  if (props.defaultItem !== undefined && props.defaultItem !== null) {
    selectItem(props.defaultItem)
  }
})
const onInput = () => {
  isInputFocused.value = true
  if (isListVisible.value && currentSelectionIndex.value >= filteredItems.value.length) {
    currentSelectionIndex.value = (filteredItems.value.length || 1) - 1
  }
  emit('input', { input: input.value, items: filteredItems.value })
}
const onFocus = () => {
  isInputFocused.value = true
  emit('focus', { input: input.value, items: filteredItems.value })
}
const onBlur = () => {
  isInputFocused.value = false
  emit('blur', { input: input.value, items: filteredItems.value })
}
const onArrow = (key: 'down' | 'up') => {
  if (key === 'down' && isListVisible.value && currentSelectionIndex.value < filteredItems.value.length - 1) {
    currentSelectionIndex.value++
  } else if (key === 'up' && isListVisible.value && currentSelectionIndex.value > 0) {
    currentSelectionIndex.value--
  }
  scrollSelectionIntoView()
}

const scrollSelectionIntoView = () => {
  setTimeout(() => {
    const listNode = document.querySelector<HTMLDivElement>(`#${wrapperId.value} .menu`)
    const activeNode = document.querySelector<HTMLDivElement>(`#${wrapperId.value} .menu li .active`)

    if (!listNode || !activeNode) return

    const { offsetTop: activeOffset, offsetHeight: activeHeight } = activeNode
    const { scrollTop, offsetHeight: listHeight } = listNode

    const isInView = activeOffset >= scrollTop && activeOffset + activeHeight <= scrollTop + listHeight

    if (!isInView) {
      const scrollTo = activeOffset > scrollTop ? activeOffset + activeHeight - listHeight : activeOffset

      listNode.scrollTo(0, scrollTo)
    }
  })
}
const selectCurrentSelection = () => {
  selectItem(currentSelection.value ? currentSelection.value : input.value)
  isInputFocused.value = false
}
const selectCurrentSelectionTab = () => {
  if (props.selectOnTab) {
    selectCurrentSelection()
  } else {
    inputRef.value?.blur()
  }
}
const selectItem = (item: string) => {
  input.value = ''
  currentSelectionIndex.value = 0
  emit('selectItem', item)
}
const escapeRegExp = (string: string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
const boldMatchText = (text: string) => {
  const regexp = new RegExp(`(${escapeRegExp(input.value)})`, 'ig')
  return text.replace(regexp, '<strong>$1</strong>')
}

const wrapperId = computed(() => `${useId()}_wrapper`)

const filteredItems = computed(() => {
  const regexp = new RegExp(escapeRegExp(input.value), 'i')

  return props.items.filter((item) => item.match(regexp))
})
const isListVisible = computed(() => {
  return (
    isInputFocused.value &&
    input.value.length >= props.minInputLength &&
    filteredItems.value.length > props.minItemLength
  )
})
const currentSelection = computed(() => {
  return isListVisible.value && currentSelectionIndex.value < filteredItems.value.length
    ? filteredItems.value[currentSelectionIndex.value]
    : undefined
})
</script>
