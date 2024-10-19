<template>
  <div class="sm:w-96 login border p-9 mx-4 rounded-lg elevation-2 w-full">
    <v-form @submit.prevent="handleSignUp" v-model="form">
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
      <v-text-field
        variant="outlined"
        color="primary"
        label="email"
        type="email"
        autocomplete="username"
        v-model="signupForm.email"
        :rules="[validationRequired, validateEmail]"
        validate-on="blur"
        class="mb-2"
      ></v-text-field>
      <v-text-field
        variant="outlined"
        color="primary"
        label="Nome"
        type="name"
        v-model="signupForm.name"
        :rules="[validationRequired]"
        class="mb-2"
      ></v-text-field>
      <v-text-field
        variant="outlined"
        color="primary"
        label="password"
        type="password"
        autocomplete="new-password"
        v-model="signupForm.password"
        :rules="[validationRequired]"
        class="mb-2"
      ></v-text-field>
      <v-btn
        :disabled="!form"
        :loading="loadingSIgnUp"
        rounded
        color="primary"
        class="w-full"
        type="submit"
        >Registrar</v-btn
      >
      <div class="flex mt-4 justify-center">
        <span
          @click="emit('goToSignIn')"
          class="text-primary text-xs cursor-pointer"
          >Voltar ao login</span
        >
      </div>
    </v-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import logoGlobo from '@/assets/logo.png'

const authStore = useAuthStore()
const loadingSIgnUp = ref(false)
const form = ref(false)
const signupForm = ref({
  email: '',
  name: '',
  password: '',
})

const validateEmail = async (value: string) => {
  try {
    await authStore.validateEmail(value)
  } catch (e) {
    return 'Email ja existente'
  }
  return true
}
const validationRequired = (value: any) => {
  if (!value) return 'Campo obrigatório'
  return true
}

const handleSignUp = async () => {
  try {
    loadingSIgnUp.value = true
    await authStore.signUp(signupForm.value)
    emit('goToSignIn')
  } catch (error: any) {
    console.error(error.message)
  } finally {
    loadingSIgnUp.value = false
  }
}

const emit = defineEmits(['goToSignIn'])
</script>

<style></style>
