<template>
  <div class="flex justify-center items-center h-screen">
    <form class="max-w-xs space-y-4" autocomplete="off" @submit.prevent="handleSubmit()">
      <div class="indicator w-full max-w-xs" v-if="!isLogin">
        <input
          type="text"
          placeholder="Your username"
          class="input input-bordered input-secondary w-full"
          v-model="username"
        />
      </div>
      <div class="indicator w-full max-w-xs">
        <input
          type="email"
          placeholder="Your email address"
          class="input input-bordered input-secondary w-full"
          v-model="email"
        />
      </div>
      <div class="indicator w-full max-w-xs">
        <input
          type="password"
          placeholder="Your password"
          class="input input-bordered input-secondary w-full"
          v-model="password"
        />
      </div>
      <button class="btn btn-block" type="submit">{{ isLogin ? 'Sign in' : 'Sign up' }}</button>

      <p class="hover:underline cursor-pointer text-center w-full" @click="isLogin = !isLogin">
        {{ isLogin ? 'Have not an account?' : 'Have an account?' }}
      </p>

      <div class="divider">OR</div>
      <button type="button" class="btn btn-block btn-disabled" @click.prevent.stop="handleSubmit('google')">
        Google
      </button>
      <button type="button" class="btn btn-block btn-secondary" @click.prevent.stop="handleSubmit('github')">
        GitHub
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['auth'])
const isLogin = ref(true)

const username = ref('')
const email = ref('')
const password = ref('')

const { handleSignIn, handleSignUp } = useAuth()

const handleSubmit = async (hasProvider?: 'github' | 'google') => {
  emit('auth')
  if (hasProvider) {
    // await handleOAuthLogin(hasProvider)
    return
  }
  if (isLogin.value) {
    // await handleSignIn(email.value, password.value)
  } else {
    // await handleSignUp(email.value, password.value, username.value)
  }
}
</script>

<style scoped></style>
