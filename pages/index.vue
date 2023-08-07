<template>
  <div class="py-6 px-4">
    <div v-if="!authStore.loading">
      <div v-if="authStore.user">
        <BaseTitle>#Global Sounds</BaseTitle>

        <SoundListPublic />
      </div>
      <div v-else>
        Marketing homepage
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useAuthStore } from "../stores/auth";

// TODO: where to load user data?
const authStore = useAuthStore();
</script>
