<template>
  <div class="py-6 px-4">
    <div class="mt-5 py-6 px-4 max-w-lg mx-auto shadow-lg rounded-lg">
      <BaseTitle>Edit profile</BaseTitle>

      <div v-for="error in errors" :key="error">
        <p class="text-red-500 py-3">{{ error }}</p>
      </div>

      <form class="mt-8" @submit.prevent="edit()" enctype="multipart/form-data">
        <div class="mb-4">
          <label class="block mb-2" for="nameInput">Name*</label>
          <input
            class="w-full border border-gray-400 rounded-lg px-3 py-2"
            type="text"
            id="nameInput"
            v-model="name"
          />
        </div>

        <div class="mb-4">
          <label class="block mb-2" for="soundFile">Avatar Image File</label>
          <input
            class="w-full border border-gray-400 rounded-lg px-3 py-2"
            type="file"
            id="avatarImageFile"
            accept="image/*"
          />
        </div>

        <div class="mb-4">
          <button
            class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
            type="submit"
          >
            Edit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { axiosClient } from "../../../lib/axiosClient";
import { getErrorsFromResponse } from "../../../lib/errorHandler";
import { TOKEN_KEY, useAuthStore } from "../../../stores/auth";

const authStore = useAuthStore();

const router = useRouter();

const name = ref("");

const errors = ref([]);

name.value = authStore.user.name;

const edit = async () => {
  const token = localStorage.getItem(TOKEN_KEY);

  const formData = new FormData();

  const avatarFileInput = document.querySelector("#avatarImageFile");
  const avatarFile = avatarFileInput.files[0]  

  if (avatarFile) {
    formData.append("avatar_file", avatarFileInput.files[0]);
  }

  formData.append("name", name.value);

  const response = await axiosClient
      .post(`/users/${authStore.user.slug}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .catch((e) => e.response);

  const responseErrors = getErrorsFromResponse(response);

  if (responseErrors) {
    errors.value = responseErrors;
  } else if (response.status === 201 || response.status === 200) {
    avatarFileInput.value = "";

    await authStore.initUserData()
    router.push({ path: `/profile/${response.data.data.slug}` });
  }
};

if (!authStore.user) {
  router.push({ path: "/" });
}
</script>
