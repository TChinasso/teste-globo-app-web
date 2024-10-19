import axiosInstance from "@/plugins/axios";
import type { AxiosResponse } from "axios";

export const authService = {
  async signIn(loginPayload: { email: string, password: string }) {
    return axiosInstance.post<UserResponse>('/oauth/signin', {
      ...loginPayload
    })
  },
  async signUp(loginPayload: { email: string, password: string, name: string }) {
    return axiosInstance.post('/oauth/signup', {
      ...loginPayload
    })
  },
  async validateEmail(email: string) {
    return axiosInstance.post('/oauth/signup/validate_email', { email })
  }
}

interface UserResponse {
  token: string,
  user: {
    id: number
    email: string
    name: string
    password: string
  }
}
