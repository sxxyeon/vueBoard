<template>
  <nav class="mt-5" aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="isPrevPage">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="$emit('page', currentPage - 1)"
        >
          <span aria-hidden="true"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-caret-left-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"
              />
            </svg>
          </span>
        </a>
      </li>
      <li
        v-for="page in pageCount"
        :key="page"
        class="page-item"
        :class="{ active: currentPage === page }"
      >
        <a class="page-link" href="#" @click.prevent="$emit('page', page)">{{
          page
        }}</a>
      </li>
      <li class="page-item" :class="isNextPage">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="$emit('page', currentPage + 1)"
        >
          <span aria-hidden="true"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-caret-right-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"
              />
            </svg>
          </span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  currentPage: {
    type: Number,
    Required: true
  },
  pageCount: {
    type: Number,
    Required: true
  }
});
defineEmits(['page']);
const isPrevPage = computed(() => {
  return { disabled: !(props.currentPage > 1) };
});
const isNextPage = computed(() => {
  return { disabled: !(props.currentPage < props.pageCount) };
});
</script>

<style scoped>
.active > .page-link,
.page-link.active {
  background-color: #6edbb4;
  border-color: #6edbb4;
  color: #fff;
}
.page-link {
  color: #50a486;
}
.page-link:focus {
  outline: none !important;
  box-shadow: none !important;
}
</style>
