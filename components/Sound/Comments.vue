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
    <div v-for="comment in comments" class="my-7">
      {{ comment.content }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getCurrentInstance } from 'vue'

import { axiosClient } from "../../lib/axiosClient";
import { TOKEN_KEY } from "../../stores/auth";

const emit = defineEmits(["update"]);

const props = defineProps<{
  sound: any;
}>();

const comments = props.sound.comments;

const content = ref("");



const addComment = async () => {
  if (content.value.length === 0) {
    return null;
  }

  const token = localStorage.getItem(TOKEN_KEY);

  const response = await axiosClient.post(
    "/comments",
    {
      sound_id: props.sound.id,
      user_id: props.sound.user.id,
      content: content.value,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  await emit("update");

  const instance = getCurrentInstance();
  instance?.proxy?.$forceUpdate();

  console.log(props.sound)
};
</script>
