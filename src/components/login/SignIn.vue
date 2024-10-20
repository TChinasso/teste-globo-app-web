<template>
  <div class="sm:w-96 login border p-9 mx-4 rounded-lg elevation-2 w-full">
    <div class="pb-9">
      <v-img
        class="m-auto"
        :width="150"
        aspect-ratio="16/9"
        cover
        lazy
        :src="logoGlobo"
      ></v-img>
    </div>
    <div>
      <v-alert
        v-if="showLoginAttemptError"
        text="Falha ao efetuar login, verifique suas credenciais e tente novamente."
        type="error"
        variant="tonal"
        class="mb-9"
      ></v-alert>
    </div>
    <v-form @submit.prevent="handleSignIn" :value="false">
      <v-text-field
        variant="outlined"
        color="primary"
        label="email"
        type="email"
        autocomplete="username"
        v-model="loginForm.email"
      ></v-text-field>
      <v-text-field
        variant="outlined"
        color="primary"
        label="password"
        type="password"
        autocomplete="current-password"
        v-model="loginForm.password"
      ></v-text-field>
      <v-btn
        :loading="loadingLoggin"
        :disabled="!loginForm.email.length || !loginForm.password.length"
        rounded
        color="primary"
        class="w-full"
        type="submit"
        >Login</v-btn
      >
      <div class="flex mt-4 justify-center">
        <span @click="goToSignUp" class="text-primary text-xs cursor-pointer"
          >Nao possui uma conta?</span
        >
      </div>
    </v-form>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '../../stores/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { SubmitEventPromise } from 'vuetify'
import logoGlobo from '@/assets/logo.png'

const router = useRouter()
const emit = defineEmits(['goToSignUp'])

const authStore = useAuthStore()
const loginForm = ref({ email: '', password: '' })
const loadingLoggin = ref(false)
const showLoginAttemptError = ref(false)
const handleSignIn = async (event: SubmitEventPromise) => {
  try {
    loadingLoggin.value = true
    await authStore.signIn(loginForm.value)
    router.push('/')
  } catch (error: any) {
    console.error(error.message)
    showLoginAttemptError.value = true
  } finally {
    loadingLoggin.value = false
  }
}

const goToSignUp = () => {
  emit('goToSignUp')
}
</script>

<style></style>
