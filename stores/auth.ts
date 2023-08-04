import { axiosClient } from "../lib/axiosClient";
import { defineStore } from "pinia";

const TOKEN_KEY = 'APP_AUTH_TOKEN'

export const useAuthStore = defineStore('auth', {
  state: () => ({ 
    token: null, 
    user: null,
    error: null,
    loading: true
  }),
  actions: {
    async setUserToken (token: string, user: any = null) {
      localStorage.setItem(TOKEN_KEY, token)

      this.token = token
      if (user) this.user = user
    },
    async initUserData () {
      this.token = localStorage.getItem(TOKEN_KEY)

      try {
        const response = await axiosClient.get('/user', {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })

        this.user = response.data
      } catch (error: any) {
        this.error = error.response.data.message
      }

      this.loading = false
    },
    async logout () {
      localStorage.removeItem(TOKEN_KEY)
      
      this.token = null
      this.user = null
    }
  }
})
