<template>
  <footer class="bg-base-100 rounded-b-box border-t border-base-content/10">
    <div class="justify-start w-3/4">
      <div class="flex items-center md:flex-row flex-col">
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
    </div>
    <div class="justify-end w-1/4">
      <NuxtLink to="https://milley.uno" target="_blank" class="btn btn-sm border-base-content">
        <Icon name="bxs:cookie" size="1.25rem" />
        <!-- <span>Milley</span> -->
      </NuxtLink>
    </div>
  </footer>
</template>

<style lang="css" scoped>
footer {
  @apply flex items-center p-2 min-h-16 w-full;
  & > * {
    @apply inline-flex items-center;
  }
}
</style>
