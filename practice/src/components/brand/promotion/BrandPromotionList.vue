<template>
  <div class="promotion-list" v-if="!props.isLoading">
    <div class="list-zone">
      <div class="list-title">
        <div class="brand-name">______ 명</div>
        <div class="brand-category">업종</div>
        <div class="brand-promotion">________ 내용</div>
      </div>

      <div
        class="list-item"
        v-for="item in props.brand"
        :key="item.id"
        @click="moveDetail(item.id)"
      >
        <div class="brand-name">
          {{ item.brandName }}
        </div>
        <div class="brand-category">{{ item.smallCategoryName }}</div>
        <div class="brand-promotion">{{ item.brandPromotion }}</div>
      </div>
      <div class="no-content" v-if="props.brand.length === 0">
        진행중인 ________이 없습니다
      </div>
    </div>
  </div>
  <div v-else class="skeleton-zone">
    <Skeletor :shimmer="true" width="1140" height="800" class="radius" />
  </div>
</template>

<script lang="ts" setup>
import { BrandSearch } from '../../../types/brand'
import { useRouter } from 'vue-router'
import { Skeletor } from 'vue-skeletor'

const router = useRouter()

const props = defineProps<{
  brand: BrandSearch[]
  isLoading: boolean
}>()

const moveDetail = (brandId: string) => {
  router.push('/brand/detail/' + brandId)
}
</script>

<style lang="scss" scoped>
@import '@/scss/main';
@import '@/scss/skeletor.scss';

.promoton-list {
  @include make-container();

  .list-zone {
    width: 1140px;
    margin: auto;
    border-radius: 20px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.16);
    border: solid 1px #dcdcdc;
    background-color: #fff;
    padding: 35px 50px 65px 30px;
    margin-bottom: 45px;

    .list-title {
      padding-bottom: 35px;
      display: flex;
      font-size: 20px;
      color: $black;
      border-bottom: solid 1px #707070;
    }

    .list-item {
      padding: 30px 0;
      display: flex;
      font-size: 18px;
      color: $black;
      border-bottom: solid 1px #707070;
      cursor: pointer;
    }
  }
}

.brand-name {
  padding-left: 35px;
  width: 360px;
}

.brand-category {
  width: 120px;
  margin-right: 20px;
  text-align: center;
}

.brand-promotion {
  width: 558px;
}

.skeleton-zone {
  width: 1140px;
  height: 800px;
  margin: 0 auto 60px auto;

  .radius {
    border-radius: 20px;
    box-shadow: 0 0 10px 0 rgba(0, 16, 40, 0.2);
  }
}

.no-content {
  padding-top: 65px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}
</style>
