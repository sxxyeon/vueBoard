<template>
  <div>
    <PostFilter
      v-model:title="params.title_like"
      v-model:limit="params._limit"
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
      <AppGrid :items="posts" :is-list="isList">
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

      <AppPagination
        :current-page="params._page"
        :page-count="pageCount"
        @page="(page) => (params._page = page)"
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
import { computed, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const posts = ref([]);
const router = useRouter();
const params = ref({
  _sort: 'createdAt',
  _order: 'desc',
  _page: 1,
  _limit: 9,
  title_like: ''
});
const totalCount = ref(0);
const pageCount = computed(() =>
  Math.ceil(totalCount.value / params.value._limit)
);

const loading = ref(true); // 로딩 상태 관리

const fetchPosts = async () => {
  try {
    loading.value = true; // 로딩 시작
    const { data, headers } = await getPosts(params.value);
    posts.value = data;
    totalCount.value = headers['x-total-count'];
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
  console.log('List type selected:', value); // 콘솔에 로그 찍기
  if (value === 'list') {
    isList.value = true;
  } else if (value === 'grid') {
    isList.value = false;
  }
};
</script>

<style scoped></style>
