<template>
  <CompanyHeader />
  <ComapnyProductPayment />
  <Footer />
</template>

<script lang="ts" setup>
import CompanyHeader from '@/components/commons/CompanyHeader.vue'
import Footer from '@/components/commons/Footer.vue'
import ComapnyProductPayment from '@/components/company/CompanyProductPayment.vue'
</script>

<style lang="scss" scoped>
@import '@/scss/main';
</style>
