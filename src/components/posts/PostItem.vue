<template>
  <AppCard>
    <h5 class="card-title fs-5 fw-bold mb-4">{{ title }}</h5>
    <p class="card-content text-muted fs-8">{{ content }}</p>
    <template #footer>
      <div class="d-flex justify-content-between">
        <p class="text-muted m-0 fz-sm">{{ createdAt }}</p>
        <button class="btn p-0" @click.stop="$emit('modal')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#6EDBB4"
            class="bi bi-exclude"
            viewBox="0 0 16 16"
          >
            <path
              d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2zm12 2H5a1 1 0 0 0-1 1v7h7a1 1 0 0 0 1-1z"
            />
          </svg>
        </button>
      </div>
    </template>
  </AppCard>
</template>

<script setup>
import AppCard from '../AppCard.vue';
defineProps({
  title: {
    type: String,
    Required: true
  },
  content: {
    type: String
  },
  createdAt: {
    type: [String, Date, Number]
  }
});

defineEmits(['modal']);
</script>

<style>
.card-title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.card-content {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.text-muted {
  color: #656565 !important;
}
.fz-sm {
  font-size: 14px;
}
</style>
