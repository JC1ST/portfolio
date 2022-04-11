<template>
  <header>
    <div class="header-top">
      <div class="logo">
        <RouterLink to="/">
          <img src="" width="200" height="80" alt="logo" />
        </RouterLink>
      </div>

      <div class="header-user-box">
        <RouterLink to="/" class="corp-move"
          >개인회원 페이지로 이동하기</RouterLink
        >
      </div>
    </div>

    <div class="header-bottom">
      <div class="header-bottom-title">
        <div class="title">Management Company</div>
      </div>
    </div>
  </header>
  <div class="main-right-fixed-bottom">
    <div class="top-img">
      <img src="@/assets/main/top.png" alt="top" @click="moveTop" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const moveTop = () => {
  window.scroll({
    behavior: 'smooth',
    top: 0,
  })
}
</script>

<style lang="scss" scoped>
@import '@/scss/main';

header {
  width: 100%;
  height: 230px;
  box-shadow: 0 0 10px 0 rgba(0, 16, 40, 0.2);
  position: relative;

  .header-top {
    @include make-container();
    height: 150px;
    display: flex;
    justify-content: space-between;
    .logo {
      cursor: pointer;
      margin-top: 24px;
    }

    .header-user-box {
      height: 150px;
      width: 200px;
      position: relative;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .corp-move {
        position: absolute;
        top: 15px;
        right: 0;
        color: #565656;
        letter-spacing: -1.4px;
        cursor: pointer;
        text-decoration: none;

        &:hover {
          font-weight: bold;
        }
      }
    }
  }
  .header-bottom {
    width: 100%;
    background-color: #fff;
    border-top: solid 1.3px #dcdcdc;
    background-color: #fff;
    .header-bottom-title {
      @include make-container();
      height: 80px;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .title {
        font-size: 26px;
        color: #222;
      }
    }
  }
}
.main-right-fixed-bottom {
  position: fixed;
  right: 25px;
  bottom: 95px;
  z-index: 10000001 !important;

  img {
    cursor: pointer;
  }
}
</style>
