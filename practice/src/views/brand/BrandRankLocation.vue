<template>
  <Header />
  <BrandRankLocation />
  <Footer />
  <RightSideBar />
</template>

<script lang="ts" setup>
import Header from '@/components/commons/Header.vue'
import Footer from '@/components/commons/Footer.vue'
import BrandRankLocation from '@/components/brand/BrandRankLocation.vue'
import RightSideBar from '@/components/commons/RightSideBar.vue'
</script>

<style lang="scss" scoped>
@import '@/scss/main';
</style>
