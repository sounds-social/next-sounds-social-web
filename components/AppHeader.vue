<template>
  <div
    class="font-bold w-100 py-6 px-4 bg-blue-500 text-white flex justify-between"
  >
    <h2
      class="text-xl"
      :class="{
        'text-blue-100': route.name === 'index',
      }"
    >
      <NuxtLink to="/">Sounds Social</NuxtLink>
    </h2>

    <NuxtLink
      class="text-md"
      to="/login"
      :class="{
        'text-blue-100': route.name === 'login',
      }"
      v-if="!authStore.loading"
      >
        <span v-if="!authStore.user">Login</span>
        <span v-if="authStore.user" @click.prevent="logout">Logout</span>
      </NuxtLink
    >
  </div>
</template>
<script lang="ts" setup>
import { useAuthStore } from "../stores/auth";

const route = useRoute();
const router = useRouter();

const authStore = useAuthStore();

const logout = async () => {
  authStore.logout()
  router.push('/login')
}
</script>
