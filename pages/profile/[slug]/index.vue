<template>
  <div class="py-6 px-4" v-if="profile">
    <div class="flex flex-row">
      <div class="basis-8/12">
        <div class="flex items-center">
          <div class="mr-12 px-4">
            <div
              :style="[
                'width: 180px; height: 180px',
                profile.avatar_file_path
                  ? `background-image: url(http://localhost:8000${profile.avatar_file_path})`
                  : '',
              ]"
              class="bg-cover bg-center rounded-md"
              :class="{
                'bg-gradient-to-r from-cyan-500 to-blue-500':
                  !profile.avatar_file_path,
              }"
            ></div>
          </div>

          <BaseTitle>{{ profile.name }}</BaseTitle>
        </div>

        <div class="flex items-center">
          <div v-if="profile.can_follow" class="mt-4">
            <!-- TODO: reuse -->
            <NuxtLink
              :class="`
            px-3 py-1 border border-blue-400 text-blue-600 
            border-2 rounded-md cursor-pointer text-lg mb-1 inline-block
          `"
              @click.prevent="toggleFollow()"
            >
              {{ profile.is_following ? "Unfollow" : "Follow" }}
            </NuxtLink>
          </div>

          <div v-if="authStore.user.id === profile.id" class="mt-4">
            <NuxtLink
              :class="`
            px-3 py-1 border border-blue-400 text-blue-600 
            border-2 rounded-md cursor-pointer text-lg mb-1 inline-block
          `"
              :to="`/profile/${profile.slug}/edit`"
            >
              Edit Profile
            </NuxtLink>
          </div>
        </div>

        <h2 class="mt-4 text-slate-500 font-bold text-3xl">Sounds</h2>

        <SoundListForUser :id="profile.id" />
      </div>
      <div class="basis-4/12 pl-5 mt-10 text-slate-600 font-bold text-xl">
        <div>
          {{ profile.followers_count }} follower{{
            profile.followers_count === 1 ? "" : "s"
          }}
        </div>

        <div class="mt-3">{{ profile.follows_count }} following</div>

        <div class="mt-3">{{ profile.likes_count }} likes</div>
          
        <SoundLikesProfile :id="profile.id"></SoundLikesProfile>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { TOKEN_KEY } from "../../../stores/auth";
import { axiosClient } from "../../../lib/axiosClient";
import { useAuthStore } from "../../../stores/auth";

const profile = ref(null);

const authStore = useAuthStore();

const route = useRoute();

const slug = route.params.slug;

const token = localStorage.getItem(TOKEN_KEY);

const loadProfile = async () => {
  // TODO: reuse authorization header
  const response = await axiosClient.get(`/users/${slug}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  profile.value = response.data.data;
};

await loadProfile();

const toggleFollow = async () => {
  profile.value.is_following = !profile.value.is_following;

  await axiosClient.post(
    "/follows",
    {
      user_id: authStore.user.id,
      follow_id: profile.value.id,
      method: profile.value.is_following ? "follow" : "unfollow",
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  await loadProfile();
};
</script>
