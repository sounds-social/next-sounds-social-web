<template>
  <div :id="wavesurferDivId" class="my-6"></div>
</template>
<script lang="ts" setup>
const {pathToSound, id} = defineProps({
  pathToSound: String,
  id: Number,
});

import WaveSurfer from 'wavesurfer.js';

const wavesurferDivId = `waveform-${id}`;

onMounted(() => {
  const wavesurfer = WaveSurfer.create({
    container: `#${wavesurferDivId}`,
    height: 80,
    waveColor: "rgb(59, 130, 246)",
    progressColor: "#383351",
    mediaControls: true,
    url: pathToSound,
  });
});
</script>
