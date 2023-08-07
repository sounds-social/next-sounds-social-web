<template>
  <div v-if="sound" class="py-6 px-4">
    <!-- TODO: Reuse from ListPublic.vue -->
    <div class="text-4xl text-slate-700 font-black">{{ sound.title }}</div>
    <div class="mt-2 text-slate-500 font-bold text-xl">
      <NuxtLink :to="`/profile/${sound.user.slug}`">{{ sound.user.name }}</NuxtLink>
    </div>

    <ClientOnly>
      <Waveform
        :pathToSound="`http://localhost:8000${sound.sound_file_path}`"
        :id="sound.id"
      ></Waveform>
    </ClientOnly>

    <p class="text-lg max-w-3xl">{{ sound.description }}</p>
  </div>
</template>
<script lang="ts" setup>
import { TOKEN_KEY } from "@/stores/auth";
import { axiosClient } from "../../lib/axiosClient";

const route = useRoute();

const sound = ref(null);

const token = localStorage.getItem(TOKEN_KEY)

const response = await axiosClient.get(`/sounds/${route.params.slug}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

sound.value = response?.data?.data;
</script>
