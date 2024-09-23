<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mt-5">
      <h2 class="tit fs-3 fw-bold">{{ post.title }}</h2>
      <p class="text-muted fs-6 m-0">{{ post.createdAt }}</p>
    </div>
    <p class="post_cont text-muted">{{ post.content }}</p>

    <!-- 댓글 리스트 -->
    <div class="comments mt-4">
      <h3 class="fs-6 fw-bold mb-3">댓글</h3>
      <template v-if="filteredComments.length === 0">
        <p class="text-muted fz-sm my-5">댓글이 없습니다.</p>
      </template>
      <template v-else>
        <div
          v-for="comment in filteredComments"
          :key="comment.id"
          class="comment-item"
        >
          <p class="mb-1 fz-sm text-muted">{{ comment.date }}</p>
          <p class="">{{ comment.content }}</p>
        </div>
      </template>
    </div>

    <!-- 댓글 작성 -->
    <div
      class="add-comment mt-4 row mb-5 d-flex justify-content-between align-items-center"
    >
      <div class="col-11">
        <textarea
          v-model="newComment.content"
          placeholder="댓글을 입력하세요"
          class="form-control"
        ></textarea>
      </div>
      <div class="col-1 d-flex">
        <button class="btn btn-primary w-100" @click="submitComment">
          작성
        </button>
      </div>
    </div>

    <div class="row g-2">
      <div class="col-auto me-auto"></div>
      <div class="col-auto">
        <button class="btn btn-primary btn-sm" @click="goListPage">목록</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-sub btn-sm" @click="goEditPage">수정</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-dark btn-sm" @click="remove">삭제</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, watch } from 'vue';
import {
  getPostById,
  deletePost,
  getComments,
  createComment
} from '@/api/posts';

const props = defineProps({
  id: String
});
const id = ref(props.id);

const router = useRouter();
const post = ref({});
const comments = ref([]);
const filteredComments = ref([]);
const newComment = ref({
  content: ''
});

// 게시글 불러오기
const fetchPost = async () => {
  try {
    const { data } = await getPostById(id.value);
    post.value = data; // 데이터 구조에 맞게 수정
    await fetchComments(); // 댓글도 불러오기
  } catch (error) {
    console.error(error);
  }
};

// 댓글 불러오기
const fetchComments = async () => {
  try {
    const { data } = await getComments();
    // 데이터가 객체일 경우 배열로 감싸기
    comments.value = Array.isArray(data) ? data : [data];
    console.log(comments.value);
    filteredComments.value = comments.value.filter(
      (comment) => Number(comment.postId) === Number(id.value)
    );
  } catch (error) {
    console.error(error);
  }
};

// 댓글 작성
const submitComment = async () => {
  try {
    if (!newComment.value.content) {
      alert('댓글 내용을 입력하세요');
      return;
    }

    // 현재 날짜를 ISO 형식으로 변환
    const currentDate = new Date().toISOString().split('T')[0];

    await createComment({
      postId: id.value,
      content: newComment.value.content,
      date: currentDate // 날짜를 문자열로 변환하여 저장
    });

    alert('댓글이 작성되었습니다.');
    newComment.value.content = ''; // 입력란 초기화
    await fetchComments(); // 댓글 목록 새로 불러오기
  } catch (error) {
    console.error(error);
  }
};

// 게시글 삭제
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

// 목록 페이지로 이동
const goListPage = () => {
  router.push({ name: 'PostList' });
};

// 수정 페이지로 이동
const goEditPage = () => {
  router.push({ name: 'PostEdit', params: { id: id.value } });
};

// 라우트 파라미터 변화 감지
const route = useRoute();
watch(
  () => route.params.id,
  async (newId) => {
    if (newId) {
      id.value = newId; // 업데이트된 ID
      await fetchPost(); // 게시글 및 댓글 데이터 다시 불러오기
    }
  },
  { immediate: true }
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
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 10px;
  margin: 20px 0;
}
.comments {
  padding-top: 10px;
}
.comment-item {
  border-top: 1px solid #eee;
  padding: 10px 0;
}
.comment-item:first-of-type {
  border-top: none;
}
textarea {
  height: 130px;
}
</style>
