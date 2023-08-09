<template>
  <div v-if="!soundStore.loading">
    <div
      v-if="soundStore.sounds.length === 0"
      class="mt-3 text-slate-500 italic text-md"
    >
      No sounds found.
    </div>
    <div
      v-for="sound in soundStore.sounds"
      :key="sound.id"
      class="mt-8 px-4 flex items-start"
    >
      <div
        :style="[
          'width: 100px; height: 100px',
          sound.cover_file_path
            ? `background-image: url(http://localhost:8000${sound.cover_file_path})`
            : '',
        ]"
        class="bg-cover bg-center rounded-md mr-10"
        :class="{
          'bg-gradient-to-r from-cyan-500 to-blue-500': !sound.cover_file_path,
        }"
      ></div>
      <div class="flex-1">
        <div class="text-4xl text-slate-700 font-black">
          <NuxtLink :to="`/sound/${sound.slug}`">{{ sound.title }}</NuxtLink>
        </div>
        <div class="mt-2 text-slate-500 font-bold">
          <NuxtLink :to="`/profile/${sound.user.slug}`">{{
            sound.user.name
          }}</NuxtLink>
        </div>

        <!-- TODO: Reuse for sound slug route -->
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

        <!-- ClientOnly>
          <Waveform
            :pathToSound="`http://localhost:8000${sound.sound_file_path}`"
            :id="sound.id"
          ></Waveform>
        </ClientOnly -->
      </div>
    </div>

    <button
      class="ml-4 mt-8 border px-3 py-2 border-slate-500 text-slate-500 rounded"
      @click.prevent="loadMore"
      v-if="soundStore.displayLoadMore"
    >
      Load more
    </button>
  </div>
</template>
<script lang="ts" setup>
import { LOAD_MORE_AMOUNT, useSoundStore } from "../../stores/sound";

const emit = defineEmits(['load'])

const soundStore = useSoundStore();

const loadMore = async () => {
  soundStore.limit += LOAD_MORE_AMOUNT;

  await emit('load')
}
</script>
