import { axiosClient } from "../lib/axiosClient";
import { defineStore } from "pinia";

export const TOKEN_KEY = 'APP_AUTH_TOKEN'

interface IInitialState {
  token: null | string;
  user: null | any;
  error: null | string;
  loading: boolean;
}

const initialState: IInitialState = { 
  token: null, 
  user: null,
  error: null,
  loading: true
}

export const useAuthStore = defineStore('auth', {
  state: () => (initialState),
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

        this.user = response.data.data
      } catch (error: any) {
        this.error = error.response.data.message
      }

      this.loading = false
    },
    async logout () {
      localStorage.removeItem(TOKEN_KEY)
      this.token = null
      this.user = null

      await axiosClient.post('/logout', {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })      
    }
  }
})
