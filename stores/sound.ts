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

      const response = await axiosClient.get("/sounds");

      console.log(response.data);
      this.sounds = response.data.data;
    },
  },
});
