<template>
  <div>
    <h2 class="tit">게시글 수정</h2>
    <hr class="my-4" />
    <PostForm
      v-model:title="form.title"
      v-model:content="form.content"
      @submit.prevent="edit"
    >
      <template #actions>
        <div class="w-full d-flex justify-content-center gap-2">
          <button
            type="button"
            class="btn btn-outline-dark w-25"
            @click="goDetailPage"
          >
            취소</button
          ><button class="btn btn-dark w-25">수정</button>
        </div>
      </template>
    </PostForm>
    <!-- <AppAlert :show="showAlert" :msg="alertMsg" :color="alertColor" /> -->
    <AppAlert :items="alerts" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { getPostById } from '@/api/posts';
import { updatePost } from '@/api/posts';
import PostForm from '@/components/posts/PostForm.vue';
import AppAlert from '@/components/AppAlert.vue';
import { ref } from 'vue';

const props = defineProps({
  id: String
});
const id = props.id;
const router = useRouter();

const form = ref({
  title: null,
  content: null,
  createdAt: null
});

const fetchPost = async () => {
  try {
    const { data } = await getPostById(id);
    setForm(data);
  } catch (error) {
    console.error(error);
    vAlert('네트워크 오류', 'alert-danger');
  }
};

const setForm = ({ title, content, createdAt }) => {
  form.value.title = title;
  form.value.content = content;
  form.value.createdAt = createdAt;
};

fetchPost();

const edit = async () => {
  await updatePost(id, { ...form.value });
  vAlert('수정이 완료됐습니다!', 'alert-success');
  //router.push({ name: 'PostDetail', params: { id } }); // 근데 이거 params 추가 안 해줘도 잘 가네..
};

const goDetailPage = () => {
  history.back();
};

//alert

const alerts = ref([]);
// const showAlert = ref(false);
// const alertMsg = ref('');
// const alertColor = ref('');

const vAlert = (msg, color) => {
  console.log(msg, color);
  alerts.value.push({ msg, color });
  console.log(alerts.value);
  // showAlert.value = true;
  // alertMsg.value = msg;
  // alertColor.value = color;
  setTimeout(() => {
    //showAlert.value = false;
    alerts.value.shift();
  }, 2000);
};
</script>

<style lang="scss" scoped></style>
