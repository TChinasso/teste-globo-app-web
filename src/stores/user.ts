import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { userService, type User } from '@/services/user.service'

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([])
  async function getUsers() {
    try {
      const { data } = await userService.getUsers()
      users.value = data
      Promise.resolve()
    } catch (error: any) {
      Promise.reject(error)
    }
  }
  async function createUser(user: any) {
    try {
      const { data } = await userService.createUser(user)
      return data
    } catch (error: any) {
      Promise.reject(error)
    }
  }
  async function patchUser(user: any) {
    try {
      const { data } = await userService.patchUser(user.id, user)
      return data
    } catch (error: any) {
      Promise.reject(error)
    }
  }

  return { getUsers, users, createUser, patchUser }
})
