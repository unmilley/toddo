<template>
  <div class="flex shrink-0 items-center pl-5 w-full h-16 bg-base-100 rounded-xl" v-if="user">
    <div class="flex gap-4 items-center w-full">
      <div class="relative size-9 flex items-center justify-center">
        <details class="dropdown dropdown-top" ref="details">
          <summary class="btn btn-circle btn-ghost btn-outline">
            <div class="avatar">
              <div class="w-10 rounded-full" v-if="user.photoURL">
                <img :src="user.photoURL" :alt="user.displayName ?? ''" />
              </div>
            </div>
          </summary>
          <div class="dropdown-content z-[1] card card-compact bg-base-100 w-60 shadow-xl">
            <div class="card-body">
              <h2 class="card-title">{{ user.displayName }}</h2>
              <ul class="menu bg-base-100 rounded-box shadow">
                <li><a @click="logout()">Logout</a></li>
              </ul>
            </div>
          </div>
        </details>
      </div>
      <div
        class="flex flex-col gap-1 grow min-w-0 h-fit transition-opacity"
        :class="[isAsideFull ? 'opacity-100' : 'opacity-0']"
      >
        <div class="truncate block text-sm" :title="user.displayName ?? ''">{{ user.displayName }}</div>
        <p
          class="text-xs decoration-error underline-offset-2 decoration-wavy"
          :class="{ 'underline ': !user.emailVerified }"
          :title="user.email"
          v-if="user.email"
        >
          {{ truncateEmail(user.email) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ isAsideFull: boolean }>()
const { user, logout } = useAuth()

const details = ref<HTMLDetailsElement>()
onClickOutside(details, () => (details.value!.open = false))

const truncateEmail = (email: string) => {
  const [title, mail] = email.split('@')

  if (!mail || title.length <= 10) return email

  const halfLength = Math.floor(title.length / 2)
  return `${title.slice(0, halfLength)}...@${mail}`
}
</script>
