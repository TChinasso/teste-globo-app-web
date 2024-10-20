<template>
  <div class="container mt-6">
    <h1 class="pa-4 text-xl text-primary">Gerencimento de usuarios</h1>
    <v-data-table
      :loading="loadingUsers"
      :mobile="$vuetify.display.width <= 600"
      :items="users"
      :headers="headers"
    >
      <template v-slot:item.access_level="{ item }">
        <div class="">
          <span class="capitalize">{{
            translateAccessLevel(item?.access_level)
          }}</span>
        </div>
      </template>
      <template v-slot:item.actions="{ item }">
        <div class="flex gap-2 justify-end">
          <v-btn
            rounded
            color="blue"
            prepend-icon="mdi-pencil-circle"
            variant="outlined"
            class="capitalize"
            @click="openDialogUserCrud(item)"
            >Alterar</v-btn
          >
          <v-btn
            rounded
            class="capitalize"
            color="red"
            prepend-icon="mdi-close-circle"
            variant="outlined"
            @click="removeUser(item)"
            >Remover</v-btn
          >
        </div>
      </template>
    </v-data-table>
    <div class="absolute-btn">
      <v-btn
        @click="openDialogUserCrud()"
        class="shadow-slate-400 shadow-xl"
        color="primary"
        size="60"
        icon
        ><v-icon icon="mdi-plus"></v-icon
      ></v-btn>
    </div>
  </div>
  <DialogUserCrud
    @updateTable="handleUpdateTable"
    ref="dialogUserCrud"
    @showSnackBar="handleShowSnackBar"
  ></DialogUserCrud>
  <v-snackbar v-model="snackbar">
    {{ snackBarText }}

    <template v-slot:actions>
      <v-btn color="pink" variant="text" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script setup lang="ts">
import DialogUserCrud from '@/components/home/admin/DialogUserCrud.vue'
import type { User } from '@/services/user.service'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { onBeforeMount, ref, useTemplateRef } from 'vue'
const userStore = useUserStore()
const { users } = storeToRefs(userStore)
const loadingUsers = ref(false)
onBeforeMount(async () => {
  loadingUsers.value = true
  await userStore.getUsers()
  loadingUsers.value = false
})

const headers = ref<any[]>([
  { title: 'Id', key: 'id' },
  { title: 'Nome', key: 'name' },
  { title: 'Email', key: 'email' },
  { title: 'Permissão', key: 'access_level' },
  { title: 'Ações', key: 'actions', align: 'end' },
])

const dialogUserCrud = useTemplateRef('dialogUserCrud')
const openDialogUserCrud = (user?: User) => {
  dialogUserCrud.value?.open(user)
}

const handleUpdateTable = (user: User) => {
  const index = users.value.findIndex((u: any) => u.id == user.id)
  if (index >= 0) {
    users.value.splice(index, 1, user)
  } else {
    users.value.unshift(user)
  }
}
const handleShowSnackBar = (message: string) => {
  snackbar.value = true
  snackBarText.value = message
}
const snackbar = ref(false)
const snackBarText = ref('')

const translateAccessLevel = (string: 'ADMIN' | 'USER') => {
  const dict = {
    ADMIN: 'Administrador',
    USER: 'Usuario',
  }
  return dict[string]
}

const removeUser = (user: User) => {
  const indexOfUser = users.value.findIndex(item => {
    return item.id == user.id
  })
  users.value.splice(indexOfUser, 1)
  handleShowSnackBar('Usuarrio removido com sucesso!')
}
</script>

<style lang="css" scoped>
.absolute-btn {
  position: fixed !important;
  bottom: 12px;
  right: 12px;
}
</style>
