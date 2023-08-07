<template>
  <SoundList />
</template>

<script lang="ts" setup>
import { useSoundStore } from "../../stores/sound";

const props = defineProps<{
  id: number
}>();

const soundStore = useSoundStore();

await soundStore.loadSoundsForUser(props.id);
</script>
