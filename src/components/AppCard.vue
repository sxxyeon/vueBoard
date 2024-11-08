<template>
  <div
    class="card rounded hover-zoom px-3 py-2 px-md-4 py-md-3"
    :class="isList ? 'card-list' : 'card-grid'"
  >
    <div v-if="$slots.header" class="card-header position-relative">
      <slot name="header"></slot>
    </div>
    <div v-if="$slots.default" class="card-body pt-2">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script setup>
defineProps({
  isList: {
    type: Boolean
  }
});
</script>
<style scoped>
.card {
  border: none;
  transition: transform 0.2s;
  cursor: pointer;
  box-shadow: 0 1px 10px 2px rgb(0, 0, 0, 7%);
  background: rgb(255, 255, 255, 1);
}
.card-list {
  height: auto;
}
.card-grid {
  height: auto;
}
.card:hover {
  transform: scale(1.02);
}
.card-header {
  border: none;
  background: none;
  text-align: right;
  padding: 0;
}
.card-body {
  padding: 0;
}
.card-footer {
  border: none;
  background: none;
  padding: 0;
}

@media (min-width: 576px) {
  .card-grid {
    height: 240px;
  }
}
</style>
