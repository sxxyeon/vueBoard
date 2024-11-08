<template>
  <div class="bg-wrap">
    <h2 class="container fs-5 pt-5 text-white fw-semibold">
      오늘의 인기포스트
    </h2>
    <Swiper
      class="pt-3 pb-5 px-5 popular_swiper"
      :modules="[Autoplay, Navigation, Pagination]"
      :slides-per-view="1"
      :slides-per-group="1"
      :space-between="20"
      navigation
      :pagination="{ clickable: true }"
      :scrollbar="{ draggable: true }"
      :autoplay="{ delay: 2500, disableOnInteraction: false }"
      :breakpoints="{
        500: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 20 },
        900: { slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 20 },
        1400: { slidesPerView: 5, slidesPerGroup: 5, spaceBetween: 30 }
      }"
    >
      <SwiperSlide v-for="(item, index) in allPosts" :key="index">
        <PopularItem
          :id="item.id"
          :liked="item.isLiked"
          :name="item.name"
          :title="item.title"
          :content="item.content"
          :created-at="item.createdAt"
          :type="item.type"
          @click="goPage(item.id)"
        />
      </SwiperSlide>
      <!-- 추가 슬라이드 -->
    </Swiper>
  </div>
</template>

<script setup>
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import PopularItem from './PopularItem.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { getPosts } from '@/api/posts';

const allPosts = ref([]);
const loading = ref(true); // 로딩 상태 관리

const router = useRouter();
const fetchPosts = async () => {
  try {
    loading.value = true; // 로딩 시작
    const { data } = await getPosts();
    allPosts.value = data;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false; // 로딩 완료
  }
};

fetchPosts();

const goPage = (id) => {
  router.push({
    name: 'PostDetail',
    params: { id }
  });
};
</script>

<style scoped>
.bg-wrap {
  background: rgb(110, 219, 180);
  background: linear-gradient(
    27deg,
    rgba(110, 219, 180, 1) 0%,
    rgba(110, 210, 199, 1) 51%,
    rgba(121, 177, 222, 1) 79%,
    rgba(136, 133, 255, 1) 100%
  );
}
</style>
