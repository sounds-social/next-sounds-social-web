<template>
  <div class="py-6 px-4">
    <div v-if="!authStore.loading">
      <div v-if="authStore.user">
        <div class="mb-12 mt-6">
          <BaseTitle>#Global Sounds</BaseTitle>
        </div>

        <SoundListPublic />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useAuthStore } from "../../stores/auth";

const authStore = useAuthStore();
</script>
