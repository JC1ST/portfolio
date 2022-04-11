<template>
  <Header />
  <BrandRankShops />
  <Footer />
  <RightSideBar />
</template>

<script lang="ts" setup>
import Header from '@/components/commons/Header.vue'
import Footer from '@/components/commons/Footer.vue'
import BrandRankShops from '@/components/brand/BrandRankShops.vue'
import RightSideBar from '@/components/commons/RightSideBar.vue'
</script>

<style lang="scss" scoped>
@import '@/scss/main';
</style>
