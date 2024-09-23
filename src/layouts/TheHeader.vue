<template>
  <header>
    <nav class="navbar navbar-expand-sm navbar-dark">
      <div class="container">
        <RouterLink to="/" class="navbar-brand"
          ><img src="/img/logo.png" height="40px"
        /></RouterLink>

        <button class="btn p-0" @click="router.push(`/create`)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="white"
            class="bi bi-pencil-square"
            viewBox="0 0 16 16"
          >
            <path
              d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
            />
            <path
              fill-rule="evenodd"
              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
            />
          </svg>
        </button>
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
import { useRouter } from 'vue-router';

const router = useRouter();
const goPage = () => {
  router.push({
    name: 'PostCreate'
  });
};
</script>

<style scoped>
header nav {
  background: #6edbb4;
}
</style>
