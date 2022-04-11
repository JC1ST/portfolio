<template>
  <header>
    <div class="header-top">
      <div class="logo">
        <RouterLink to="/">
          <img src="" width="200" height="80" alt="logo" />
        </RouterLink>
      </div>

      <div class="header-search">
        <div class="input-group">
          <span class="input-group-text" id="basic-addon1">
            <img src="@/assets/header/searchIcon.png" alt="searchIcon" />
          </span>
          <input type="password" style="display: none" />
          <input
            type="text"
            class="search-input"
            placeholder="검색어를 입력하세요."
            autocomplete="new-password"
            :value="searchKeyWord"
            @keyup.enter="search"
          />
        </div>
      </div>

      <div class="header-user-login-box" v-if="!isLogin">
        <RouterLink to="/company/login" class="corp-move-login"
          >기업페이지로 이동하기></RouterLink
        >
        <div
          class="user-signup"
          @click="showRegisterModal(RegisterType.DEFAULT)"
        >
          회원가입
        </div>
        <div class="user-signin">로그인</div>
      </div>
    </div>

    <div class="header-bottom">
      <div class="header-menu-zone">
        <div class="header-menu" @click="showDropDown">
          <img src="@/assets/header/line.png" alt="line" />
        </div>
        <div class="header-menu" @click="movePromotion">
          <span>메뉴1</span>
        </div>
        <div class="header-menu" @click="moveRank">
          <span>메뉴2</span>
        </div>
        <div class="header-menu" @click="router.push('/maps')">
          <span>지도</span>
        </div>
      </div>
    </div>
  </header>

  <MyModal id="register-modal" key="register-modal" v-if="!isLogin">
    <Register
      :register-type="registerType"
      @closeRegisterModal="closeRegisterModal"
      @showLoginModal="showLoginModal"
      @changeRegisterType="changeRegisterType"
    />
  </MyModal>

  <div
    class="drop-down-category-menu"
    v-if="dropDown"
    @click.stop="showDropDown"
  >
    <div class="drop-down-category-box" @click.stop>
      <div class="drop-down-close" @click="showDropDown">
        <img src="@/assets/header/close_black.png" alt="close" />
      </div>
      <div
        class="category-item"
        v-for="(large, i) in largeCategory"
        :key="large.id"
        :class="{ noMargin: ((i as number) + 1) % 4 === 0}"
      >
        <div
          class="large-category"
          @click="moveLargeCategory(large.categoryName)"
        >
          <img :src="large.menuImg" alt="category" />
        </div>
        <div class="small-zone">
          <div
            @click="moveSmallCategory(large.categoryName, small.categoryName)"
            class="small-category"
            v-for="small in large.smallCategory"
            :key="small.id"
          >
            {{ small.categoryName }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MyModal from '@/components/commons/Modal.vue'
import Register from '@/components/commons/auth/Register.vue'
import { useRoute, useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { Modal } from 'bootstrap'
import Swal from 'sweetalert2'
import { RegisterType } from '../../types/enum'
import { LargeCategory } from '../../types/category'

const store = useStore()
const route = useRoute()
const router = useRouter()
const registerType = ref<RegisterType>(RegisterType.DEFAULT)
const dropDown = ref<boolean>(false)

const largeCategory = ref<LargeCategory[]>([])

let loginModal: Modal | null = null
let registerModal: Modal | null = null

const isLogin = computed(() => {
  return store.state.auth.isLogin
})

const searchKeyWord = computed(() => {
  return route.query.keyword ? route.query.keyword : ''
})

const closeRegisterModal = () => {
  document.body.removeAttribute('style')
  registerModal?.hide()
}

const showLoginModal = () => {
  const loginModalEl: Element = document.getElementById(
    'login-modal'
  ) as Element

  if (loginModalEl) {
    loginModal = new Modal(loginModalEl)
    loginModal.show()
  }
}

const changeRegisterType = (type: RegisterType) => {
  document.body.removeAttribute('style')
  registerType.value = type
}

const movePromotion = () => {
  router.push('/brand/promotion?type=전체&page=1')
}

const moveRank = () => {
  router.push('/brand/rank/sales?type=전체&sortType=s')
}

const moveLargeCategory = (categoryName: string) => {
  dropDown.value = false
  document.body.removeAttribute('style')
  router.push(`/brand/category?l=${categoryName}&type=l&sortType=s&page=1`)
}

const moveSmallCategory = (largeName: string, smallName: string) => {
  dropDown.value = false
  document.body.removeAttribute('style')
  router.push(
    `/brand/category?l=${largeName}&s=${smallName}&type=s&sortType=s&page=1`
  )
}

const showRegisterModal = (type: RegisterType) => {
  const registerModalEl: Element = document.getElementById(
    'register-modal'
  ) as Element

  if (registerModalEl) {
    registerType.value = type
    registerModal = new Modal(registerModalEl)
    registerModal.show()
  }
}

const search = async (e: Event) => {
  const keyword: HTMLInputElement = e.target as HTMLInputElement
  if (!keyword.value) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    })

    Toast.fire({
      icon: 'warning',
      text: '검색어를 입력해 주세요',
    })
  } else {
    router.push(`/brand/search?keyword=${keyword.value}&sortType=s&page=1`)
  }
}

