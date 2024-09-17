<template>
  <div>
    <h2>about view</h2>
    <p>
      {{ $route.path }}
    </p>
    <p>{{ $route.name }}</p>
    <button class="btn btn-primary" @click="$router.push({ name: 'Home' })">
      home으로 이동
    </button>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
console.log('route.path :', route.path);
</script>

<style lang="scss" scoped></style>
