<template>
  <div class="main-ad">
    <div class="title">
      <div class="text">유망브랜드</div>
    </div>
    <div class="main-ad-content">
      <div class="main-ad-banner">
        <img src="" alt="banner" />
      </div>
      <div class="main-ad-list"></div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
@import '@/scss/main';

.main-ad {
  @include make-container();
  padding-top: 20px;
  margin-bottom: 60px;

  .title {
    font-size: 26px;
    font-weight: 500;
    letter-spacing: -1px;
    text-align: left;
    color: #222;
    display: flex;
    justify-content: space-between;

    .company-product {
      a {
        text-decoration: none;
        color: #777;
        font-size: 14px;
        letter-spacing: -0.35px;
      }
    }
  }

  .main-ad-content {
    display: flex;
    position: relative;

    .main-ad-banner {
      border-radius: 20px;
      overflow: hidden;
      position: absolute;
      top: 0;
      left: -200px;
    }

    .main-ad-list {
      display: flex;
      flex-wrap: wrap;
    }
  }
}
</style>