const showDropDown = () => {
  if (dropDown.value) {
    dropDown.value = false
    document.body.removeAttribute('style')
  } else {
    dropDown.value = true
    document.body.setAttribute('style', 'overflow-y: hidden')
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/main';
header {
  width: 100%;
  height: 230px;
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
    .header-search {
      margin-left: 300px;
      .input-group {
        margin-top: 50px;
        width: 565px;
        height: 50px;
        span {
          background-color: $primary;
          border-radius: 10px 0 0 10px;
          border: 1px solid $primary;
          border-right: 0px;
          width: 50px;
        }
        input {
          border-radius: 0 10px 10px 0;
          border: 1px solid $primary;
          box-sizing: border-box;
          width: 516px;
          padding: 6px 12px;
        }
      }
    }

    .header-user-login-box {
      display: flex;
      height: 150px;
      width: 200px;
      margin-left: 155px;
      color: $black;
      position: relative;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .corp-move-login {
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
      .user-signup,
      .user-signin {
        cursor: pointer;
        font-size: 16px;
        letter-spacing: -0.8px;
        font-weight: normal;
        font-style: normal;

        &:hover {
          font-weight: bold;
        }
      }
      .user-signin {
        margin-left: 19px;
      }
    }
  }
  .header-bottom {
    width: 100%;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.16);
    border-top: solid 1.3px #dcdcdc;
    border-bottom: solid 1.3px #dcdcdc;
    background-color: #fff;
    position: relative;
    .header-menu-zone {
      @include make-container();
      height: 80px;
      display: flex;
      align-items: center;
      .header-menu {
        font-size: 20px;
        font-weight: 500;
        letter-spacing: 1.25px;
        color: #222;
        cursor: pointer;
        margin-right: 30px;
      }
    }
  }
}

.drop-down-category-menu {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1055;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.4);
  overflow-x: hidden;
  overflow-y: hidden;
  outline: 0;
  z-index: 100000001;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }

  .drop-down-category-box {
    width: 1322px;
    height: 800px;
    box-shadow: 0 4px 10px 0 rgb(0 0 0 / 16%);
    border: solid 1px #dcdcdc;
    border-radius: 20px;
    box-sizing: border-box;
    background-color: #fff;
    margin: 60px auto 0 auto;
    z-index: 100000002;
    padding: 80px;
    display: flex;
    position: relative;
    flex-wrap: wrap;
    overflow-y: auto;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    &::-webkit-scrollbar {
      display: none;
    }

    .drop-down-close {
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
    }

    .category-item {
      margin-right: 40px;

      &.noMargin {
        margin-right: 0;
      }

      .large-category {
        margin-bottom: 20px;
        cursor: pointer;
      }

      .small-zone {
        padding-left: 20px;
        display: flex;
        flex-direction: column;
        height: 220px;
        flex-wrap: wrap;

        .small-category {
          margin-bottom: 15px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
