<template>
  <SoundList />
</template>

<script lang="ts" setup>
import { useSoundStore } from "../../stores/sound";

const soundStore = useSoundStore();

await soundStore.loadSoundsFollowing();

console.log('loaded')
</script>
