<template>
  <div class="py-6 px-4" v-if="profile">
    <BaseTitle>{{ profile.name }}</BaseTitle>

    <div class="flex flex-row">
      <div class="basis-9/12">
        <h2 class="mt-2 text-slate-500 font-bold text-3xl">Sounds</h2>

        <SoundListForUser :id="profile.id" />
      </div>
      <div class="basis-3/12">Sidebar</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { TOKEN_KEY } from "../../stores/auth";
import { axiosClient } from "../../lib/axiosClient";

const profile = ref(null);

const route = useRoute();

const slug = route.params.slug;

const token = localStorage.getItem(TOKEN_KEY);

const response = await axiosClient.get(`/users/${slug}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

profile.value = response.data.data;
</script>
