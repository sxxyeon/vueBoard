<template>
  <div class="row g-4">
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="colClass"
      class="col-lg-4"
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
  colClass: {
    type: String,
    default: 'col-6'
  }
});
</script>

<style lang="scss" scoped></style>
