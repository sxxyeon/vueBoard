<template>
  <div class="container my-100">
    <h2 class="tit fs-5 text-center text-muted">게시글 등록</h2>
    <PostForm
      v-model:name="form.name"
      v-model:title="form.title"
      v-model:content="form.content"
      @submit.prevent="save"
    >
      <template #actions>
        <div class="w-full d-flex justify-content-center gap-2">
          <button
            type="button"
            class="w-100 btn btn-sub p-3"
            @click="goListPage"
          >
            목록</button
          ><button class="w-100 btn btn-primary p-3">저장</button>
        </div>
      </template>
    </PostForm>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createPost } from '@/api/posts';
import PostForm from '@/components/posts/PostForm.vue';

const router = useRouter();
const form = ref({
  name: null,
  title: null,
  content: null,
  isLiked: false
});

const todayDate = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  const sumDate = `${year}-${month}-${day}`;
  return sumDate;
};

const save = async () => {
  try {
    const data = {
      ...form.value,
      createdAt: todayDate(new Date())
    };
    await createPost(data);
    alert('새롭게 등록되었습니다.');
    router.push({ name: 'PostList' });
  } catch (error) {
    console.error(error);
  }
};

const goListPage = () => {
  router.push({
    name: 'PostList'
  });
};
</script>

<style></style>
