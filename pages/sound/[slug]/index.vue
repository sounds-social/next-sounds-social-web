<template>
  <div v-if="sound" class="py-6 px-4">
    <div class="flex items-start">
      <div
        :style="[
          'width: 180px; height: 180px',
          sound.cover_file_path
            ? `background-image: url(http://localhost:8000${sound.cover_file_path})`
            : '',
        ]"
        class="bg-cover bg-center rounded-md mr-10"
        :class="{'bg-gradient-to-r from-cyan-500 to-blue-500' : !sound.cover_file_path }"
      ></div>
      <div class="flex-1">
        <!-- TODO: Reuse from ListPublic.vue -->
        <div class="text-4xl text-slate-700 font-black">{{ sound.title }}</div>
        <div class="mt-2 text-slate-500 font-bold text-xl">
          <NuxtLink :to="`/profile/${sound.user.slug}`">{{
            sound.user.name
          }}</NuxtLink>
        </div>

        <div
          v-if="!sound.is_public"
          class="my-2 text-md text-gray-400 inline-block"
        >
          <div
            class="py-1 px-3 border-2 border-gray-300 rounded-lg select-none"
          >
            Private
          </div>
        </div>

        <ClientOnly>
          <Waveform
            :pathToSound="`http://localhost:8000${sound.sound_file_path}`"
            :id="sound.id"
          ></Waveform>
        </ClientOnly>

        <!-- TODO: reuse classes -->
        <NuxtLink
          :class="`
            px-3 py-1 border border-blue-400 text-blue-600 
            border-2 rounded-md cursor-pointer text-lg mb-5 inline-block
          `"
          :to="`/sound/${sound.slug}/edit`"
          v-if="authStore.user.id === sound.user.id"
        >
          Edit Sound
        </NuxtLink>

        <p class="text-lg max-w-3xl">{{ sound.description }}</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { TOKEN_KEY, useAuthStore } from "@/stores/auth";
import { axiosClient } from "../../../lib/axiosClient";

const route = useRoute();

const authStore = useAuthStore();

const sound = ref(null);

const token = localStorage.getItem(TOKEN_KEY);

const response = await axiosClient.get(`/sounds/${route.params.slug}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

sound.value = response?.data?.data;
</script>
