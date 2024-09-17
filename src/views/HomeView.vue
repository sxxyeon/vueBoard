<template>
  <div>
    <h2>home view</h2>
    <p>{{ $route.path }}</p>
    <p>{{ $route.name }}</p>
    <button class="btn btn-primary" @click="goAboutPage">About으로 이동</button>
    <hr class="my-4" />

    <AppGrid v-slot="{ item }" :items="items" col-class="col-6"
      ><AppCard>{{ item }}</AppCard></AppGrid
    >
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import AppCard from '@/components/AppCard.vue';
import AppGrid from '@/components/AppGrid.vue';
import { ref } from 'vue';
const router = useRouter();
const goAboutPage = () => {
  router.push({ name: 'About' });
};

const items = ref(['사과', '딸기', '복숭아', '참외']);
</script>

<style lang="scss" scoped></style>
