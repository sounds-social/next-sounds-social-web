<template>
  <div class="py-6 px-4">
    <h1 class="text-6xl mb-14 mt-8 text-slate-900 font-black">#Upload Sound</h1>
  </div>
</template>
<script lang="ts" setup>
import { useAuthStore } from "../../stores/auth";


const authStore = useAuthStore();
const router = useRouter();

if (!authStore.user) {
  router.push({ path: "/" });
}

</script>
