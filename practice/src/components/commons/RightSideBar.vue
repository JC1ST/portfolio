<template>
  <div class="main-right-fixed-top">
    <div class="left-bar">
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
    </div>
    <div class="my-content">
      <div class="my-brand">내가 본 ______</div>
      <span>{{ watchBrandCount }}</span>
      <div class="brand-favorite">즐겨찾기</div>
      <span>{{ favoriteCount }}</span>
      <div class="my-compare">______ 비교</div>
      <span @click="showCompareModal">{{ compareBrand.length }}</span>
      <div class="my-consulting calc" @click="moveCalculator">
        수익성 계산기
      </div>
    </div>
  </div>
  <div class="main-right-fixed-bottom">
    <div class="top-img">
      <img src="@/assets/main/top.png" alt="top" @click="moveTop" />
    </div>
  </div>
  <div class="compare-zone" v-if="showCompare" @click.stop="showCompareModal">
    <div class="compare-box" @click.stop>
      <div class="compare-top">
        <div>
          <span>비교하기</span>
          <span class="compare-count">{{ compareBrand.length }} / 6</span>
        </div>
        <div>
          <img
            src="@/assets/modal/close.png"
            alt="close"
            @click="showCompareModal"
          />
        </div>
      </div>
      <div class="compare-body" v-if="compareBrand.length > 0">
        <div class="left-brand-zone">
          <!-- -->
          <div
            class="brand-item"
            v-for="(brand, i) in compareBrand"
            :key="brand.id"
            :style="`background: ${colorArr[i as number]}`"
          >
            <div class="item-top">
              <img
                v-if="brand.brandLogoImg"
                :src="brand.brandLogoImg"
                width="100"
                height="40"
                alt="logo"
              />
              <img v-else src="" width="100" height="40" alt="logo" />
              <img
                src="@/assets/modal/small-close.png"
                class="brand-delete"
                alt="close"
                @click="deleteCompare(brand.id)"
              />
            </div>
            <div class="item-body">
              <div>{{ brand.brandNormalStatus.brandName }}</div>
            </div>
            <div class="item-footer">
              <div class="qna-button">문의하기</div>
            </div>
          </div>
          <!-- -->
        </div>
        <div class="right-graph-zone">
          <CompareShopCountGraph />
          <CompareStartCostGraph />
          <CompareMonthAveGraph />
          <CompareMonthAreaAveGraph />
        </div>
      </div>
      <div v-else class="compare-body no-content">
        <img src="@/assets/brand/no-compare.png" alt="비교" />
        <div>비교하고 싶은 ______를 선택해주세요</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import CompareShopCountGraph from '@/components/commons/compare/CompareShopCountGraph.vue'
import CompareStartCostGraph from '@/components/commons/compare/CompareStartCostGraph.vue'
import CompareMonthAveGraph from '@/components/commons/compare/CompareMonthAveGraph.vue'
import CompareMonthAreaAveGraph from '@/components/commons/compare/CompareMonthAreaAveGraph.vue'
import { useRouter } from 'vue-router'
import { BrandDetail } from '../../types/brand'
import Swal from 'sweetalert2'

const store = useStore()
const router = useRouter()
const showCompare = ref<boolean>(false)

const moveTop = () => {
  window.scroll({
    behavior: 'smooth',
    top: 0,
  })
}

const colorArr: string[] = [
  'rgb(255, 177, 193, 0.6)',
  'rgb(154, 208, 245, 0.6)',
  'rgb(255, 232, 170, 0.6)',
  'rgb(165, 223, 223, 0.6)',
  'rgb(255, 231, 199, 0.6)',
  'rgb(217, 202, 255, 0.6)',
]

const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
})

const showCompareModal = () => {
  if (showCompare.value) {
    showCompare.value = false
    document.body.removeAttribute('style')
  } else {
    showCompare.value = true
    document.body.setAttribute('style', 'overflow-y: hidden')
  }
}

