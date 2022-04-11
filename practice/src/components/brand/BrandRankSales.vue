<template>
  <main>
    <div class="rank-top">
      <div class="top-title">
        각 항목별 <span>순위</span>를 살펴볼수 있습니다.
      </div>
      <div class="top-menu-zone">
        <div
          class="category-item"
          @click="
            router.push(
              `/brand/rank/sales?type=전체&sortType=${route.query.sortType}`
            )
          "
        >
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
          @click="
            router.push(
              `/brand/rank/sales?type=${item.categoryName}&sortType=${route.query.sortType}`
            )
          "
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

    <div class="rank-menu">
      <div class="select-rank-zone">
        <div class="select-menu">
          <div
            class="menu-item"
            :class="{ active: route.path === '/brand/rank/sales' }"
            @click="
              router.push(
                `/brand/rank/sales?type=${route.query.type}&sortType=s`
              )
            "
          >
            항목1
          </div>
          <div
            class="menu-item"
            :class="{ active: route.path === '/brand/rank/location' }"
            @click="
              router.push(
                `/brand/rank/location?type=${route.query.type}&area=서울`
              )
            "
          >
            항목2
          </div>
          <div class="menu-item empty"></div>
        </div>
        <div class="noti">
          제공된 데이터를 기반으로 평균 순위를 제공드립니다.(년도 기준)
        </div>
      </div>
    </div>

    <div class="rank-body" v-if="!isLoading">
      <div class="body-header">
        <div class="rank">랭킹</div>
        <div class="brand-name">이름</div>
        <div
          class="sales-ave"
          :class="{ active: route.query.sortType === 's' }"
          @click="
            router.push(`/brand/rank/sales?type=${route.query.type}&sortType=s`)
          "
        >
          항목1
        </div>
        <div
          class="area-sales-ave"
          :class="{ active: route.query.sortType === 'a' }"
          @click="
            router.push(`/brand/rank/sales?type=${route.query.type}&sortType=a`)
          "
        >
          항목2
        </div>
      </div>

      <div
        class="rank-item"
        v-for="(item, i) in brand"
        :key="item.id"
        @click="router.push('/brand/detail/' + item.id)"
      >
        <div class="rank">{{ i as number + 1 }}</div>
        <div class="brand-name">
          <img
            v-if="item.brandLogoImg"
            :src="item.brandLogoImg"
            width="125"
            height="50"
            alt="logo"
          />
          <img v-else src="" width="125" height="50" alt="logo" />
          <div>{{ item.brandName }}</div>
        </div>
        <div class="sales-ave">
          {{ calcAve(item.brandAreaSalesAve[0].salesAve) }}
        </div>
        <div class="area-sales-ave">
          {{ calcAve(item.brandAreaSalesAve[0].areaSalesAve) }}
        </div>
      </div>
    </div>
    <div class="rank-body" v-else>
      <Skeletor
        :shimmer="true"
        width="1280"
        height="90"
        class="radius mb-5"
        v-for="i in 10"
        :key="i"
      />
    </div>
  </main>
</template>

<script lang="ts" setup>
import { BrandSearch } from '../../types/brand'
import { useRoute, useRouter } from 'vue-router'
import { LargeCategory } from '../../types/category'
import { ref } from 'vue'
import api from '../../config/axios.config'
import { Skeletor } from 'vue-skeletor'

const route = useRoute()
const router = useRouter()
const category = ref<LargeCategory[]>([])
const brand = ref<BrandSearch[]>([])
const isLoading = ref<boolean>(true)

const getCategory = async () => {
  const result = await api.get('/category')

  category.value = result.data.largeCategory
}

const calcAve = (sales: string): string => {
  let monthSalesAve = '0 만원'

  const totalSalesAve = sales

  const monthAve =
    totalSalesAve !== ''
      ? Math.floor(parseInt(totalSalesAve.replaceAll(',', '')) / 12 / 10)
      : 0
  const unit: number = Math.floor(monthAve / 10000)

  monthSalesAve =
    unit > 0
      ? `${unit} 억 ${Math.floor(monthAve % 10000)} 만원`
      : `${monthAve} 만원`

  return monthSalesAve
}

getCategory()
</script>

<style lang="scss" scoped>
@import '@/scss/main';
@import '@/scss/rank.scss';
@import '@/scss/skeletor.scss';

.rank-body {
  @include make-container();
  margin-bottom: 100px;

  .rank {
    width: 250px;
  }

  .brand-name {
    width: 600px;
  }

  .sales-ave,
  .area-sales-ave {
    width: 200px;

    &.active {
      font-weight: bold;
    }
  }

  .body-header {
    display: flex;
    text-align: center;
    font-size: 18px;
    color: #222;

    .sales-ave,
    .area-sales-ave {
      cursor: pointer;

      &.active {
        font-weight: bold;
        color: $primary;
      }
    }
  }

  .rank-item {
    height: 90px;
    margin-top: 20px;
    border-radius: 10px;
    border: solid 1px #dcdcdc;
    background-color: #fff;
    display: flex;
    align-items: center;
    text-align: center;
    cursor: pointer;

    .brand-name {
      display: flex;
      align-items: center;
      text-align: left;

      img {
        margin-right: 60px;
      }
    }
  }
}

.radius {
  border-radius: 20px;
  box-shadow: 0 0 10px 0 rgba(0, 16, 40, 0.2);
}
</style>
