<template>
  <form>
    <div class="mb-3">
      <label for="title" class="form-label">제목</label>
      <input
        id="title"
        :value="title"
        type="text"
        class="form-control"
        placeholder="제목"
        @input="$emit('update:title', $event.target.value)"
      />
    </div>
    <div class="mb-3">
      <label for="content" class="form-label">내용</label>
      <textarea
        id="content"
        :value="content"
        class="form-control"
        rows="3"
        @input="$emit('update:content', $event.target.value)"
      ></textarea>
    </div>
    <slot name="actions"></slot>
  </form>
</template>

<script setup>
defineProps({
  title: String,
  content: String
});
defineEmits(['update:title', 'update:content']);
</script>

<style lang="scss" scoped></style>
