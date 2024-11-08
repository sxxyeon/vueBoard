<template>
  <PopularPosts />
  <div class="container py-5">
    <PostFilter
      v-model:title="params.title_like"
      v-model:limit="limit"
      @list="handleList"
    />
    <div v-if="loading">
      <div class="text-center mt-5">
        <div class="spinner-border text-muted" role="status">
          <span class="sr-only"></span>
        </div>
      </div>
    </div>

    <div v-else>
      <AppGrid :items="slicedPosts" :is-list="isList">
        <template #default="{ item }">
          <PostItem
            :id="item.id"
            :liked="item.isLiked"
            :name="item.name"
            :is-list="isList"
            :title="item.title"
            :content="item.content"
            :created-at="item.createdAt"
            :type="item.type"
            @click="goPage(item.id)"
            @modal="openModal(item)"
            @update-liked="(liked) => updateLiked(item.id, liked)"
          />
        </template>
      </AppGrid>

      <AppPagination
        :current-page="curpage"
        :page-count="pageCount"
        @page="(page) => (curpage = page)"
      />

      <Teleport to="#modal">
        <PostModal
          v-model="show"
          :title="modalTitle"
          :content="modalContent"
          :created-at="modalCreatedAt"
          :post-id="modalPostId"
          @detail="goPage"
        />
      </Teleport>
    </div>
  </div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import AppGrid from '@/components/AppGrid.vue';
import AppPagination from '@/components/AppPagination.vue';
import PostFilter from '@/components/posts/PostFilter.vue';
import PostModal from '@/components/posts/PostModal.vue';
import { getPosts, updatePost } from '@/api/posts';
import { computed, ref, watch, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import PopularPosts from '@/components/posts/PopularPosts.vue';

const params = ref({
  _sort: 'createdAt',
  //_order: 'desc',
  title_like: ''
});
const path = ref(0);
const limit = ref(9);
const curpage = ref(1);
const posts = ref([]); // 전체 게시글 목록
const loading = ref(true); // 로딩 상태 관리

const router = useRouter();
const route = useRoute();

watch(
  [() => limit.value, () => curpage.value, () => params.value.title_like],
  () => {
    fetchPosts();
  }
);

watch(
  () => route.path,
  (newPath) => {
    path.value = newPath.slice(-1);
    // 변경된 path에 따라 _page 값을 리셋하지 않도록 설정
    curpage.value = 1;
    fetchPosts();
  }
);
const pageCount = computed(() =>
  Math.floor(
    filteredPosts.value.length / limit.value < 1
      ? 1
      : Math.ceil(filteredPosts.value.length / limit.value)
  )
);

const filteredPosts = computed(() => {
  return posts.value.filter((item) => {
    if (Number(path.value) === 1) {
      return Number(item.type) === 1;
    } else if (Number(path.value) === 2) {
      return Number(item.type) === 2;
    } else if (Number(path.value) === 3) {
      return Number(item.type) === 3;
    }
    return true;
  });
});
const slicedPosts = computed(() => {
  const start = (curpage.value - 1) * limit.value;
  const end = Number(start) + Number(limit.value);
  return filteredPosts.value.slice(start, end);
});

const fetchPosts = async () => {
  try {
    loading.value = true; // 로딩 시작
    const { data } = await getPosts(params.value);
    posts.value = data;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false; // 로딩 완료
  }
};

fetchPosts();

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

// Modal 관련 상태
const show = ref(false);
const modalTitle = ref('');
const modalContent = ref('');
const modalCreatedAt = ref('');
const modalPostId = ref(null); // postId 추가
const isList = ref(true);

const openModal = ({ title, content, createdAt, id }) => {
  show.value = true;
  modalTitle.value = title;
  modalContent.value = content;
  modalCreatedAt.value = createdAt;
  modalPostId.value = id; // postId 설정
};

const handleList = (value) => {
  if (value === 'list') {
    isList.value = true;
  } else if (value === 'grid') {
    isList.value = false;
  }
};
</script>

<style scoped></style>
