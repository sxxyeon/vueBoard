<template>
  <AppCard>
    <h5 class="card-title fs-6">{{ title }}</h5>
    <p class="text-muted fs-6 m-0">{{ createdAt }}</p>
    <template #footer>
      <div class="d-flex flex-row-reverse">
        <button class="btn p-0" @click.stop="$emit('modal')">
          <i class="bi bi-arrow-down-right-circle-fill"></i>
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

<style scoped>
.card-title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: block;
}
</style>
