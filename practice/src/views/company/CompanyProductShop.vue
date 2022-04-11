<template>
  <CompanyHeader />
  <CompanyProductShop />
  <Footer />
</template>

<script lang="ts" setup>
import CompanyHeader from '@/components/commons/CompanyHeader.vue'
import Footer from '@/components/commons/Footer.vue'
import CompanyProductShop from '@/components/company/CompanyProductShop.vue'
</script>

<style lang="scss" scoped>
@import '@/scss/main';
</style>
