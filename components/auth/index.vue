<template>
  <div>
    <!--  -->
    <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div class="card-body">
        <h2 class="card-title mb-4">{{ title }}</h2>

        <div class="tooltip tooltip-open" data-tip="🚧 later... 🚧">
          <button class="btn btn-ghost btn-outline w-full" disabled>
            Continue with Google
            <Icon name="bxl-google" class="size-6" />
          </button>
          <button class="btn btn-ghost btn-outline w-full mt-4" @click="handleSignWithGithub">
            Continue with Github
            <Icon name="bxl-github" class="size-6" />
          </button>
        </div>

        <div class="divider uppercase">Or</div>

        <auth-sign-in v-if="isLogin" />
        <auth-sign-up v-else />
        <div class="self-center text-sm mt-8 lg:mt-4">
          <div>
            <span class="">{{ isLogin ? `You don't have an account? ` : 'Do you have an account? ' }}</span>
            <span class="cursor-pointer underline transition hover:text-primary" @click="isLogin = !isLogin">
              {{ isLogin ? 'Register' : 'Sign in' }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <!--  -->
  </div>
</template>

<script setup lang="ts">
const isLogin = ref(true)

const { handleSignWithGithub } = useAuth()

const title = computed(() => (isLogin.value ? 'Sign in' : 'Create an account'))
</script>
