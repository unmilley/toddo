<template>
  <footer
    class="flex justify-between items-center w-full text-sm p-2 bg-base-100 fixed bottom-0 rounded-b-box ~md:rounded-br-none"
  >
    <div class="flex items-center ~w-full md:flex-row flex-col w-max">
      <p class="flex items-center gap-0.5">
        <span>Made with</span>
        <Icon name="bxs:heart" size="1rem" class="text-primary" />
        <span>and</span>
        <Icon name="bx:coffee-togo" size="1rem" class="text-primary" />
      </p>
      <div class="divider divider-vertical md:divider-horizontal !m-0"></div>
      <p>
        © {{ new Date().getFullYear() }} ─
        <NuxtLink class="link" to="https://github.com/unmilley/toddo/blob/master/LICENSE" target="_blank"
          >MIT License</NuxtLink
        >
      </p>
    </div>
    <NuxtLink to="https://milley.uno" target="_blank" class="btn btn-sm border-base-content">
      <Icon name="bxs:cookie" size="1.25rem" />
      <span>Milley</span>
    </NuxtLink>
  </footer>
</template>

<script lang="ts" setup></script>
