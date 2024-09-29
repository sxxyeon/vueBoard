<template>
  <main>
    <div class="container py-4">
      <div>
        <ul
          class="nav nav-pills position-relative d-flex justify-content-center gap-2 pb-4 mb-4"
        >
          <li class="nav-item">
            <RouterLink
              :to="{ name: 'PostList', replace: true }"
              class="btn"
              active-class="active"
              >PostList</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink
              :to="{ name: 'LikedPost', replace: true }"
              class="btn"
              active-class="active"
              >my</RouterLink
            >
          </li>
        </ul>
        <RouterView></RouterView>
      </div>
    </div>
  </main>
</template>

<script setup></script>

<style scoped>
.nav {
  border-bottom: 1px solid #9fe0c9;
}
.nav-item a {
  border: none;
  border-radius: 30px;
  font-size: 13px;
}
.active {
  background: #9fe0c9;
  color: #000;
}
</style>
