<template>
  <div v-if="isAsideFull">
    <ClientOnly>
      <div class="alert shadow-lg" v-if="user">
        <div class="avatar" v-if="user.photoURL">
          <div class="w-12 rounded-full">
            <img :src="user.photoURL" alt="" />
          </div>
        </div>

        <div>
          <h3 class="font-bold">{{ user.displayName }}</h3>
          <p
            class="text-xs"
            :class="{ 'underline decoration-error underline-offset-2 decoration-wavy': !user.emailVerified }"
          >
            {{ user.email }}
          </p>
        </div>
        <div class="tooltip tooltip-top" data-tip="Logout">
          <button @click="logout" class="btn btn-neutral btn-outline btn-square btn-sm">
            <Icon name="bx:log-out" />
          </button>
        </div>
      </div>

      <template #fallback>
        <div class="alert shadow-lg">
          <div class="flex items-center gap-4">
            <div class="skeleton size-12 shrink-0 rounded-full"></div>
            <div class="flex flex-col gap-4">
              <div class="skeleton h-4 w-20"></div>
              <div class="skeleton h-4 w-28"></div>
            </div>
          </div>
          <div class="skeleton rounded-btn ml-auto size-8"></div>
        </div>
      </template>
    </ClientOnly>
  </div>
  <div v-else>
    <ClientOnly>
      <details ref="dropdown" class="dropdown dropdown-right dropdown-end">
        <summary class="btn btn-circle bg-base-100">
          <div class="avatar" v-if="user && user.photoURL">
            <div class="w-11 rounded-full" v-if="user.photoURL">
              <img :src="user.photoURL" alt="" />
            </div>
            <div v-else>
              <Icon name="bx:user-circle" size="2.4rem" />
            </div>
          </div>
        </summary>
        <div class="dropdown-content alert ml-4 min-w-60 w-max max-w-80 bg-base-300" v-if="user">
          <div>
            <h3 class="font-bold">{{ user.displayName }}</h3>
            <p
              class="text-xs"
              :class="{ 'underline decoration-error underline-offset-2 decoration-wavy': !user.emailVerified }"
            >
              {{ user.email }}
            </p>
          </div>
          <div class="tooltip tooltip-top" data-tip="Logout">
            <button @click="logout" class="btn btn-neutral btn-outline btn-square btn-sm">
              <Icon name="bx:log-out" />
            </button>
          </div>
        </div>
      </details>

      <template #fallback>
        <summary class="btn btn-circle bg-base-100">
          <div class="avatar">
            <div><Icon name="bx:user-circle" size="2.4rem" /></div>
          </div>
        </summary>
      </template>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{ isAsideFull?: boolean }>(), { isAsideFull: false })
const { user, logout } = useAuth()
</script>

<style scoped>
@media (max-width: 640px) {
  .alert {
    grid-auto-flow: column;
    grid-template-columns: auto minmax(auto, 1fr);
    justify-items: start;
    text-align: start;
  }
}
</style>
