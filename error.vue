<template>
  <div class="m-4">
    <h1 class="text-3xl font-bold">Error has occured</h1>

    <span v-text="error"></span>
  </div>
</template>
<script lang="ts" setup>
const error = useError()
</script>
