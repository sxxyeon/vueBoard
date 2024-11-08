<template>
  <AppCard class="swiper_card">
    <template #default>
      <div class="clearfix">
        <div class="profile">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="#6EDBB4"
            class="bi bi-person-circle"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path
              fill-rule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
            />
          </svg>
        </div>
        <div>
          <h6
            v-if="name"
            class="d-flex flex-row justify-content-between fz-sm mb-2 text-muted"
          >
            <span>{{ typeText(type) }}</span> <span>by {{ name }}</span>
          </h6>
          <h6 class="card-title fw-bold">{{ title }}</h6>
          <p class="card-content text-muted">{{ content }}</p>
        </div>
      </div></template
    >
  </AppCard>
</template>

<script setup>
import AppCard from '../AppCard.vue';

const props = defineProps({
  id: {
    type: Number
  },
  name: {
    type: String
  },
  title: {
    type: String,
    Required: true
  },
  content: {
    type: String
  },
  type: {
    type: Number
  }
});

const typeText = (type) => {
  switch (type) {
    case 1:
      return '경제/사회';
    case 2:
      return '연예/이슈';
    case 3:
      return '고민상담';
    default:
      return '기타';
  }
};
</script>

<style scoped>
.swiper_card {
  height: 123px;
}
@media (min-width: 576px) {
  .swiper_card {
    height: 240px;
  }
}
</style>
