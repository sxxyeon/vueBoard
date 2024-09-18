<template>
  <AppModal v-model="show" title="게시글">
    <template #default>
      <div class="row g-3">
        <div class="col-3 text-muted">제목</div>
        <div class="col-9">{{ title }}</div>
        <div class="col-3 text-muted">내용</div>
        <div class="col-9 modal_cont">{{ content }}</div>
        <div class="col-3 text-muted">등록일</div>
        <div class="col-9">{{ createdAt }}</div>
      </div>
    </template>
    <template #actions>
      <button
        type="button"
        class="btn btn-dark w-50"
        data-bs-dismiss="modal"
        @click="closeModal"
      >
        닫기
      </button>
    </template>
  </AppModal>
</template>

<script setup>
import { computed } from 'vue';
import AppModal from '../AppModal.vue';

const props = defineProps({
  modelValue: Boolean,
  title: String,
  content: String,
  createdAt: [String, Number]
});
const emit = defineEmits(['update:modelValue']);

const show = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  }
});

const closeModal = () => {
  show.value = false;
};
</script>

<style scoped>
.modal_cont {
  /* min-height: 130px; */
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding: 7px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.col-9:not(.modal_cont) {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
