<template>
  <div class="main-theme">
    <div class="title">테마</div>
    <div class="main-theme-category">
      <div class="theme-category">
        <img src="" alt="" />
      </div>
      <div class="theme-category">
        <img src="" alt="" />
      </div>
      <div class="theme-category">
        <img src="" alt="" />
      </div>
      <div class="theme-category">
        <img src="" alt="" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
@import '@/scss/main';

.main-theme {
  @include make-container();
  margin-bottom: 60px;

  .title {
    font-size: 26px;
    font-weight: normal;
    letter-spacing: -1px;
    text-align: left;
    color: #222;
    margin-bottom: 20px;
  }

  .main-theme-category {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .theme-category {
      width: 290px;
      height: 160px;
      overflow: hidden;
      border-radius: 20px;
      box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.16);
      background-color: #fbfbfb;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
}
</style>
