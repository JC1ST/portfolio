<template>
  <CompanyHeader />
  <CompanyLogin />
  <Footer />
</template>

<script lang="ts" setup>
import CompanyHeader from '@/components/commons/CompanyHeader.vue'
import Footer from '@/components/commons/Footer.vue'
import CompanyLogin from '@/components/company/CompanyLogin.vue'
</script>

<style lang="scss" scoped>
@import '@/scss/main';
</style>
