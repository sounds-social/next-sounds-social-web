import { defineStore } from "pinia";

import { axiosClient } from "../lib/axiosClient";
import { TOKEN_KEY } from "./auth";

interface IInitialState {
  sounds: null | any;
  loading: boolean;
}

const initialState: IInitialState = {
  sounds: null,
  loading: true,
};

export const useSoundStore = defineStore("sound", {
  state: () => ({
    sounds: [],
    loading: true,
  }),

  actions: {
    async loadPublicSounds() {
      const token = localStorage.getItem(TOKEN_KEY);
      this.loading = true;

      const response = await axiosClient.get("/sounds", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      this.sounds = response.data.data;
      this.loading = false;
    },
    async loadSoundsForUser(userId: number) {
      const token = localStorage.getItem(TOKEN_KEY);
      this.loading = true;

      const response = await axiosClient.get(`/sounds?user_id=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      this.sounds = response.data.data;
      this.loading = false;
    },
    async loadSoundsFollowing() {
      const token = localStorage.getItem(TOKEN_KEY);
      this.loading = true;

      const response = await axiosClient.get(`/sounds?following=true`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      this.sounds = response.data.data;
      this.loading = false;
    }
  },
});
