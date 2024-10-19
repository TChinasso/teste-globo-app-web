<template>
  <div
    class="container h-full flex items-center justify-center grow self-center mx-auto"
  >
    <SignIn v-if="view == 'signin'" @go-to-sign-up="setView('signup')" />
    <SignUp v-else-if="view == 'signup'" @go-to-sign-in="setView('signin')" />
  </div>
</template>
<script setup lang="ts">
import SignIn from '@/components/login/SignIn.vue'
import SignUp from '@/components/login/SignUp.vue'
import { ref } from 'vue'
const view = ref<'signin' | 'signup'>('signin')

const setView = (type: 'signin' | 'signup') => {
  view.value = type
}
</script>
<style lang="scss" scoped></style>
