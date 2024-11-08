<template>
  <header :class="!isMain && 'header-sub'" class="bg-white">
    <nav class="navbar navbar-expand-sm navbar-light border-1 border-bottom">
      <div class="container flex-column gap-5">
        <div
          class="upper w-100 d-flex flex-row justify-content-between align-items-center"
        >
          <RouterLink to="/"
            ><img v-if="isMain" src="/img/logo_g.png" height="35px" />
            <img v-else src="/img/logo_g.png" height="35px"
          /></RouterLink>
          <div>
            <button
              class="btn me-2 btn-outline btn-primary-outline"
              @click="router.push(`/my`)"
            >
              좋아요한 글
            </button>
            <button
              class="btn btn-outline btn-primary-outline"
              @click="router.push(`/create`)"
            >
              글 쓰기
            </button>
          </div>
        </div>
        <div class="gnb w-100">
          <ul class="w-100 d-flex flex-row gap-4 gap-md-5 text-sub fw-bold">
            <li class="nav-item">
              <RouterLink
                :to="{ name: 'PostList' }"
                class="nav-link"
                exact-active-class="active"
              >
                홈
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink
                :to="{ name: 'P1', replace: true }"
                class="nav-link"
                exact-active-class="active"
              >
                경제/사회
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink
                :to="{ name: 'P2', replace: true }"
                class="nav-link"
                exact-active-class="active"
              >
                연예/이슈
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink
                :to="{ name: 'P3', replace: true }"
                class="nav-link"
                exact-active-class="active"
              >
                고민상담
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { inject, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

//const isMain = inject('isMain');

const props = defineProps({
  isMain: {
    type: Boolean
  }
});
</script>

<style scoped>
.active {
  color: #000;
}
</style>
