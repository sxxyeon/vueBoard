<template>
  <main>
    <div class="">
      <RouterView></RouterView>
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
