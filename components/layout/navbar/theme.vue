<template>
  <client-only fallback-tag="div">
    <details class="dropdown dropdown-end" ref="details">
      <summary class="btn btn-ghost btn-square btn-outline">
        <Icon name="mill:palette" size="1.5rem" />
      </summary>
      <ul class="menu dropdown-content bg-base-200 rounded-box z-[1] w-36">
        <li v-for="(t, value) in themes" :key="t.title">
          <a :class="{ 'text-primary': $colorMode.preference === value }" @click="changeTheme(value)">
            <Icon :name="t.icon" />
            {{ t.title }}
          </a>
        </li>
      </ul>
    </details>
    <template #fallback>
      <div class="btn btn-ghost btn-square btn-outline no-animation">
        <Icon name="mill:palette" size="1.5rem" />
      </div>
    </template>
  </client-only>
</template>

<script lang="ts" setup>
const colorMode = useColorMode()
type Themes = { [x: string]: { title: string; icon: string } }

const { isMobile } = useUnState()

const themes = computed(
  (): Themes => ({
    dark: { title: 'Dark', icon: 'bxs:moon' },
    light: { title: 'Light', icon: 'bxs:sun' },
    system: { title: 'System', icon: isMobile.value ? 'bx:mobile' : 'bx:desktop' },
  })
)

const details = ref<HTMLDetailsElement>()
onClickOutside(details, () => (details.value!.open = false))

const changeTheme = (value: string | number) => {
  if (colorMode.preference === value) return
  colorMode.preference = value as string
}
</script>
