<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">
      <h2 class="tit">{{ post.title }}</h2>
      <p class="text-muted fs-6 m-0">{{ post.createdAt }}</p>
    </div>
    <p class="post_cont">{{ post.content }}</p>

    <hr class="my-4" />
    <div class="row g-2">
      <div class="col-auto me-auto"></div>
      <div class="col-auto">
        <button class="btn btn-outline-dark btn-sm" @click="goListPage">
          목록
        </button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-primary btn-sm" @click="goEditPage">
          수정
        </button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-danger btn-sm" @click="remove">
          삭제
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { getPostById, getPosts } from '@/api/posts';
import { computed, ref, toRefs, watch, watchEffect } from 'vue';
import { deletePost } from '@/api/posts';

const props = defineProps({
  id: String
});
const id = ref(props.id);

const router = useRouter();
//const id = route.params.id;

const post = ref({});

const fetchPost = async () => {
  try {
    const { data } = await getPostById(id.value);

    //post.value = { ...data };
    setPost(data);
  } catch (error) {
    console.error(error);
  }
};

const setPost = ({ title, content, createdAt }) => {
  post.value.title = title;
  post.value.content = content;
  post.value.createdAt = createdAt;
};

fetchPost();

const remove = async () => {
  try {
    if (confirm('삭제하시겠습니까?') === false) {
      return;
    }
    await deletePost(id.value);
    alert('삭제되었습니다');
    router.push({ name: 'PostList' });
  } catch (error) {
    console.error(error);
  }
};

// watchEffect(() => {
//   const { title, content, createdAt } = toRefs(form.value);
//   console.log(title, content, createdAt);
// });

const goListPage = () => {
  router.push({
    name: 'PostList'
  });
};

const goEditPage = () => {
  router.push({
    name: 'PostEdit',
    params: { id: id.value } //안 붙혀줘도 똑같다.
  });
};

const route = useRoute();

watch(
  () => route.params.id, // Watch for changes in route params
  async (newId) => {
    if (newId) {
      id.value = newId; // Update id if route changes
      console.log(id.value);
      await fetchPost(); // Fetch post data based on the new id
    }
  },
  { immediate: true } // Fetch data on initial load
);
</script>

<style scoped>
.tit {
  width: 70%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.post_cont {
  min-height: 200px;
  border: 1px solid #ddd;
  padding: 10px;
  margin: 20px 0;
}
</style>
