<template>
  <AppHeader />
  <RouterView class="content" />
  <AppFooter class="footer" />
</template>

<script setup>
import { RouterView } from 'vue-router';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Rubik&family=Rubik+Mono+One&display=swap');

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: 'Rubik', sans-serif;
}

body {
  margin: 0;
  padding: 0;
}

.content {
  flex: 1;
}

.footer {
  margin-top: auto;
}
</style>
