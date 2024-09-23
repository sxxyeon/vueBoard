<template>
  <AppModal v-model="show">
    <template #default>
      <div class="row g-3">
        <div class="col-12 fz-sm text-muted">{{ createdAt }}</div>
        <div class="col-12 fs-5 fw-bold modal_tit">{{ title }}</div>
        <div class="col-12 text-muted modal_cont">{{ content }}</div>
      </div>
    </template>
    <template #actions>
      <div class="d-flex justify-content-around gap-2 w-100">
        <button
          type="button"
          class="btn btn-primary w-75"
          data-bs-dismiss="modal"
          @click="handleDetail"
        >
          상세보기
        </button>
        <button
          type="button"
          class="btn btn-sub w-75"
          data-bs-dismiss="modal"
          @click="closeModal"
        >
          닫기
        </button>
      </div>
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
  createdAt: [String, Number],
  postId: Number // postId 전달을 위해 추가
});
const emit = defineEmits(['update:modelValue', 'detail']);

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

// 상세보기 클릭 시 postId를 부모로 전달하는 함수
const handleDetail = () => {
  emit('detail', props.postId); // 'detail' 이벤트 발생
  closeModal(); // 모달 닫기
};
</script>

<style scoped>
.modal_tit {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.modal_cont {
  /* min-height: 130px; */
  padding: 8px;
  min-height: 150px;
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
