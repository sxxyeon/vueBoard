<template>
  <header>
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
      <div class="container">
        <RouterLink to="/" class="navbar-brand"
          ><img src="/img/logo.png" height="40px"
        /></RouterLink>
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

<style lang="scss" scoped></style>
