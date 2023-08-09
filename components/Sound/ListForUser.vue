<template>
  <SoundList @load="load(props.id, true)" />
</template>

<script lang="ts" setup>
import { useSoundStore } from "../../stores/sound";

const props = defineProps<{
  id: number
}>();

const soundStore = useSoundStore();

const load = async (id: number, ignoreLoading: boolean = false) => {
  await soundStore.loadSoundsForUser(id, ignoreLoading);
}

await load(props.id);

</script>
