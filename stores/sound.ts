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

export const LOAD_MORE_AMOUNT = 10;

const getPath = async (path: string) => {
  const token = localStorage.getItem(TOKEN_KEY);

  return await axiosClient.get(
    path,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export const useSoundStore = defineStore("sound", {
  state: () => ({
    sounds: [],
    limit: 15,
    offset: 0,
    soundsCount: null,
    loading: true,
  }),
  
  getters: {
    displayLoadMore () {
      return this.soundsCount > this.sounds.length;
    }
  },

  actions: {
    async loadPublicSounds(ignoreLoading: boolean = false) {
      if (!ignoreLoading) {
        this.loading = true;
      }

      const path = `/sounds?limit=${this.limit}&offset=${this.offset}`
      const response = await getPath(path);

      this.sounds = response.data.data;

      const countResponse = await getPath(`${path}&count=true`);
      this.soundsCount = countResponse?.data?.data?.count;

      this.loading = false;
    },
    async loadSoundsForUser(userId: number, ignoreLoading: boolean = false) {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!ignoreLoading) {
        this.loading = true;
      }

      const path = `/sounds?user_id=${userId}&limit=${this.limit}&offset=${this.offset}`;
      const response = await getPath(path);

      this.sounds = response.data.data;

      const countResponse = await getPath(`${path}&count=true`);
      this.soundsCount = countResponse?.data?.data?.count;

      this.loading = false;
    },
    async loadSoundsFollowing(ignoreLoading: boolean = false) {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!ignoreLoading) {
        this.loading = true;
      }

      const path = `/sounds?following=true&limit=${this.limit}&offset=${this.offset}`;
      const response = await getPath(path);

      this.sounds = response.data.data;

      const countResponse = await getPath(`${path}&count=true`);
      this.soundsCount = countResponse?.data?.data?.count;

      this.loading = false;
    },
  },
});
