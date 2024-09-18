<template>
  <div>
    <div class="d-flex justify-content-between align-center">
      <h2 class="tit">게시글 목록</h2>
      <button
        class="btn btn-dark btn-sm"
        type="button"
        @click="router.push(`/create`)"
      >
        글쓰기
      </button>
    </div>

    <hr class="my-4" />
    <PostFilter
      v-model:title="params.title_like"
      v-model:limit="params._limit"
    ></PostFilter>
    <hr class="my-4" />
    <AppGrid :items="posts">
      <template #default="{ item }">
        <PostItem
          :title="item.title"
          :content="item.content"
          :created-at="item.createdAt"
          @click="goPage(item.id)"
          @modal="openModal(item)"
        ></PostItem>
      </template>
    </AppGrid>

    <AppPagination
      :current-page="params._page"
      :page-count="pageCount"
      @page="(page) => (params._page = page)"
    ></AppPagination>
    <Teleport to="#modal">
      <PostModal
        v-model="show"
        :title="modalTitle"
        :content="modalContent"
        :created-at="modalCreatedAt"
      />
    </Teleport>
    <hr class="my-5" />
  </div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import PostDetailView from './PostDetailView.vue';
import AppCard from '@/components/AppCard.vue';
import AppGrid from '@/components/AppGrid.vue';
import AppPagination from '@/components/AppPagination.vue';
import PostFilter from '@/components/posts/PostFilter.vue';
import PostModal from '@/components/posts/PostModal.vue';
import { getPosts } from '@/api/posts';
import { computed, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const posts = ref([]);
const router = useRouter();

// pagination
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
  //posts.value = await getPosts();
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
  //router.push(`posts/${id}`);
  // http://localhost:5173/posts/1?search=hello#world!
  router.push({
    name: 'PostDetail',
    params: {
      id
    }
    // query: {
    //   search: 'hello'
    // },
    // hash: '#world!'
  });
};

//modal
const show = ref(false);
const modalTitle = ref('');
const modalContent = ref('');
const modalCreatedAt = ref('');

const openModal = ({ title, content, createdAt }) => {
  show.value = true;

  modalTitle.value = title;
  modalContent.value = content;
  modalCreatedAt.value = createdAt;
};
const closeModal = () => {
  show.value = false;
};
</script>

<style>
.tit {
  font-size: 20px;
  margin: 0;
  font-weight: bold;
}
</style>
