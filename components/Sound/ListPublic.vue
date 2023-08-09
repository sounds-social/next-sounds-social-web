<template>
  <SoundList @load="load(true)" />
</template>

<script lang="ts" setup>
import { useSoundStore } from "../../stores/sound";

const soundStore = useSoundStore();

const load = async (ignoreLoading: boolean = false) => {
  await soundStore.loadPublicSounds(ignoreLoading);
}

await load();
</script>
