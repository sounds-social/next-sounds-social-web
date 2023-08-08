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
        :class="{
          'bg-gradient-to-r from-cyan-500 to-blue-500': !sound.cover_file_path,
        }"
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

        <div>
          <div
            :class="[`
            px-3 py-1 select-none	
            border-2 rounded-md cursor-pointer text-lg mb-5 inline-block mr-4 items-center
          `, { 'bg-red-500 text-white' : sound.has_liked, 'border border-red-400 text-red-600' : !sound.has_liked }]"
            @click.prevent="toggleLike"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 inline-block align-middle"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>

            {{ sound.likes_count }}
            {{ sound.likes_count === 1 ? "Like" : "Likes" }}
          </div>

          <NuxtLink
            :class="`
            px-3 py-1 border select-none border-blue-400 text-blue-600 
            border-2 rounded-md cursor-pointer text-lg mb-5 inline-block
          `"
            :to="`/sound/${sound.slug}/edit`"
            v-if="authStore.user.id === sound.user.id"
          >
            Edit Sound
          </NuxtLink>
        </div>

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

const loadSound = async () => {
  const response = await axiosClient.get(`/sounds/${route.params.slug}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  sound.value = response?.data?.data;
};

const toggleLike = async () => {
  const liked = sound.value.has_liked;

  console.log(liked);

  await axiosClient.post(
    `/likes`,
    {
      sound_id: sound.value.id,
      user_id: authStore.user.id,
      method: liked ? "removeLike" : "like",
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  await loadSound();
};

await loadSound();
</script>
