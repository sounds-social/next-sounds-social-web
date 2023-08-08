<template>
  <div class="py-6 px-4">
    <div class="mt-5 py-6 px-4 max-w-lg mx-auto shadow-lg rounded-lg">
      <BaseTitle> Upload Sound </BaseTitle>

      <div v-for="error in errors" :key="error">
        <p class="text-red-500 py-3">{{ error }}</p>
      </div>

      <form class="mt-4" @submit.prevent="upload" enctype="multipart/form-data">
        <div class="mb-4">
          <label class="block mb-2" for="title">Title*</label>
          <input
            class="w-full border border-gray-400 rounded-lg px-3 py-2"
            type="text"
            id="title"
            v-model="title"
          />
        </div>

        <div class="mb-4">
          <label class="block mb-2" for="email">Description*</label>
          <textarea
            class="w-full border border-gray-400 rounded-lg px-3 py-2"
            id="description"
            v-model="description"
          ></textarea>
        </div>

        <div class="mb-4">
          <label class="block mb-2" for="password">Is Public</label>
          <input
            class="border border-gray-400 rounded-lg px-3 py-2"
            type="checkbox"
            id="password"
            v-model="isPublic"
          />
        </div>

        <div class="mb-4">
          <label class="block mb-2" for="soundFile">Sound File*</label>
          <input
            class="w-full border border-gray-400 rounded-lg px-3 py-2"
            type="file"
            id="soundFile"
            accept="audio/*"
          />
        </div>

        <div class="mb-4">
          <label class="block mb-2" for="coverImageFile">Cover Image</label>
          <input
            class="w-full border border-gray-400 rounded-lg px-3 py-2"
            type="file"
            id="coverImageFile"
            accept="image/*"
          />
        </div>

        <div class="mb-4">
          <button
            class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
            type="submit"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { axiosClient } from "../../lib/axiosClient";
import { getErrorsFromResponse } from "../../lib/errorHandler";
import { TOKEN_KEY, useAuthStore } from "../../stores/auth";

const title = ref("");
const description = ref("");
const isPublic = ref(true);

const errors = ref([]);

const upload = async () => {
  const token = localStorage.getItem(TOKEN_KEY);

  const formData = new FormData();

  const soundFileInput = document.querySelector('#soundFile')

  formData.append(
    'file', 
    soundFileInput.files[0]
  );

  const coverImageFileInput = document.querySelector('#coverImageFile')

  formData.append(
    'cover_file', 
    coverImageFileInput.files[0]
  );

  formData.append('title', title.value);
  formData.append('description', description.value);
  formData.append('is_public', isPublic.value.toString());

  const response = await axiosClient
    .post(
      "/sounds",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    .catch((e) => e.response);

  const responseErrors = getErrorsFromResponse(response);

  if (responseErrors) {
    errors.value = responseErrors;
  } else if (response.status === 201) {
    const router = useRouter();

    coverImageFileInput.value = '';
    soundFileInput.value = '';

    router.push({ path: `/sound/${response.data.data.slug}` });
  }
};

const authStore = useAuthStore();
const router = useRouter();

if (!authStore.user) {
  router.push({ path: "/" });
}
</script>
