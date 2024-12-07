<template>
  <div class="grid h-dvh overflow-hidden">
    <div class="h-auto overflow-hidden">
      <div class="layout-grid grid relative gap-x-0.5 md:gap-x-3 h-full bg-base-300 py-3 pr-3 pl-2">
        <layout-aside ref="aside" />
        <layout-navbar @menu="$refs.aside?.openDrawer()" />
        <div class="[grid-area:_content] flex justify-between overflow-hidden relative">
          <div class="flex-grow rounded-xl bg-base-100 overflow-hidden relative">
            <div class="pl-6 h-full overflow-y-scroll overflow-x-hidden">
              <div class="px-2 flex flex-col justify-between min-h-full">
                <main class="">
                  <slot />
                </main>
                <layout-footer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.layout-grid {
  grid-template:
    'aside navbar' auto
    'aside content' 1fr / auto 1fr;
}
</style>
