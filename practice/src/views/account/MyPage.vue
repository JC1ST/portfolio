<template>
  <Header />
  <MyPage />
  <Footer />
  <RightSideBar />
</template>

<script lang="ts" setup>
import Header from '@/components/commons/Header.vue'
import Footer from '@/components/commons/Footer.vue'
import RightSideBar from '@/components/commons/RightSideBar.vue'
import MyPage from '@/components/account/MyPage.vue'
</script>

<style lang="scss" scoped>
@import '@/scss/main';
</style>
