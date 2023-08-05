<template>
  <div>
    <div v-for="sound in soundStore.sounds" :key="sound.id" class="mt-10 p-4">
      <div class="text-4xl text-slate-700 font-black">
        <NuxtLink :to="`/sound/${sound.slug}`">{{ sound.title }}</NuxtLink>
      </div>
      <div class="mt-2 text-slate-500 font-bold">{{ sound.user.name }}</div>

      <ClientOnly>
        <Waveform
          :pathToSound="`http://localhost:8000${sound.sound_file_path}`"
          :id="sound.id"
        ></Waveform>
      </ClientOnly>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSoundStore } from "../../stores/sound";

const soundStore = useSoundStore();

await soundStore.loadPublicSounds();
</script>
