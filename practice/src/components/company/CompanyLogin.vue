<template>
  <main>
    <div class="company-login">
      <div class="left-image">
        <img src="" alt="Image" />
      </div>
      <div class="right-login">
        <div class="top-title">로그인</div>
        <div class="login-input">
          <input type="text" placeholder="이메일 입력" />
          <div class="error-text"></div>
          <input
            type="password"
            placeholder="비밀번호(영문+숫자+특수문자 8~16자)"
          />
          <div class="error-text"></div>
        </div>
        <div class="login-button">
          <img src="@/assets/company/login-button.png" alt="submit" />
        </div>
        <div class="reg-find">
          <div @click="showRegisterModal">회원가입</div>
          <div>비밀번호 찾기</div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { Modal } from 'bootstrap'

let registerModal: Modal

const showRegisterModal = () => {
  const registerModalEl: Element = document.getElementById(
    'company-register'
  ) as Element

  if (registerModalEl) {
    registerModal = new Modal(registerModalEl)
    registerModal.show()
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/main';

.company-login {
  @include make-container();
  display: flex;
  justify-content: space-between;
  margin: 160px auto;

  .left-image {
    height: 561px;
    width: 771px;
    background-position: right;
  }

  .right-login {
    margin-left: 60px;

    .top-title {
      font-size: 30px;
      width: 175px;
      color: #191919;
      font-weight: bold;
      line-height: 60px;
      margin-bottom: 60px;
    }

    .login-input {
      display: flex;
      flex-direction: column;
      margin-bottom: 40px;

      .error-text {
        color: #fa5252;
        font-size: 12px;
        margin-top: 5px;
      }

      input {
        border-radius: 5px;
        background-color: #f9fcff;
        border: none;
        width: 447px;
        height: 60px;
        padding: 20px 15px;
        font-size: 14px;

        &::placeholder {
          color: #999;
        }
      }

      input[type='password'] {
        margin-top: 27px;
      }
    }

    .login-button {
      margin-bottom: 28px;
    }

    .reg-find {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      color: #767676;
      cursor: pointer;

      div {
        &:first-child {
          &::after {
            content: '|';
            margin: 0 16px;
          }
        }

        &:hover {
          color: #191919;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
