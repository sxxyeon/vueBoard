<template>
  <header :class="!isMain && 'header-sub'">
    <nav class="navbar navbar-expand-sm navbar-dark">
      <div class="container">
        <RouterLink to="/"
          ><img v-if="isMain" src="/img/logo.png" height="35px" />
          <img v-else src="/img/logo_g.png" height="35px"
        /></RouterLink>

        <button
          class="btn"
          :class="isMain ? 'btn-outline' : 'btn-outline btn-primary-outline'"
          @click="router.push(`/create`)"
        >
          글 쓰기
        </button>
        <!--Vue.js의 :class 바인딩을 사용해야 조건에 따라 동적으로 클래스를 변경할 수 있다.-->
        <!-- 
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button> -->
        <!-- <div id="navbarSupportedContent" class="collapse navbar-collapse">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <RouterLink to="/" class="nav-link" active-class="active">
                Home
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/about" class="nav-link" active-class="active">
                About
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/posts" class="nav-link" active-class="active">
                게시글
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/nested" class="nav-link" active-class="active">
                Nested
              </RouterLink>
            </li>
          </ul>
        </div> -->
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

watch(
  () => props.isMain,
  (newIsMain) => {}
);

const goPage = () => {
  router.push({
    name: 'PostCreate'
  });
};
</script>

<style scoped>
.header-sub {
  /* border-bottom: 1px solid #6edbb4; */
}
.btn {
  height: 38px;
  padding-top: 7px;
}
</style>
