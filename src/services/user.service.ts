import axiosInstance from "@/plugins/axios";

export const userService = {
  async getUsers() {
    return axiosInstance.get<User[]>('/users')
  },
  async createUser(user: any) {
    return axiosInstance.post<User>('/users', user)
  },
  async patchUser(id: number, user: any) {
    return axiosInstance.patch<User>(`users/${id}`, user)
  },
}


export interface User {
  id?: number
  email: string
  name: string
  password?: string
  access_level: 'ADMIN' | 'USER'
}
