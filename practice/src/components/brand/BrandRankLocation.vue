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
              `/brand/rank/location?type=전체&area=${route.query.area}`
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
              `/brand/rank/location?type=${item.categoryName}&area=${route.query.area}`
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
          <div class="menu-item empty">
            <select
              v-model="currentArea"
              name=""
              id="areaSelect"
              @change="changeArea"
            >
              <option value="강원">강원</option>
              <option value="경기">경기</option>
              <option value="경남">경남</option>
              <option value="경북">경북</option>
              <option value="광주">광주</option>
              <option value="대구">대구</option>
              <option value="대전">대전</option>
              <option value="부산">부산</option>
              <option value="서울">서울</option>
              <option value="세종">세종</option>
              <option value="울산">울산</option>
              <option value="인천">인천</option>
              <option value="전남">전남</option>
              <option value="전북">전북</option>
              <option value="제주">제주</option>
              <option value="충남">충남</option>
              <option value="충북">충북</option>
            </select>
          </div>
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
        <div class="sales-ave">전체 개수</div>
        <div class="area-sales-ave">해당지역 개수</div>
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
          {{ item.brandFranchiseStatus[1].allCount }}
        </div>
        <div class="area-sales-ave">
          {{ item.brandFranchiseStatus[0].allCount }}
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
import { useRoute, useRouter } from 'vue-router'
import api from '../../config/axios.config'
import { Skeletor } from 'vue-skeletor'

const route = useRoute()
const router = useRouter()
const category = ref<LargeCategory[]>([])
const isLoading = ref<boolean>(true)
const brand = ref<BrandDetail[]>([])
const currentArea = ref<string>('')

const getCategory = async () => {
  const result = await api.get('/category')

  category.value = result.data.largeCategory
}

const getRankBrand = async () => {
  isLoading.value = true

  const { type, area } = route.query
  const result = await api.get(
    `/brand/search/rank/area?type=${type}&area=${area}`
  )

  brand.value = result.data.brand
  currentArea.value = area as string

  isLoading.value = false
}

const changeArea = () => {
  router.push(
    `/brand/rank/location?type=${route.query.type}&area=${currentArea.value}`
  )
}

watch(
  () => route.fullPath,
  (prev, current) => {
    const prevPath = prev.includes('/brand/rank/location')
    const currentPath = current.includes('/brand/rank/location')

    if (prevPath && currentPath) {
      getRankBrand()
    }
  }
)

getCategory()
getRankBrand()
</script>

<style lang="scss" scoped>
@import '@/scss/main';
@import '@/scss/rank.scss';
@import '@/scss/skeletor.scss';

.menu-item.empty {
  position: relative;

  #areaSelect {
    position: absolute;
    padding: 0 10px;
    top: 0px;
    right: 0px;
    width: 135px;
    height: 40px;
    border-radius: 10px;
    border: solid 1px #367eff;
    background-color: #fff;
  }
}

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
