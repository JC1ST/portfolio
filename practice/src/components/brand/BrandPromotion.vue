<template>
  <main>
    <div class="promotion-top">
      <div class="top-menu-zone">
        <div class="category-item" @click="changePromotion('전체')">
          <div
            class="category-img"
            :class="{ active: route.query.type === '전체' }"
          >
            ALL
          </div>
          <div class="category-name">전체</div>
        </div>
        <div
          class="category-item"
          v-for="item in category"
          :key="item.id"
          @click="changePromotion(item.categoryName)"
        >
          <div
            class="category-img"
            :class="{ active: route.query.type === item.categoryName }"
          >
            <img
              v-if="route.query.type === item.categoryName"
              :src="item.selectImg"
              :alt="item.categoryName"
            />
            <img v-else :src="item.mainImg" :alt="item.categoryName" />
          </div>
          <div class="category-name">{{ item.categoryName }}</div>
        </div>
      </div>
    </div>

    <BrandPromotionList :brand="brand" :isLoading="isLoading" />
    <Paging :page="pageCri" url="promotion" :isLoading="isLoading" />

    <RightSideBar />
  </main>
</template>

<script lang="ts" setup>
import RightSideBar from '@/components/commons/RightSideBar.vue'
import BrandPromotionList from '@/components/brand/promotion/BrandPromotionList.vue'
import Paging from '@/components/commons/Paging.vue'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import { LargeCategory } from '../../types/category'
import { BrandSearch } from '../../types/brand'
import { Page } from '../../types/page'

const route = useRoute()
const router = useRouter()
const category = ref<LargeCategory[]>([])
const isLoading = ref<boolean>(true)
const brand = ref<BrandSearch[]>([])
const pageCri = ref<Page>()

const changePromotion = (type: string) => {
  router.push('/brand/promotion?type=' + type + '&page=1')
}
</script>

<style lang="scss" scoped>
@import '@/scss/main';

.promotion-top {
  @include make-container();

  .top-menu-zone {
    margin: 40px 0;
    display: flex;
    justify-content: space-between;

    .category-item {
      width: 125px;
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      margin-right: 40px;

      .category-img {
        width: 80px;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50px;
        background-color: #fbfbfb;
        margin-bottom: 10px;

        &.active {
          background-color: $primary;
          color: #fff;
        }
      }

      .category-name {
        text-align: center;
        font-size: 14px;
        font-weight: 500;
        color: #353535;
      }
    }
  }
}
</style>
