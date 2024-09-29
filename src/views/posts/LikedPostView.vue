<template>
  <div class="pt-3 py-5">
    <div v-if="loading">
      <div class="text-center mt-5">
        <div class="spinner-border text-muted" role="status">
          <span class="sr-only"></span>
        </div>
      </div>
    </div>

    <div v-else>
      <AppGrid :items="likedPosts" :is-list="isList">
        <template #default="{ item }">
          <PostItem
            :id="item.id"
            :liked="item.isLiked"
            :name="item.name"
            :is-list="isList"
            :title="item.title"
            :content="item.content"
            :created-at="item.createdAt"
            @click="goPage(item.id)"
            @modal="openModal(item)"
            @update-liked="(liked) => updateLiked(item.id, liked)"
          />
        </template>
      </AppGrid>
    </div>
  </div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import AppGrid from '@/components/AppGrid.vue';
import AppPagination from '@/components/AppPagination.vue';
import PostFilter from '@/components/posts/PostFilter.vue';
import { getPosts, updatePost } from '@/api/posts';
import { computed, ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const posts = ref([]);
const likedPosts = ref([]);
const router = useRouter();
const params = ref({
  _sort: 'isLiked',
  _order: 'desc',
  _page: 1,
  _limit: 50,
  title_like: ''
});

const loading = ref(true); // 로딩 상태 관리
const pageCount = ref(0);

const fetchPosts = async () => {
  try {
    loading.value = true; // 로딩 시작
    const { data, headers } = await getPosts(params.value);
    posts.value = data;
    likedPosts.value = posts.value.filter((post) => post.isLiked === true);
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false; // 로딩 완료
  }
};

fetchPosts();
watchEffect(fetchPosts);

const updateLiked = async (id, liked) => {
  const post = posts.value.find((item) => Number(item.id) === Number(id));
  post.isLiked = liked;
  await updatePost(String(id), { isLiked: liked });
};

const goPage = (id) => {
  router.push({
    name: 'PostDetail',
    params: { id }
  });
};

const isList = ref(true);

const handleList = (value) => {
  console.log('List type selected:', value); // 콘솔에 로그 찍기
  if (value === 'list') {
    isList.value = true;
  } else if (value === 'grid') {
    isList.value = false;
  }
};
</script>

<style scoped></style>
