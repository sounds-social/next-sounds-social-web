<template>
  <div class="py-6 px-4">
    <div v-if="!authStore.loading">
      <div v-if="authStore.user">
        <div class="mb-12 mt-6">
          <BaseTitle>#Following</BaseTitle>
        </div>

        <SoundListLikes :id="profile.id" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { axiosClient } from "../../../lib/axiosClient";
import { TOKEN_KEY, useAuthStore } from "../../../stores/auth";

const authStore = useAuthStore();

const route = useRoute();

const slug = route.params.slug;

const profile = ref(null);

const loadProfile = async () => {
  const token = localStorage.getItem(TOKEN_KEY);

  // TODO: reuse authorization header
  const response = await axiosClient.get(`/users/${slug}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  profile.value = response.data.data;
};

await loadProfile();

</script>
