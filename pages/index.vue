<template>
  <div class="py-6 px-4">
    <div>Home</div>

    <div v-if="authStore && authStore.user">
      You are logged in! 
      <span v-text="authStore.user"></span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useAuthStore } from "../stores/auth";

// TODO: where to load user data?
const authStore = useAuthStore();
</script>
