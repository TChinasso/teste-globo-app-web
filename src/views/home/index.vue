<template>
  <v-app-bar>
    <v-btn v-if="$vuetify.display.width <= 600" @click="drawer = !drawer" icon
      ><v-icon>mdi-menu</v-icon></v-btn
    >
  </v-app-bar>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    :permanent="$vuetify.display.width > 600"
    :temporary="$vuetify.display.width <= 600"
    @click="rail = false"
  >
    <v-list-item
      prepend-avatar="https://avatar.iran.liara.run/public/boy"
      :title="authStore.user?.name"
      nav
    >
      <template v-slot:append>
        <v-btn
          v-if="$vuetify.display.width > 600"
          icon="mdi-chevron-left"
          variant="text"
          @click.stop="rail = !rail"
        ></v-btn>
      </template>
    </v-list-item>

    <v-divider></v-divider>
    <v-list color="primary" @click.prevent>
      <v-list-item
        prepend-icon="mdi-login"
        title="Login"
        link
        to="/login"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        title="Dash Board"
        link
        to="/dashboard"
      ></v-list-item>

      <v-list-item
        v-if="checkCredentials({ allowed: ['ADMIN'] })"
        prepend-icon="mdi-cog"
        title="Gerenciamento"
        link
        to="/admin"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
  <div class="w-full h-full flex justify-center">
    <RouterView class="container"></RouterView>
  </div>
</template>
<script setup lang="ts">
import { vuetify } from '@/plugins/vuetify'
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
const authStore = useAuthStore()
const rail = ref(false)
const drawer = ref(true)

const checkCredentials = (options: { allowed: string[] }) => {
  const user = authStore.user
  if (options.allowed.includes(user.access_level)) {
    return true
  }
  return false
}
</script>