const deleteCompare = (id: string) => {
  const compareBrandList: BrandDetail[] = store.state.brand
    .compareBrand as BrandDetail[]

  const find = compareBrandList.find((e) => e.id === id)

  if (find) {
    const index = compareBrandList.indexOf(find)

    compareBrandList.splice(index, 1)

    store.commit('brand/updateState', {
      compareBrand: compareBrandList,
    })

    Toast.fire({
      icon: 'error',
      title: '비교하기 목록에 삭제 되었습니다',
    })
  }
}

// 웹페이지 F12 오류 확인(vscode에서가 아닌 웹 브라우저 F12에서 로그 확인)
const watchBrandCount = computed(() => {
  return store.state.brand.watchBrand.length as number
})

const favoriteCount = computed(() => {
  return store.state.favorite.favorite.length as number
})

const compareBrand = computed(() => {
  return store.state.brand.compareBrand as BrandDetail[]
})

const moveCalculator = () => {
  router.push('/calculator')
}
</script>

<style lang="scss" scoped>
@import '@/scss/main';

.main-right-fixed-top {
  position: fixed;
  left: calc(50% + 775px);
  top: 302px;
  display: flex;
  flex-wrap: wrap;
  width: 127px;
  .left-bar {
    height: 107px;
    width: 1px;
    border-left: 2px solid $primary;
    position: relative;

    .circle {
      position: absolute;
      width: 10px;
      height: 10px;
      background-color: $primary;
      border-radius: 5px;

      &:nth-child(1) {
        background-color: $primary;
        left: -5.5px;
      }

      &:nth-child(2) {
        top: 37px;
        left: -5.5px;
      }

      &:nth-child(3) {
        top: 74px;
        left: -5.5px;
      }

      &:nth-child(4) {
        top: 107px;
        left: -5.5px;
      }
    }
  }

  .my-content {
    width: 110px;
    margin-left: 15px;
    font-size: 14px;
    font-weight: normal;
    line-height: 1.2;
    letter-spacing: -0.7px;
    text-align: left;
    color: #222;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    div {
      margin-bottom: 18px;
    }

    span {
      cursor: pointer;
    }

    .calc {
      cursor: pointer;
    }
  }
}
.main-right-fixed-bottom {
  position: fixed;
  right: 25px;
  bottom: 95px;

  img {
    cursor: pointer;
  }
}

.compare-zone {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 100000001;
  background-color: rgb(0, 0, 0, 0.4);
  display: flex;
  justify-content: flex-end;

  .compare-box {
    padding: 20px;
    width: 720px;
    height: 100%;
    border: solid 1px #dcdcdc;
    background-color: #fff;
    transition: all 1s;

    .compare-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;

      span {
        font-size: 20px;
        color: #222;

        &.compare-count {
          font-size: 16px;
          margin-left: 6px;
        }
      }

      img {
        width: 30px;
        height: 30px;
        cursor: pointer;
      }
    }

    .compare-body {
      display: flex;
      justify-content: space-between;

      &.no-content {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        font-size: 12px;
        color: #777;

        img {
          margin-bottom: 10px;
        }
      }

      .left-brand-zone {
        padding-top: 22px;
        .brand-item {
          padding: 10px;
          width: 160px;
          height: 120px;
          border-radius: 5px;
          background-color: #fff;

          &:not(:first-child) {
            margin-top: 20px;
          }

          .item-top {
            display: flex;
            justify-content: space-between;
            margin-bottom: 6px;

            .brand-delete {
              width: 10px;
              height: 10px;
              cursor: pointer;
            }
          }

          .item-body {
            font-size: 12px;
            color: #353535;
            margin-bottom: 10px;

            div {
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            }
          }

          .item-footer {
            display: flex;
            justify-content: center;
            .qna-button {
              width: 140px;
              height: 26px;
              border-radius: 3px;
              background-color: #f2f4f6;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 14px;
              color: #353535;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>
