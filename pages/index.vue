<template>
  <div class="py-6 px-4">
    <div v-if="!authStore.loading">
      <div v-if="authStore.user">
        <h1 class="text-6xl mb-14 mt-8 text-slate-900 font-black">#Global Sounds</h1>

        <SoundListPublic />

        You are logged in! 
        <span v-text="authStore.user"></span>
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
