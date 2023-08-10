<template>
  <div class="flex items-center pt-2">
    <div v-for="like in likes" :key="like.id" class="mr-1">
      <NuxtLink class="cursor-pointer py-3" :to="`/sound/${like.sound.slug}`">
        <div
          class="bg-gradient-to-r from-cyan-500 to-blue-500 h-10 w-10 rounded-full"
        >
          <img
            class="h-10 w-10 rounded-full"
            :src="`http://localhost:8000${like.sound.cover_file_path}`"
            v-if="like.sound.cover_file_path"
            alt=""
          />
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { TOKEN_KEY } from "../../../stores/auth";
import { axiosClient } from "../../../lib/axiosClient";

const props = defineProps<{
  id: number;
}>();

const userId = props.id;

const likes = ref(null);

const loadLikes = async () => {
  const token = localStorage.getItem(TOKEN_KEY);

  const response = await axiosClient.get(`/likes?user_id=${userId}&limit=4`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  likes.value = response?.data;

  console.log(likes.value);
};

await loadLikes();
</script>
