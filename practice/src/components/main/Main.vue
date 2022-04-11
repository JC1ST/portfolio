<template>
  <main>
    <MainCategory />
    <MainYoutube />
    <MainAd />
    <MainTheme />
    <RightSideBar />
  </main>
</template>

<script lang="ts" setup>
import MainCategory from '@/components/main/category/MainCategory.vue'
import MainYoutube from '@/components/main/youtube/MainYoutube.vue'
import MainAd from '@/components/main/ad/MainAd.vue'
import MainTheme from '@/components/main/theme/MainTheme.vue'
import RightSideBar from '@/components/commons/RightSideBar.vue'
</script>

<style lang="scss" scoped>
@import '@/scss/main';
</style>
