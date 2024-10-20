import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { authService } from '@/services/auth.service'
import Cookies from 'js-cookie'
import axiosInstance from '@/plugins/axios'
import type { User } from '@/services/user.service'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const user = Cookies.get('USER') ? ref(JSON.parse(Cookies.get('USER') || '')) : ref<User>()
  const token = ref(Cookies.get('JWT_TOKEN'))

  async function signIn(signinPayload: { email: string, password: string }) {
    try {
      const { data } = await authService.signIn(signinPayload)
      setToken(data.token)
      setUser(data.user)
    } catch (error: any) {
      throw error
    }
  }

  async function signUp(signinPayload: { email: string, name: string, password: string }) {
    try {
      const { data } = await authService.signUp(signinPayload)
      setToken(data.token)
      setUser(data.user)
    } catch (error: any) {
      throw error
    }
  }
  function setToken(jwtToken: string) {
    Cookies.set('JWT_TOKEN', jwtToken)
    token.value = jwtToken
    axiosInstance.defaults.headers.Authorization = `Bearer ${jwtToken}`;
  }
  function setUser(userPayload: any) {
    Cookies.set('USER', JSON.stringify(userPayload))
    user.value = userPayload
  }

  async function validateEmail(email: string) {
    try {
      const { data } = await authService.validateEmail(email)
      return data
    } catch (error: any) {
      throw error
    }
  }

  const logOut = () => {
    Cookies.remove('JWT_TOKEN')
    user.value = null
    router.push('/login')
  }
  return { user, signIn, signUp, validateEmail, logOut }

})
