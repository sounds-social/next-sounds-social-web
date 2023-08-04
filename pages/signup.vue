<template>
  <div>
    <div class="mt-5 py-6 px-4 max-w-lg mx-auto shadow-lg rounded-lg">
      <h1 class="font-black text-4xl mb-3">Sign Up</h1>

      <div v-for="error in errors" :key="error">
        <p class="text-red-500 py-3">{{ error }}</p>
      </div>

      <form class="mt-4" @submit.prevent="signup">
        <div class="mb-4">
          <label class="block mb-2" for="name">Name</label>
          <input
            class="w-full border border-gray-400 rounded-lg px-3 py-2"
            type="text"
            id="name"
            v-model="name"
          />
        </div>

        <div class="mb-4">
          <label class="block mb-2" for="email">Email</label>
          <input
            class="w-full border border-gray-400 rounded-lg px-3 py-2"
            type="email"
            id="email"
            v-model="email"
          />
        </div>

        <div class="mb-4">
          <label class="block mb-2" for="password">Password</label>
          <input
            class="w-full border border-gray-400 rounded-lg px-3 py-2"
            type="password"
            id="password"
            v-model="password"
          />
        </div>

        <div class="mb-4">
          <label class="block mb-2" for="confirmPassword">Confirm Password</label>
          <input
            class="w-full border border-gray-400 rounded-lg px-3 py-2"
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
          />
        </div>

        <div class="mb-4">
          <button
            class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>

      <div class="mt-3">Already have an account? <NuxtLink 
        class="text-blue-400 transition hover:text-blue-500"
        to="/login">Go to Login</NuxtLink></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { axiosClient } from "../lib/axiosClient";
import { getErrorsFromResponse } from "../lib/errorHandler";
import { useAuthStore } from "../stores/auth";

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const errors = ref([]);

const signup = async () => {
  const response = await axiosClient.post("/signup", {
    name: name.value,
    email: email.value,
    password: password.value,
    password_confirmation: confirmPassword.value,
  }).catch(e => e.response);

  const responseErrors = getErrorsFromResponse(response)

  if (responseErrors) {
    errors.value = responseErrors;
  } else if (response.status === 200) {
    const store = useAuthStore();
    const router = useRouter();

    await store.setUserToken(response.data.data.token, response.data.data.user);

    router.push({ path: "/" });
  }
};

const authStore = useAuthStore();
const router = useRouter();

if (authStore.user) {
  router.push({ path: "/" });
}
</script>
