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
              `/brand/rank/start?type=전체&sortType=${route.query.sortType}`
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
              `/brand/rank/start?type=${item.categoryName}&sortType=${route.query.sortType}`
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
      <div close="select-rank-zone">
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
        <div class="brand-name">브랜드 명</div>
        <div
          class="member com"
          :class="{ active: route.query.sortType === 'm' }"
          @click="
            router.push(`/brand/rank/start?type=${route.query.type}&sortType=m`)
          "
        >
          항목1
        </div>
        <div
          class="edu com"
          :class="{ active: route.query.sortType === 'e' }"
          @click="
            router.push(`/brand/rank/start?type=${route.query.type}&sortType=e`)
          "
        >
          항목2
        </div>
        <div
          class="deposit com"
          :class="{ active: route.query.sortType === 'd' }"
          @click="
            router.push(`/brand/rank/start?type=${route.query.type}&sortType=d`)
          "
        >
          항목3
        </div>
        <div
          class="interior com"
          :class="{ active: route.query.sortType === 'i' }"
          @click="
            router.push(`/brand/rank/start?type=${route.query.type}&sortType=i`)
          "
        >
          항목4
        </div>
        <div
          class="etc com"
          :class="{ active: route.query.sortType === 'c' }"
          @click="
            router.push(`/brand/rank/start?type=${route.query.type}&sortType=c`)
          "
        >
          <div>기타</div>
          <div class="small-noti">(시설, 장비..등)</div>
        </div>
        <div
          class="total com"
          :class="{ active: route.query.sortType === 't' }"
          @click="
            router.push(`/brand/rank/start?type=${route.query.type}&sortType=t`)
          "
        >
          합계
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
        <div class="member com">
          {{ convertNumber(item.brandStartCost.membershipFee) }}
        </div>
        <div class="edu com">
          {{ convertNumber(item.brandStartCost.educationFee) }}
        </div>
        <div class="deposit com">
          {{ convertNumber(item.brandStartCost.deposit) }}
        </div>
        <div class="interior com">
          {{ convertNumber(item.brandStartCost.interiorFee) }}
        </div>
        <div class="etc com">
          {{ convertNumber(item.brandStartCost.etcFee) }}
        </div>
        <div class="total com">
          <div>{{ convertNumber(item.brandStartCost.startTotalPrice) }}</div>
          <div class="small-noti">
            {{ item.brandStartCost.standardArea }}㎡ ({{
              calcStandardArea(item.brandStartCost.standardArea)
            }}평) 기준
          </div>
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
import { BrandDetail } from '../../types/brand'
import { LargeCategory } from '../../types/category'
import { ref, watch } from 'vue'
import api from '../../config/axios.config'
import { useRoute, useRouter } from 'vue-router'
import { Skeletor } from 'vue-skeletor'

const route = useRoute()
const router = useRouter()
const isLoading = ref<boolean>(true)
const category = ref<LargeCategory[]>([])
const brand = ref<BrandDetail[]>([])

const getRankBrand = async () => {
  isLoading.value = true

  const { type, sortType } = route.query
  const result = await api.get(
    `/brand/search/rank/start?type=${type}&sortType=${sortType}`
  )

  brand.value = result.data.brand

  isLoading.value = false
}

const convertNumber = (fee: string): string => {
  let convertString = '0 만원'

  const totalSalesAve = fee

  const monthAve =
    totalSalesAve !== ''
      ? Math.floor(parseInt(totalSalesAve.replaceAll(',', '')) / 10)
      : 0
  const unit1: number = Math.floor(monthAve / 10000)
  const unit2: number = Math.floor(monthAve % 10000)

  convertString = unit1 > 0 ? `${unit1} 억 ` : ''
  convertString =
    unit2 > 0 ? convertString + `${unit2} 만원` : convertString + ''
  convertString = unit1 === 0 && unit2 === 0 ? '0 만원' : convertString

  return convertString
}

const calcStandardArea = (area: string | undefined) => {
  const numArea = area ? parseInt(area?.replaceAll(',', '')) : 0
  return Math.floor(numArea * 0.3025)
}

watch(
  () => route.fullPath,
  (prev, current) => {
    const prevPath = prev.includes('/brand/rank/start')
    const currentPath = current.includes('/brand/rank/start')

    if (prevPath && currentPath) {
      getRankBrand()
    }
  }
)

getRankBrand()
</script>

<style lang="scss" scoped>
@import '@/scss/main';
@import '@/scss/rank.scss';
@import '@/scss/skeletor.scss';

.rank-body {
  @include make-container();
  margin-bottom: 100px;

  .rank {
    width: 150px;
  }

  .brand-name {
    width: 450px;
  }

  .com {
    width: 150px;

    .small-noti {
      font-size: 12px;
      color: #777;
      margin-top: 5px;
    }
  }

  .body-header {
    display: flex;
    text-align: center;
    font-size: 18px;
    color: #222;

    .com {
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
