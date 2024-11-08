<script setup>
import { provide, ref, watch } from 'vue';
import TheHeader from './layouts/TheHeader.vue';
import TheView from './layouts/TheView.vue';
import { useRoute } from 'vue-router';
import TheFooter from './layouts/TheFooter.vue';

const isMain = ref(true);
const route = useRoute();

provide('isMain', isMain);

watch(
  () => route.path,
  (newPath) => {
    if (newPath !== '/') {
      isMain.value = false;
    } else {
      isMain.value = true;
    }
  }
);
</script>

<template>
  <div :class="isMain ? 'wrap d-flex flex-column' : 'wrap d-flex flex-column'">
    <TheHeader :is-main="isMain" />
    <div class="content flex-grow-1 h-100">
      <TheView class="view-cont" />
    </div>
    <TheFooter />
  </div>
</template>

<style scoped>
.active {
  background: #9fe0c9;
  color: #000;
}
</style>
