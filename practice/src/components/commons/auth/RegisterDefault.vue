<template>
  <div class="modal-content" id="modal-content">
    <ModalHeader :headerTitle="'개인회원'" />
    <div class="modal-body">
      <div class="email-register-button">
        <button class="btn btn-primary">이메일로 가입하기</button>
      </div>
      <div class="label">
        <div class="line"></div>
        <div class="label-text">SNS계정으로 회원가입</div>
        <div class="line"></div>
      </div>
      <div class="sns-button">
        <img src="@/assets/modal/naver_login.png" alt="naver_login" />
        <img src="@/assets/modal/kakao_login.png" alt="kakao_login" />
      </div>
      <div class="move-login">
        <div class="text">이미 가입하셨나요?</div>
        <div class="text-login">로그인하기</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ModalHeader from '@/components/commons/ModalHeader.vue'
</script>

<style lang="scss" scoped>
@import '@/scss/main';

#modal-content {
  min-width: 540px;
  width: 540px;
  padding: 40px;
  border: none;
  border-radius: 20px;
  box-shadow: 0 0 10px 0 rgb(0 0 0 / 16%);
  background-color: #fdfdfd;
  display: flex;
  flex-direction: column;

  .modal-body {
    padding: 0;
    width: 320px;
    margin: auto;
    overflow-y: unset;

    .email-register-button {
      padding: 0 10px;
      margin-bottom: 30px;
      box-sizing: border-box;
      font: inherit;
      width: 320px;
      height: 40px;
      border-radius: 10px;
      box-shadow: 0 3px 6px 0 rgb(0 0 0 / 16%);
      background-color: #1569ff;
      font-size: 16px;
      display: inline-block;
      font-weight: 400;
      line-height: 1.5;
      text-align: center;
      text-decoration: none;
      vertical-align: middle;
      cursor: pointer;
    }

    .label {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 17px;

      .line {
        width: 40px;
        border-top: 1px solid #707070;
      }

      .label-text {
        font-size: 20px;
        color: #282828;
      }
    }

    .sns-button {
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
      box-sizing: border-box;
      cursor: pointer;
    }

    .move-login {
      display: flex;
      justify-content: space-between;

      .text {
        font-size: 14px;
        color: #282828;
      }
      .text-login {
        cursor: pointer;
        font-size: 14px;
        color: #282828;
      }
    }
  }
}
</style>
