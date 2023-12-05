<template>
  <main>
    <h1>ProfileView</h1>
    <h3>{{ profile }}</h3>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ProfileService from '../services/profile.service';

const profile = ref(null);

const loadProfile = async () => {
  ProfileService.getProfile().then(
    (res) => {
      profile.value = res.data;
    },
    (err) => {
      console.error('Error loading profile:', err);
    }
  );
};

onMounted(() => {
  loadProfile();
});
</script>

<style lang="scss" scoped></style>
