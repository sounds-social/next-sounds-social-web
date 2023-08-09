<template>
  <div
    class="font-bold w-100 py-6 px-4 bg-blue-500 text-white flex justify-between"
  >
    <div class="flex items-center">
      <h2
        class="text-xl hover:text-blue-200 transition"
        :class="{
          'text-blue-100': route.name === 'index',
        }"
      >
        <NuxtLink to="/">Sounds Social</NuxtLink>
      </h2>

      <NuxtLink
        class="text-md ml-10 flex items-center hover:text-blue-200 transition"
        to="/explore/global"
        :class="{
          'text-blue-100': route.name === 'explore-global',
        }"
        v-if="!authStore.loading && authStore.user"
      >
        Explore Global
      </NuxtLink>

      <NuxtLink
        class="text-md ml-10 flex items-center hover:text-blue-200 transition"
        to="/sound/upload"
        :class="{
          'text-blue-100': route.name === 'sound-upload',
        }"
        v-if="!authStore.loading && authStore.user"
      >
        <!-- Icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 mr-2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
          />
        </svg>

        Upload
      </NuxtLink>
    </div>

    <div class="flex items-center">
      <NuxtLink
        class="text-md ml-10 flex items-center hover:text-blue-200 transition"
        :to="`/profile/${authStore.user?.slug}`"
        :class="{
          'text-blue-100': route.name === 'profile-slug',
        }"
        v-if="!authStore.loading && authStore.user"
      >
        Profile
      </NuxtLink>

      <NuxtLink
      class="text-md hover:text-blue-200 transition ml-10"
      to="/login"
      :class="{
        'text-blue-100': route.name === 'login',
      }"
      v-if="!authStore.loading"
    >
      <span v-if="!authStore.user">Login</span>
      <span v-if="authStore.user" @click.prevent="logout">Logout</span>
    </NuxtLink>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useAuthStore } from "../stores/auth";

const route = useRoute();
const router = useRouter();

const authStore = useAuthStore();

const logout = async () => {
  authStore.logout();
  router.push("/login");
};
</script>
