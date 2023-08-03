<template>
  <div>
    <div class="mt-5 py-6 px-4 max-w-lg mx-auto shadow-lg rounded-lg">
      <h1 class="font-bold text-3xl mb-3">Login</h1>

      <form class="mt-4" @submit.prevent="login">
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
          <button
            class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { axiosClient } from "../lib/axiosClient";
import { useAuthStore } from "../stores/auth";

const email = ref("");
const password = ref("");

const login = async () => {
  console.log(email.value);
  console.log(password.value);

  const response = await axiosClient.post("/login", {
    email: email.value,
    password: password.value,
  });

  if (response.status === 200) {
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
