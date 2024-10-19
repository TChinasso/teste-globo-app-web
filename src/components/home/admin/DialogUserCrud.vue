<template>
  <v-dialog v-model="dialog" width="auto">
    <v-card
      max-width="600"
      width="400"
      prepend-icon="mdi-badge-account-outline"
      :title="!userForm.id ? 'Criar usuario' : 'Editar usuario'"
    >
      <v-card-text>
        <v-form @submit.prevent="handleSubmit" v-model="form">
          <v-text-field
            variant="outlined"
            color="primary"
            label="email"
            v-model="userForm.email"
            :disabled="Boolean(userForm.id)"
            :rules="[validationRequired, validateEmail]"
            validate-on="blur"
            class="mb-2"
          ></v-text-field>
          <v-text-field
            variant="outlined"
            color="primary"
            label="Nome"
            type="name"
            v-model="userForm.name"
            :rules="[validationRequired]"
            class="mb-2"
          ></v-text-field>
          <v-select
            variant="outlined"
            :items="accessLevelItems"
            color="primary"
            label="Nivel de acesso"
            v-model="userForm.access_level"
            :rules="[validationRequired]"
            class="mb-2"
          ></v-select>
          <v-text-field
            v-if="!userForm.id"
            variant="outlined"
            color="primary"
            label="password"
            v-model="userForm.password"
            :rules="[validationRequired]"
            class="mb-2"
          ></v-text-field>
          <v-btn
            :disabled="!form && userForm != userFirstData"
            :loading="loadingSubmit"
            rounded
            color="primary"
            class="w-full"
            type="submit"
            >{{ userForm.id ? 'alterar' : 'criar' }}</v-btn
          >
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import type { User } from '@/services/user.service'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'

const dialog = ref(false)
const userFirstData = ref(null)
const open = (user?: User) => {
  if (user?.email) {
    userForm.value = JSON.parse(JSON.stringify(user))
    userFirstData.value = JSON.parse(JSON.stringify(user))
  } else {
    userForm.value = {
      email: '',
      name: '',
      password: '',
      id: undefined,
      access_level: 'USER',
    }
  }
  dialog.value = true
}

const authStore = useAuthStore()
const userStore = useUserStore()
const loadingSubmit = ref(false)
const form = ref(false)
const accessLevelItems = ref([
  { title: 'Administrador', value: 'ADMIN' },
  { title: 'Usuario', value: 'USER' },
])
const userForm = ref({
  email: '',
  name: '',
  password: '',
  id: undefined,
  access_level: 'USER',
})

const validateEmail = async (value: string) => {
  if (userForm.value.id) return true
  try {
    await authStore.validateEmail(value)
  } catch (e) {
    return 'Email ja existente'
  }
  return true
}
const validationRequired = (value: string) => {
  if (!value) return 'Campo obrigatório'
  return true
}

const handleSubmit = async () => {
  let response = null
  try {
    loadingSubmit.value = true
    if (userForm.value.id) {
      response = await userStore.patchUser(userForm.value)
      emit('showSnackBar', 'Usuario alterado com sucesso!')
    } else {
      response = await userStore.createUser(userForm.value)
      emit('showSnackBar', 'Usuario criado com sucesso!')
    }
    emit('updateTable', response)
    dialog.value = false
  } catch (error: any) {
    console.error(error.message)
  } finally {
    loadingSubmit.value = false
  }
}
const emit = defineEmits(['updateTable', 'showSnackBar'])
defineExpose({
  open,
})
</script>

<style></style>
