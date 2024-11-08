<template>
  <form>
    <div class="mt-2 mb-3 mt-lg-3">
      <label for="name" class="form-label text-muted fz-sm mb-0">닉네임</label>
      <input
        id="name"
        :value="name"
        type="text"
        class="form-control"
        placeholder="익명"
        @input="$emit('update:name', $event.target.value)"
      />
    </div>
    <div class="mb-3 mb-lg-5">
      <label for="title" class="form-label text-muted fz-sm mb-0">제목</label>
      <input
        id="title"
        :value="title"
        type="text"
        class="form-control"
        placeholder="제목"
        @input="$emit('update:title', $event.target.value)"
      />
    </div>
    <div class="my-3 my-lg-5">
      <label for="content" class="form-label text-muted fz-sm mb-0">내용</label>
      <textarea
        id="content"
        :value="content"
        class="form-control"
        rows="3"
        placeholder="내용을 적어주세요."
        @input="$emit('update:content', $event.target.value)"
      ></textarea>
    </div>
    <slot name="actions"></slot>
  </form>
</template>

<script setup>
defineProps({
  title: String,
  content: String,
  name: String
});
defineEmits(['update:name', 'update:title', 'update:content']);
</script>

<style scoped>
form {
}
textarea {
  min-height: 200px;
}
</style>
