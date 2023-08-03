<template>
  <div>
    <AppHeader />
    <slot />
  </div>
</template>
<script lang="ts" setup>
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

if (typeof localStorage !== 'undefined') {
  await authStore.initUserData()
}

</script>
