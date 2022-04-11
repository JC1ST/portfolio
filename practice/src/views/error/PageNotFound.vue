<template>
  <main>
    <div class="error">
      <img src="@/assets/error/404.png" alt="404" />
      <RouterLink to="/" class="btn btn-primary">Go Back to Home</RouterLink>
    </div>
  </main>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
@import '@/scss/main';

main {
  height: 100vh;
  background-color: #fefcf6;

  .error {
    width: 688px;
    height: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      margin-bottom: 60px;
    }

    a {
      width: 315px;
      height: 85px;
      border-radius: 20px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
