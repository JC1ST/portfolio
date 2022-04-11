<template>
  <div class="main-youtube-zone">
    <div class="main-youtube">
      <div class="title">
        <div class="text">브랜드 핫 클립</div>
      </div>
      <div class="youtube-list"></div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
@import '@/scss/main';

.main-youtube-zone {
  width: 100%;
  height: 440px;
  background-color: #f5f5f5;

  .main-youtube {
    @include make-container();
    padding-top: 20px;

    .title {
      font-size: 26px;
      font-weight: 500;
      letter-spacing: -1px;
      text-align: left;
      color: #222;
      margin-bottom: 20px;
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

    .youtube-list {
      display: flex;
      flex-wrap: wrap;
    }
  }
}
</style>
