<template>
  <div>
    <form @submit.prevent="addComment">
      <div class="flex">
        <div class="flex-1">
          <input
            type="text"
            class="w-full border border-gray-300 rounded-md px-4 py-2"
            placeholder="Write a comment..."
            v-model="content"
          />
        </div>
        <div class="ml-4">
          <button
            type="submit"
            class="bg-slate-500 text-white px-4 py-2 rounded-md"
          >
            Comment
          </button>
        </div>
      </div>
    </form>

    <div v-if="comments.length === 0" class="italic text-gray-400 mt-4">
      No comments yet.
    </div>
    <div v-for="comment in comments" class="my-9">
      <div class="flex">
        <div
          :style="[
            comment.user.avatar_file_path
              ? `background-image: url(http://localhost:8000${comment.user.avatar_file_path})`
              : '',
          ]"
          class="bg-cover bg-center rounded-md w-5 h-5 mr-2"
          :class="{
            'bg-gradient-to-r from-cyan-500 to-blue-500':
              !comment.user.avatar_file_path,
          }"
        ></div>

        <NuxtLink :to="`/profile/${comment.user.slug}`">
          {{ comment.user.name }}
        </NuxtLink>
      </div>

      <div class="text-slate-500 mt-2">
        {{ comment.content }}
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getCurrentInstance } from "vue";

import { axiosClient } from "../../lib/axiosClient";
import { TOKEN_KEY, useAuthStore } from "../../stores/auth";

const authStore = useAuthStore();

const props = defineProps<{
  sound: any;
}>();

const comments = ref(null);

const content = ref("");

const loadComments = async () => {
  const token = localStorage.getItem(TOKEN_KEY);

  const response = await axiosClient.get(
    `/comments?sound_id=${props.sound.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  comments.value = response?.data?.data;
};

await loadComments();

const addComment = async () => {
  if (content.value.length === 0) {
    return null;
  }

  const token = localStorage.getItem(TOKEN_KEY);

  await axiosClient.post(
    "/comments",
    {
      sound_id: props.sound.id,
      user_id: authStore.user.id,
      content: content.value,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  await loadComments();

  content.value = "";

  document?.activeElement?.blur();
};
</script>
