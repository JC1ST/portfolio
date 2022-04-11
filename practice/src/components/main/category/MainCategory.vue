<template>
  <div class="main-top">
    <div class="main-top-banner">
      <Swiper
        class="custom-swiper"
        :slides-per-view="1"
        :space-between="50"
        :speed="1500"
        :loop="true"
        :loop-additional-slides="1"
        :autoplay="{
          delay: 3000,
          disableOnInteraction: false,
        }"
        :navigation="{
          prevEl: '.mainTopBannerPrevRef',
          nextEl: '.mainTopBannerNextRef',
        }"
        :pagination="{ clickable: true }"
        :allow-touch-move="false"
      >
        <SwiperSlide :swiperRef="MainSwiper">
          <img src="" alt="banner" />
        </SwiperSlide>
      </Swiper>
      <div class="mainTopBannerPrevRef">
        <img src="@/assets/main/category/navigationPrev.png" alt="prev" />
      </div>
      <div class="mainTopBannerNextRef">
        <img src="@/assets/main/category/navigationNext.png" alt="next" />
      </div>
    </div>
    <div class="category-rank-zone">
      <div class="category-zone">
        <div class="title">테마 카테고리</div>
        <div class="category-list">
          <!-- -->
          <div
            class="category-item"
            v-for="(item, i) in category"
            :key="item.id"
            :class="{
              noMargin: ((i as number) + 1) % 5 === 0, 
              marginTop: (i as number) + 1 > 5
            }"
          >
            <div class="category-img">
              <img :src="item.mainImg" :alt="item.categoryName" />
            </div>
            <div class="category-name">{{ item.categoryName }}</div>
          </div>
        </div>
      </div>
      <div class="rank-zone">
        <div class="title">주간 검색 순위</div>
        <div class="rank-box"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import MainSwiper, { Navigation, Pagination, Autoplay } from 'swiper'
import 'swiper/swiper.min.css'
import 'swiper/components/pagination/pagination.min.css'
import { ref } from 'vue'
import { LargeCategory } from '../../../types/category'

MainSwiper.use([Navigation, Pagination, Autoplay])

const category = ref<LargeCategory[]>([])
</script>

<style lang="scss" scoped>
@import '@/scss/main';

.main-top {
  display: flex;
  flex-direction: column;
  padding-top: 60px;

  .main-top-banner {
    width: 1320px;
    margin: 0 auto;
    margin-bottom: 60px;
    position: relative;

    .custom-swiper {
      width: 1320px;
      height: 400px;
      border-radius: 10px;
    }

    .mainTopBannerPrevRef,
    .mainTopBannerNextRef {
      position: absolute;
      top: calc(315px / 2);
      z-index: 1;
      cursor: pointer;
    }

    .mainTopBannerPrevRef {
      left: calc(-85px / 2);
    }

    .mainTopBannerNextRef {
      right: calc(-85px / 2);
    }
  }

  .category-rank-zone {
    @include make-container();
    display: flex;
    justify-content: space-between;
    margin-bottom: 60px;

    .title {
      font-size: 26px;
      color: #222;
      font-weight: 500;
    }

    .category-zone {
      .title {
        margin-bottom: 40px;
      }

      .category-list {
        display: flex;
        flex-wrap: wrap;
        width: 870px;
        padding-left: 40px;

        .category-item {
          width: 125px;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          margin-right: 40px;

          &.noMargin {
            margin-right: 0px;
          }

          &.marginTop {
            margin-top: 60px;
          }

          .category-img {
            width: 100px;
            height: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50px;
            background-color: #fbfbfb;
            margin-bottom: 10px;
          }

          .category-name {
            font-size: 18px;
            font-weight: 500;
            color: #353535;
          }
        }

        &.margin {
          margin-top: 60px;
        }
      }
    }

    .rank-zone {
      .title {
        margin-bottom: 20px;
      }
      .rank-box {
        padding: 20px 40px;
        border-radius: 20px;
        box-shadow: 0 0 10px 0 rgba(0, 16, 40, 0.2);
        border: solid 1px #dcdcdc;
        background-color: #fff;
        width: 400px;
      }
    }
  }
}
</style>
