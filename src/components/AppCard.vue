<template>
  <div class="card bg-white rounded hover-zoom">
    <div v-if="$slots.header" class="card-header">
      <slot name="header"></slot>
    </div>
    <div v-if="$slots.default" class="card-body">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped>
.card {
  height: 200px;
  border: none;
  transition: transform 0.2s;
  cursor: pointer;
  box-shadow: 0 1px 10px rgb(0, 0, 0, 20%);
}
.card:hover {
  transform: scale(1.02);
}
.card-footer {
  border-top: 1px solid #eee;
}
</style>
