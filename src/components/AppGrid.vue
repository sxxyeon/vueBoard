<template>
  <div class="row g-4">
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="isList ? 'col-lg-12' : 'col-sm-6 col-md-4'"
    >
      <slot :item="item" :index="index"></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    Required: true
  },
  isList: {
    type: Boolean
  }
});
</script>

<style scoped></style>
