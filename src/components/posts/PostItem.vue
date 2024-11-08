<template>
  <AppCard :is-list="isList">
    <template #header
      ><p class="text-muted m-0 fz-sm position-absolute" style="right: 0px">
        {{ createdAt }}
      </p></template
    >
    <template #default>
      <div class="clearfix">
        <div class="profile">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="#6EDBB4"
            class="bi bi-person-circle"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path
              fill-rule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
            />
          </svg>
        </div>
        <div>
          <h6 v-if="name" class="fz-sm mb-2 text-muted">
            <span>{{ typeText(type) }}</span> • by{{ name }}
          </h6>
          <h6 class="card-title fw-bold">{{ title }}</h6>
          <p class="card-content text-muted">{{ content }}</p>
        </div>
      </div></template
    >

    <template #footer>
      <div class="d-flex justify-content-start align-content-center gap-3">
        <button v-if="!liked" class="btn p-0" @click.stop="toggleLike">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="#ff8036"
            class="bi bi-heart"
            viewBox="0 0 16 16"
          >
            <path
              d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"
            />
          </svg>
        </button>
        <button v-else class="btn p-0" @click.stop="toggleLike">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="#ff8036"
            class="bi bi-heart-fill"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
            />
          </svg>
        </button>
        <button class="btn p-0 pb-1 position-relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="#6EDBB4"
            class="bi bi-chat"
            viewBox="0 0 16 16"
          >
            <path
              d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105"
            />
          </svg>
          <span v-if="commentCount" class="count-bedge">{{
            commentCount
          }}</span>
        </button>
      </div>
    </template>
  </AppCard>
</template>

<script setup>
import { computed, ref, toRefs, watchEffect } from 'vue';
import AppCard from '../AppCard.vue';
import { getComments } from '@/api/posts';

const props = defineProps({
  id: {
    type: Number
  },
  name: {
    type: String
  },
  title: {
    type: String,
    Required: true
  },
  content: {
    type: String
  },
  createdAt: {
    type: [String, Date, Number]
  },
  isList: {
    type: Boolean
  },
  liked: {
    // 추가된 부분: 부모 컴포넌트에서 전달받은 liked 상태
    type: Boolean
  },
  type: {
    type: Number
  }
});

const emit = defineEmits(['modal', 'toggle-liked', 'updateLiked']);

const typeText = (type) => {
  switch (type) {
    case 1:
      return '경제/사회';
    case 2:
      return '연예/이슈';
    case 3:
      return '고민상담';
    default:
      return '기타';
  }
};

const toggleLike = () => {
  const updatedLiked = !props.liked;
  emit('updateLiked', updatedLiked);
};

const comments = ref([]);
const commentCount = ref(0);

const fetchComments = async () => {
  try {
    const { data } = await getComments();
    // 데이터가 객체일 경우 배열로 감싸기
    comments.value = Array.isArray(data) ? data : [data];
    commentCount.value = comments.value.filter(
      (comment) => String(comment.postId) === String(props.id)
    ).length;
  } catch (error) {
    console.error(error);
  }
};
fetchComments();
watchEffect(fetchComments);
</script>

<style>
.profile {
  border-radius: 100%;
  float: left;
  margin-right: 10px;
}
.card-title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.card-content {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.card-grid .card-content {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}
.count-bedge {
  display: block;
  position: absolute;
  width: 11px;
  height: 11px;
  line-height: 13px;
  text-align: center;
  right: 0;
  bottom: 0;
  background-color: #ff8036;
  border-radius: 100%;
  font-size: 8px;
  color: #fff;
}
@media (max-width: 576px) {
  .card-grid .card-content {
    -webkit-line-clamp: 2;
  }
}
</style>
