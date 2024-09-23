<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4"></div>

    <PostFilter
      v-model:title="params.title_like"
      v-model:limit="params._limit"
    />

    <AppGrid :items="posts">
      <template #default="{ item }">
        <PostItem
          :title="item.title"
          :content="item.content"
          :created-at="item.createdAt"
          @click="goPage(item.id)"
          @modal="openModal(item)"
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
    <hr class="my-4" style="color: #888" />
  </div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import PostDetailView from './PostDetailView.vue';
import AppGrid from '@/components/AppGrid.vue';
import AppPagination from '@/components/AppPagination.vue';
import PostFilter from '@/components/posts/PostFilter.vue';
import PostModal from '@/components/posts/PostModal.vue';
import { getPosts } from '@/api/posts';
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

const fetchPosts = async () => {
  try {
    const { data, headers } = await getPosts(params.value);
    posts.value = data;
    totalCount.value = headers['x-total-count'];
  } catch (error) {
    console.error(error);
  }
};

fetchPosts();
watchEffect(fetchPosts);

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

const openModal = ({ title, content, createdAt, id }) => {
  show.value = true;
  modalTitle.value = title;
  modalContent.value = content;
  modalCreatedAt.value = createdAt;
  modalPostId.value = id; // postId 설정
};
</script>

<style scoped>
.tit {
  font-size: 24px;
  margin: 0;
  font-weight: bold;
  color: #212529;
}
.btn-outline-primary {
  border-color: #5c5c5c;
  color: #5c5c5c;
}
.btn-outline-primary:hover {
  background-color: #5c5c5c;
  color: white;
}
</style>
