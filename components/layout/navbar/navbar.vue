<template>
  <header class="[grid-area:_navbar] navbar bg-base-100 rounded-xl mb-3">
    <div class="navbar-start">
      <label class="btn btn-square swap hidden md:inline-grid">
        <input type="checkbox" v-model="ls.isAsideFull" />
        <Icon name="t:left-panel-open" size="1.5rem" class="swap-off" />
        <Icon name="t:left-panel-close" size="1.5rem" class="swap-on" />
      </label>
      <button class="btn btn-square inline-grid md:hidden" @click="$emit('menu')">
        <Icon name="bx:menu" size="1.5rem" />
      </button>
    </div>
    <div class="navbar-center"></div>
    <div class="navbar-end">
      <layout-navbar-theme />
    </div>
  </header>
</template>

<script lang="ts" setup>
defineEmits<{ menu: [] }>()
const { localSetting: ls } = useUnState()
</script>
