<template>
  <form>
    <div class="my-5">
      <label for="title" class="form-label text-muted fz-sm">제목</label>
      <input
        id="title"
        :value="title"
        type="text"
        class="form-control"
        placeholder="제목"
        @input="$emit('update:title', $event.target.value)"
      />
    </div>
    <div class="my-5">
      <label for="content" class="form-label text-muted fz-sm">내용</label>
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

<style scoped>
textarea {
  min-height: 200px;
}
</style>
