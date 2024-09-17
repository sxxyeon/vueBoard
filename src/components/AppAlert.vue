<template>
  <!-- <Transition name="slide">
    <div v-if="show" class="app-alert alert" :class="color" role="alert">
      {{ msg }}
    </div>
  </Transition> -->
  <div class="app-alert">
    <transition-group name="slide">
      <div
        v-for="({ msg, color }, index) in items"
        :key="index"
        class="alert"
        :class="color"
        role="alert"
      >
        {{ msg }}
      </div>
    </transition-group>
  </div>
</template>

<script setup>
defineProps({
  items: Array
});
// defineProps({
//   show: {
//     type: Boolean,
//     default: false
//   },
//   msg: {
//     type: String,
//     Required: true
//   },
//   color: {
//     type: String,
//     default: 'error'
//     //validator: (value) => ['success', 'error'].includes(value)
//   }
// });
</script>

<style scoped>
.app-alert {
  position: fixed;
  top: 10px;
  right: 10px;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}
.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
