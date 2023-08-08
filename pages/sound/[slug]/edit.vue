<template>
  <SoundForm :sound="sound"></SoundForm>
</template>
<script lang="ts" setup>
import { TOKEN_KEY } from "../../../stores/auth";
import { axiosClient } from "../../../lib/axiosClient";

const route = useRoute();

const slug = route.params.slug;

const sound = ref(null);

const loadData = async () => {
  const token = localStorage.getItem(TOKEN_KEY);

  const response = await axiosClient.get(`/sounds/${slug}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  sound.value = response.data.data;
};

await loadData();
</script>
