<template>
  <Transition>
    <div v-if="modelValue">
      <div class="modal-backdrop fade show"></div>

      <!-- Modal -->
      <div
        class="modal fade show d-block"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="false"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <slot name="header">
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  @click="$emit('update:modelValue', false)"
                ></button>
              </slot>
            </div>
            <div class="modal-body"><slot></slot></div>
            <div class="modal-footer align-center justify-content-center">
              <slot name="actions"> </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  modelValue: Boolean,
  title: String
});

defineEmits(['close', 'update:modelValue']);
</script>

<style scoped>
#modal {
  width: 100vw;
  height: 100vh;
}
.modal-dialog {
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 1px 10px 10px rgb(0, 0, 0, 15%);
}
.modal-body {
  box-sizing: border-box;
}
.modal-footer {
  border: none;
}
.modal.show .modal-dialog {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) !important;
  width: 70%;
  max-width: 500px;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s;
}
.v-enter-to,
.v-leave-from {
  opacity: 1;
}
</style>
