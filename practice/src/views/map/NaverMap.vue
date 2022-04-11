<template>
  <main>
    <div class="maps-zone">
      <div class="left-zone">
        <!-- -->
        <div class="absolute-info-box" :class="{ showInfo: isInfoBox }">
          <!-- 검색 및 정보창 -->
          <div class="search-box">
            <div class="search-bar">
              <input
                v-model="searchKeyword"
                type="text"
                placeholder="브랜드 or 지역을 입력하세요"
                @keypress.enter="searchMapBrand(searchKeyword)"
              />
              <img
                src="@/assets/maps/search.png"
                alt="search"
                class="search-image"
              />
              <img
                src="@/assets/maps/close_black.png"
                alt="close"
                class="remove-image"
                @click="searchKeyword = ''"
              />

              <div
                class="search-auto-complete"
                v-if="
                  isShowAuto &&
                  (autoAddr.length > 0 || autoBrandName.length > 0)
                "
              >
                <div>브랜드</div>
                <div
                  class="auto-keyword"
                  v-for="brand in autoBrandName"
                  :key="brand.id"
                  @click="searchMapBrand(brand.brandName)"
                >
                  {{ brand.brandName }}
                </div>
                <div>
                  -----------------------------------------------------------------
                </div>
                <div>주소</div>
                <div
                  class="auto-keyword"
                  v-for="addr in autoAddr"
                  :key="addr.roadAddress"
                  @click="changeMapCenter(addr.x, addr.y)"
                >
                  {{ addr.roadAddress }}
                </div>
              </div>
            </div>
          </div>
          <!-- 브랜드 리스트 -->
          <div class="info-box" v-if="!infoDetail">
            <div class="info-top">
              <div class="category-name">
                {{ currentCategory?.categoryName }}
              </div>
              <div class="select-info-type">
                <select v-model="selectType" @change="changeBrand">
                  <option :value="false">현 위치 입점 브랜드</option>
                  <option :value="true">현 위치 미 입점 브랜드</option>
                </select>
              </div>
            </div>
            <!-- 현위치 입점 브랜드 -->
            <div class="info-list" v-if="!selectType">
              <div
                class="info-item"
                v-for="item in brand"
                :key="item.id"
                @click="brandDetail(item)"
              >
                <div class="logo-image">
                  <img
                    v-if="item.brandLogoImg"
                    :src="item.brandLogoImg"
                    alt="logo"
                  />
                  <img v-else src="@/assets/no-logo.png" alt="logo" />
                </div>
                <div class="brand-info-box">
                  <div class="brand-name">{{ item.brandName }}</div>
                  <div class="category-shops">
                    <div class="category-name">
                      {{ item.smallCategoryName }}
                    </div>
                    <div class="shops-count">
                      전체매장 {{ item.brandAreaSalesAve[0].franchiseCount }} 개
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 현위치 입점 브랜드 -->
            <!-- 현위치 입점 가능 브랜드 -->
            <div class="info-list" v-else>
              <div
                class="info-item"
                v-for="item in noBrand"
                :key="item.id"
                @click="brandDetail(item)"
              >
                <div class="logo-image">
                  <img
                    v-if="item.brandLogoImg"
                    :src="item.brandLogoImg"
                    alt="logo"
                  />
                  <img v-else src="" alt="logo" />
                </div>
                <div class="brand-info-box">
                  <div class="brand-name">{{ item.brandName }}</div>
                  <div class="category-shops">
                    <div class="category-name">
                      {{ item.smallCategoryName }}
                    </div>
                    <div class="shops-count">
                      전체매장 {{ item.brandAreaSalesAve[0].franchiseCount }} 개
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 현위치 입점 가능 브랜드 -->
          </div>
          <!-- 브랜드 리스트 -->
          <!-- 브랜드 디테일 -->
          <div v-else class="info-detail">
            <div class="detail-top">
              <div class="back" @click="infoDetail = false">
                <i class="bi bi-box-arrow-in-left"></i
                >{{ currentCategory?.categoryName }}
              </div>
              <div class="detail-logo">
                <img
                  v-if="currentBrand?.brandLogoImg"
                  :src="currentBrand.brandLogoImg"
                  alt="logo"
                />
                <img v-else src="" alt="logo" />
              </div>
              <div class="detail-brand-name">
                {{ currentBrand?.brandName }}
              </div>
              <div class="detail-category-shops">
                <div class="detail-category">
                  {{ currentBrand?.smallCategoryName }}
                </div>
                <div class="detail-shops">
                  전체 매장
                  {{ currentBrand?.brandAreaSalesAve[0].franchiseCount }} 개
                </div>
              </div>
            </div>
            <div class="detail-body">
              <div class="detail-body-title">가맹사업 정보</div>
              <div class="detail-brand-info">
                <div class="name">회사명 :</div>
                <div class="value">{{ currentBrand?.companyName }}</div>
              </div>
              <div class="detail-brand-info">
                <div class="name">월 평균 매출액 :</div>
                <div class="value">{{ calcSalesAve }}</div>
              </div>
              <div class="detail-brand-info">
                <div class="name">평균 창업비용 :</div>
                <div class="value">{{ startCost }}</div>
              </div>
            </div>
            <div class="detail-bottom">
              <div class="button-zone">
                <div class="top">
                  <div class="button" @click="compare">
                    <img
                      v-if="!isCompare"
                      src="@/assets/brand/compare.png"
                      alt="비교"
                    />
                    <img
                      v-else
                      src="@/assets/brand/compare_active.png"
                      alt="비교"
                    />
                    <span :class="{ isCompare }">비교</span>
                  </div>
                  <div class="button" @click="favorite">
                    <img
                      v-if="!isFavorite"
                      src="@/assets/brand/star.png"
                      alt="즐겨찾기"
                    />
                    <img
                      v-else
                      src="@/assets/brand/star_active.png"
                      alt="즐겨찾기"
                    />
                    <span :class="{ isFavorite }">즐겨찾기</span>
                  </div>
                </div>
                <div class="bottom">
                  <button class="question">문의하기</button>
                  <button class="move-company-info" @click="moveBrandDetail">
                    기업정보확인
                  </button>
                </div>
                <div class="compare">
                  <img
                    src="@/assets/brand/kakao.png"
                    alt="kakao"
                    @click="share('kakao')"
                  />
                  <img
                    src="@/assets/brand/facebook.png"
                    alt="facebook"
                    @click="share('facebook')"
                  />
                  <img
                    src="@/assets/brand/twitter.png"
                    alt="twitter"
                    @click="share('twitter')"
                  />
                  <img
                    src="@/assets/brand/linkcopy.png"
                    alt="linkcopy"
                    @click="share('copy')"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- 브랜드 디테일 -->
          <!-- 검색 및 정보창 -->
          <div class="info-slide-button" @click="isInfoBox = !isInfoBox">
            <img
              v-if="!isInfoBox"
              src="@/assets/maps/info_open.png"
              alt="open"
            />
            <img v-else src="@/assets/maps/info_close.png" alt="close" />
          </div>
          <!-- 검색 및 정보창 -->
        </div>
        <!-- -->
        <div class="fixed-left">
          <div class="logo">
            <RouterLink to="/">
              <img src="" alt="logo" />
            </RouterLink>
          </div>
          <div class="category-menu">
            <div
              class="category-item"
              v-for="category in largeCategory"
              :key="category.id"
              @click="getSearchMarker(category)"
              :class="{ active: category === currentCategory }"
            >
              <div class="category-image">
                <img
                  v-if="category === currentCategory"
                  :src="category.selectImg"
                  :alt="category.categoryName"
                />
                <img
                  v-else
                  :src="category.mainImg"
                  :alt="category.categoryName"
                />
              </div>
              <div class="category-name">{{ category.categoryName }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="right-map">
        <NaverMaps
          @onLoad="onLoadMap($event)"
          width="100%"
          height="100vh"
          :mapOptions="mapOptions"
        >
          <NaverMarker
            v-for="(m, i) in marker"
            :key="m.mapData.id"
            :latitude="parseFloat(m.mapData.y)"
            :longitude="parseFloat(m.mapData.x)"
            @onLoad="onLoadMarker($event, m.mapData.place_name, m.brand, i)"
          >
          </NaverMarker>
        </NaverMaps>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
/* global naver */
import { computed, reactive, ref, watch } from 'vue'
import { NaverMaps, NaverMarker } from 'vue3-naver-maps'
import Swal from 'sweetalert2'
import api from '../../config/axios.config'
import { LargeCategory } from '../../types/category'
import type { naverV3 } from 'vue3-naver-maps'
import { BrandDetail } from '../../types/brand'
import { useStore } from 'vuex'
import { Favorite } from '../../types/favorite'
import { useRouter } from 'vue-router'

interface Marker {
  mapData: {
    id: string
    place_name: string
    x: string
    y: string
  }
  brand: BrandDetail
}

const Toast = Swal.mixin({
  toast: true,
  timer: 2000,
  timerProgressBar: true,
  showConfirmButton: false,
  position: 'top',
})

const mapOptions: naverV3.mapOptions = {
  mapDataControl: false,
  zoom: 15,
  zoomControl: true,
  zoomControlOptions: {
    style: naver.maps.ZoomControlStyle.SMALL,
    position: naver.maps.Position.TOP_RIGHT,
  },
}

const map = ref<naver.maps.Map>()
const initMapCenter = reactive({
  lat: 0,
  lot: 0,
})

const marker = ref<Marker[]>([])
const markerEl = ref<naver.maps.Marker[]>([])

const getCurrentPosition = () => {
  navigator.geolocation.getCurrentPosition(
    (res) => {
      initMapCenter.lat = res.coords.latitude
      initMapCenter.lot = res.coords.longitude
    },
    () => {
      Toast.fire({
        icon: 'warning',
        text: '위치 정보를 가져 올 수 없습니다',
      })
    }
  )
}

const onLoadMap = (mapObject: naver.maps.Map) => {
  map.value = mapObject

  var locationBtnHtml = `<div class="current-button" style="background-image: url('https://nicepick.s3.ap-northeast-2.amazonaws.com/current_location.jpg'); width: 28px; height: 28px; background-size: contain; cursor: pointer; margin-top: 80px; margin-right: 11px;"></div>`

  navigator.geolocation.getCurrentPosition(
    (res) => {
      initMapCenter.lat = res.coords.latitude
      initMapCenter.lot = res.coords.longitude

      if (map.value) {
        map.value.setCenter(
          new naver.maps.LatLng(initMapCenter.lat, initMapCenter.lot)
        )
      }
    },
    () => {
      Toast.fire({
        icon: 'warning',
        text: '위치 정보를 가져 올 수 없습니다',
      })
    }
  )

  naver.maps.Event.once(map.value, 'init', function () {
    const customControl = new naver.maps.CustomControl(locationBtnHtml, {
      position: naver.maps.Position.RIGHT_TOP,
    })

    customControl.setMap(map.value)

    naver.maps.Event.addDOMListener(
      customControl.getElement(),
      'click',
      function () {
        getCurrentPosition()
        if (map.value) {
          if (initMapCenter.lat !== 0 || initMapCenter.lot !== 0) {
            map.value.setCenter(
              new naver.maps.LatLng(initMapCenter.lat, initMapCenter.lot)
            )
            centerChange()
          }
        }
      }
    )
  })

  naver.maps.Event.addListener(map.value, 'zoom_changed', function () {
    if (map.value?.getZoom() && map.value?.getZoom() < 15) {
      Toast.fire({
        text: '자세한 데이터를 보기 위해 지도를 확대해 주세요',
        position: 'bottom',
        background: 'rgb(0, 0, 0, 0.8)',
        color: '#fff',
      })

      return
    }
  })

  naver.maps.Event.addListener(map.value, 'mouseup', function () {
    getSearchMarker(currentCategory.value)
  })
}

// eslint-disable-next-line
const centerChange = (): any => {
  getSearchMarker(currentCategory.value)
}

const onLoadMarker = (
  markerObject: naver.maps.Marker,
  placeName: string,
  mapBrand: BrandDetail,
  i: number
) => {
  markerEl.value.push(markerObject)
  // content: string | HTMLElement;
  // size?: Size | SizeLiteral | undefined;
  // anchor?: Point | PointLiteral | Position | undefined;
  const content = `<div class="marker" style="position: relative;">
                    <div style="max-width: 200px;
                                background: #fff;
                                height: 30px;
                                font-size: 14px;
                                padding: 5px;
                                display: flex;
                                border: 1px solid #1569ff;
                                border-radius: 15px;
                                line-height: 30px;
                                position: relative;
                                min-width: 100px;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                overflow: hidden;">
                      <img src="${
                        mapBrand.brandLogoImg
                          ? mapBrand.brandLogoImg
                          : 'https://nicepick.s3.ap-northeast-2.amazonaws.com/cursor.png'
                      }" alt="cursor">
                      <div style="text-overflow: ellipsis;
                                  white-space: nowrap;
                                  overflow: hidden;
                                  max-width: 150px;
                                  margin-left: 10px;
                                  font-weight: bold;">${placeName}</div>
                    </div>
                    <div style="position: absolute;
                                bottom: -6px;
                                left: 24px;
                                width: 0px;
                                height: 0;
                                border-color: #1569ff transparent transparent;
                                border-style: solid;
                                border-width: 6px 4px 0;
                                pointer-events: none;
                                background: #fff;"/>
                  </div>`

  const htmlIcon: naver.maps.HtmlIcon = {
    content,
    anchor: new naver.maps.Point(30, 70),
    size: new naver.maps.Size(0, 0),
  }

  markerEl.value[i].setIcon(htmlIcon)

  naver.maps.Event.addListener(markerEl.value[i], 'click', function () {
    if (map.value) {
      map.value.setCenter(markerEl.value[i].getPosition())

      isInfoBox.value = true

      const brandIndex = brand.value.findIndex((e) => e.id === mapBrand.id)

      if (brandIndex > -1) {
        brandDetail(brand.value[brandIndex])
      } else {
        Toast.fire({
          text: '해당 브랜드가 존재하지 않습니다',
          position: 'bottom',
          background: 'rgb(0, 0, 0, 0.8)',
          color: '#fff',
        })
      }
    }
  })
}

// 카테고리 가져오기 및 왼쪽 정보창 제어
interface AutoAddr {
  roadAddress: string
  x: string
  y: string
}

const store = useStore()
const router = useRouter()

const largeCategory = ref<LargeCategory[]>([])
const currentCategory = ref<LargeCategory>()
const isInfoBox = ref<boolean>(false)
const brand = ref<BrandDetail[]>([])
const noBrand = ref<BrandDetail[]>([])
const selectType = ref<boolean>(false)
const currentBrand = ref<BrandDetail>()

const infoDetail = ref<boolean>(false)

const isCompare = ref<boolean>(false)
const isFavorite = ref<boolean>(false)
const favoriteId = ref<string>('')

const searchKeyword = ref<string>('')
const isShowAuto = ref<boolean>(false)

const autoAddr = ref<AutoAddr[]>([])
const autoBrandName = ref<BrandDetail[]>([])
const currentBrandName = ref<string>('')

const getCategory = async () => {
  const result = await api.get('/category')

  largeCategory.value = result.data.largeCategory
}

const getSearchMarker = async (category: LargeCategory | undefined) => {
  if (map.value?.getZoom() && map.value?.getZoom() < 15) {
    Toast.fire({
      text: '자세한 데이터를 보기 위해 지도를 확대해 주세요',
      position: 'bottom',
      background: 'rgb(0, 0, 0, 0.8)',
      color: '#fff',
    })

    return
  }

  marker.value = []
  markerEl.value = []
  brand.value = []
  noBrand.value = []
  currentCategory.value = category

  if (!category) {
    return
  }

  isInfoBox.value = true
  infoDetail.value = false

  const smallCategoryName = category.smallCategory.map((e) => e.categoryName)
  const queryArr: string[] = []

  const centerX = map.value?.getCenter().x
  const centerY = map.value?.getCenter().y

  if (category.categoryName === '교육/놀이') {
    smallCategoryName.push('학원')
  }

  for (const categoryName of smallCategoryName) {
    const index = categoryName.indexOf('(')
    const name = index > -1 ? categoryName.slice(0, index - 1) : categoryName

    for (const q of name.split('/')) {
      queryArr.push(q)
    }
  }

  const mapSearchAndBrand = await api.get(
    `/brand/search/maps?query=${queryArr}&type=${category.categoryName}&longitude=${centerX}&latitude=${centerY}`
  )

  marker.value = mapSearchAndBrand.data.mapData
  brand.value = mapSearchAndBrand.data.brand
  currentBrandName.value = ''

  const id = brand.value.map((e) => e.id)

  const noBrandResult = await api.get(
    `/brand/search/maps/noBrand?id=${id}&type=${category.categoryName}`
  )

  noBrand.value = noBrandResult.data.brand
}

const searchMapBrand = async (brandName: string) => {
  const lon = map.value?.getCenter().x
  const lat = map.value?.getCenter().y

  const result = await api.get(
    `/brand/search/maps/brandName?query=${brandName}&longitude=${lon}&latitude=${lat}`
  )

  isShowAuto.value = false
  infoDetail.value = false
  markerEl.value = []
  marker.value = result.data.mapData
  brand.value = result.data.brand
  currentCategory.value = undefined
  currentBrandName.value = brandName
  noBrand.value = []
}

const changeMapCenter = (x: string, y: string) => {
  const lon = parseFloat(x)
  const lat = parseFloat(y)

  map.value?.setCenter(new naver.maps.LatLng(lat, lon))

  if (currentCategory.value) {
    getSearchMarker(currentCategory.value)
  } else if (currentBrandName.value !== '') {
    searchMapBrand(currentBrandName.value)
  }
}

const changeBrand = async () => {
  if (brand.value.length === 0) {
    Toast.fire({
      icon: 'info',
      text: '카테고리 선택 또는 검색을 먼저 해주세요',
      position: 'bottom',
      background: 'rgb(0, 0, 0, 0.8)',
      color: '#fff',
    })
  }
}

const brandDetail = async (brand: BrandDetail) => {
  currentBrand.value = brand

  infoDetail.value = true
  checkFavorite()
  checkCompare()
}

const calcSalesAve = computed(() => {
  let monthSalesAve = '0 만원'

  if (
    currentBrand.value?.brandAreaSalesAve &&
    currentBrand.value?.brandAreaSalesAve.length > 0
  ) {
    const totalSalesAve = currentBrand.value.brandAreaSalesAve[0].salesAve

    const monthAve =
      totalSalesAve !== ''
        ? Math.floor(parseInt(totalSalesAve.replaceAll(',', '')) / 12 / 10)
        : 0
    const unit: number = Math.floor(monthAve / 10000)

    monthSalesAve =
      unit > 0
        ? `${unit} 억 ${Math.floor(monthAve % 10000)} 만원`
        : `${monthAve} 만원`
  }

  if (monthSalesAve === '0 만원') {
    return '정보 없음'
  }

  return monthSalesAve
})

const startCost = computed((): string => {
  let costString = '0 만원'

  if (currentBrand.value?.brandStartCost) {
    const totalFee = parseInt(
      currentBrand.value.brandStartCost.totalFee.replaceAll(',', '')
    )
    const interiorFee = parseInt(
      currentBrand.value.brandStartCost.interiorFee.replaceAll(',', '')
    )

    const total = Math.floor((totalFee + interiorFee) / 10)

    const unit: number = Math.floor(total / 10000)

    costString =
      unit > 0
        ? `${unit} 억 ${Math.floor(total % 10000)} 만원`
        : `${total} 만원`
  }

  if (costString === '0 만원') {
    return '정보 없음'
  }

  return costString
})

const checkFavorite = async () => {
  const favoriteList: Favorite[] = store.state.favorite.favorite as Favorite[]

  const find = favoriteList.find((e) => e.brandId === currentBrand.value?.id)

  if (find) {
    isFavorite.value = true
    favoriteId.value = find.id
  } else {
    isFavorite.value = false
    favoriteId.value = ''
  }
}

const checkCompare = () => {
  const compareBrandList: BrandDetail[] = store.state.brand
    .compareBrand as BrandDetail[]

  const find = compareBrandList.find((e) => e.id === currentBrand.value?.id)

  if (find) {
    isCompare.value = true
  } else {
    isCompare.value = false
  }
}

watch(
  () => store.state.favorite.favorite.length,
  (prev: number, current: number) => {
    if (prev !== current) {
      checkFavorite()
    }
  }
)

watch(
  () => store.state.brand.compareBrand.length,
  (prev: number, current: number) => {
    if (prev !== current) {
      checkCompare()
    }
  }
)

const compare = () => {
  if (isCompare.value) {
    const compareBrandList: BrandDetail[] = store.state.brand
      .compareBrand as BrandDetail[]

    const find = compareBrandList.find((e) => e.id === currentBrand.value?.id)

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
  } else {
    const compareBrandList: BrandDetail[] = store.state.brand
      .compareBrand as BrandDetail[]

    if (compareBrandList.length === 6) {
      Toast.fire({
        icon: 'info',
        title: '비교하기는 6개까지 가능합니다',
      })
      return
    }

    if (currentBrand.value) {
      compareBrandList.push(currentBrand.value)
    }

    store.commit('brand/updateState', {
      compareBrand: compareBrandList,
    })

    Toast.fire({
      icon: 'success',
      title: '비교하기 목록에 추가 되었습니다',
    })
  }
}

const favorite = async () => {
  if (!store.state.auth.user.id) {
    Toast.fire({
      icon: 'info',
      title: '로그인이 필요합니다',
    })
    return
  }

  if (isFavorite.value) {
    const result = await api.delete(`/favorite/${favoriteId.value}`)

    if (result.data.success) {
      const getFavorite = await api.get(`/favorite/${store.state.auth.user.id}`)

      store.commit('favorite/updateState', {
        favorite: getFavorite.data.favorite,
      })

      Toast.fire({
        icon: 'error',
        title: '즐겨찾기 해제 되었습니다',
      })
    } else {
      Toast.fire({
        icon: 'error',
        title: result.data.errorMessage,
      })
    }
  } else {
    const result = await api.post(`/favorite`, {
      brandId: currentBrand.value?.id,
      userId: store.state.auth.user.id,
    })

    if (result.data.success) {
      const getFavorite = await api.get(`/favorite/${store.state.auth.user.id}`)

      store.commit('favorite/updateState', {
        favorite: getFavorite.data.favorite,
      })

      Toast.fire({
        icon: 'success',
        title: '즐겨찾기 등록 되었습니다',
      })
    } else {
      Toast.fire({
        icon: 'error',
        title: result.data.errorMessage,
      })
    }
  }
}

const share = (type: string) => {
  const { Kakao } = window
  if (type === 'kakao') {
    Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: currentBrand.value?.brandName,
        description: `대한민국 No.1 창업 플랫폼 '창업PICK'`,
        imageUrl: currentBrand.value?.brandLogoImg
          ? currentBrand.value.brandLogoImg
          : 'https://nicepick.s3.ap-northeast-2.amazonaws.com/logo.png',
        link: {
          mobileWebUrl: `https://m.nicepick.co.kr/brand/detail/${currentBrand.value?.id}`,
          webUrl: `https://nicepick.co.kr/brand/detail/${currentBrand.value?.id}`,
        },
      },
      buttons: [
        {
          title: '자세히 보기',
          link: {
            mobileWebUrl: `https://m.nicepick.co.kr/brand/detail/${currentBrand.value?.id}`,
            webUrl: `https://nicepick.co.kr/brand/detail/${currentBrand.value?.id}`,
          },
        },
      ],
    })
  } else if (type === 'facebook') {
    window.open(
      `http://www.facebook.com/sharer.php?u=https://nicepick.co.kr/brand/detail/${currentBrand.value?.id}`
    )
  } else if (type === 'twitter') {
    window.open(
      `https://twitter.com/intent/tweet?text=${currentBrand.value?.brandName}&url=https://nicepick.co.kr/brand/detail/${currentBrand.value?.id}`
    )
  } else {
    const textarea = document.createElement('textarea')
    document.body.appendChild(textarea)
    const url = `https://nicepick.co.kr/brand/detail/${currentBrand.value?.id}`
    textarea.value = url
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)

    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    })

    Toast.fire({
      icon: 'success',
      title: '링크가 복사 되었습니다',
    })
  }
}

const moveBrandDetail = () => {
  router.push(`/brand/detail/${currentBrand.value?.id}`)
}

const callSearchApi = async () => {
  const resultAddr = await api.get(
    `/brand/search/maps/geocode?query=${searchKeyword.value}`
  )

  if (searchKeyword.value.length > 1) {
    isShowAuto.value = true
    const resultBrandName = await api.get(
      `/brand/search/maps/brand?query=${searchKeyword.value}`
    )

    if (resultBrandName.data.success) {
      if (resultBrandName.data.brand.length > 0) {
        autoBrandName.value = resultBrandName.data.brand
      } else {
        autoBrandName.value = []
      }
    }
  } else {
    autoBrandName.value = []
  }

  if (resultAddr.data.status === 'OK') {
    autoAddr.value = resultAddr.data.addresses
  } else {
    autoAddr.value = []
  }
}

watch(
  () => searchKeyword.value,
  () => callSearchApi()
)

getCategory()
</script>

<style lang="scss" scoped>
@import '@/scss/main';

main {
  .maps-zone {
    width: 100%;
    display: flex;

    .left-zone {
      width: 100px;
      position: relative;

      .fixed-left {
        position: relative;
        z-index: 2;
        height: 100%;
        border-right: 1px solid #dcdcdc;
        background: #fff;

        .logo {
          padding: 20px 10px 0 10px;
          margin-bottom: 20px;

          img {
            width: 80px;
            height: 32px;
            cursor: pointer;
          }
        }

        .category-menu {
          .category-item {
            padding: 10px 0;
            cursor: pointer;
            color: #222;
            background: #fff;
            font-weight: bold;

            &.active {
              background: $primary;
              color: #fff;
            }

            .category-image {
              display: flex;
              justify-content: center;
              align-items: center;
              margin-bottom: 5px;
            }

            .category-name {
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 12px;
            }
          }
        }
      }

      .absolute-info-box {
        position: absolute;
        width: 400px;
        top: 0px;
        background: #fff;
        left: -300px;
        height: 100%;
        transition: all 1.2s;
        z-index: 1;
        border-right: solid 1px #dcdcdc;
        background-color: #fff;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;

        &.showInfo {
          left: 100px;
        }

        .search-box {
          height: 72px;
          border-bottom: solid 1px #dcdcdc;
          display: flex;
          justify-content: center;
          align-items: center;

          .search-bar {
            position: relative;

            input[type='text'] {
              width: 360px;
              height: 33px;
              border-radius: 10px;
              border: solid 1px #dcdcdc;
              background-color: #fff;
              font-size: 12px;
              color: #353535;
              padding: 0 30px 0 53px;

              &::placeholder {
                color: #dcdcdc;
              }
            }

            img {
              position: absolute;
              top: 8px;

              &.search-image {
                left: 10px;
              }

              &.remove-image {
                right: 9.5px;
                cursor: pointer;
              }
            }

            .search-auto-complete {
              padding: 10px;
              position: absolute;
              top: 100%;
              width: 100%;
              left: 0;
              border-radius: 10px;
              border: solid 1px #dcdcdc;
              background-color: #fff;
              font-size: 14px;
              color: #353535;
              font-weight: 500;

              div {
                padding: 5px;
              }

              .auto-keyword {
                font-size: 12px;
                color: #777;
                font-weight: normal;
                cursor: pointer;
              }
            }
          }
        }

        .info-box {
          .info-top {
            display: flex;
            padding: 19px 20px;
            justify-content: space-between;
            align-items: center;
            font-size: 18px;
            color: #353535;
            font-weight: 500;
            margin-bottom: 20px;

            .select-info-type {
              select {
                border-radius: 5px;
                border: solid 1px #dcdcdc;
                background-color: #fff;
                font-size: 14px;
                height: 26px;
              }
            }
          }

          .info-list {
            padding: 0 10px;
            height: 80vh;
            overflow-y: scroll;
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */

            &::-webkit-scrollbar {
              display: none;
            }
            .info-item {
              padding: 20px 10px;
              border-bottom: 1px dashed #dcdcdc;
              display: flex;
              cursor: pointer;
              .logo-image {
                width: 150px;
                min-width: 150px;
                height: 60px;
                margin-right: 15px;

                img {
                  width: 100%;
                  height: 100%;
                }
              }

              .brand-info-box {
                font-size: 14px;
                font-weight: 500;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;

                .category-shops {
                  font-weight: normal;
                }
              }
            }
          }
        }

        .info-detail {
          color: #353535;
          .detail-top {
            padding-bottom: 40px;
            border-bottom: 1px solid #dcdcdc;
            .back {
              cursor: pointer;
              font-size: 18px;
              padding: 19px 0 0 20px;
              display: flex;
              font-weight: 500;

              i {
                font-size: 20px;
                margin-right: 10px;
              }
            }

            .detail-logo {
              display: flex;
              justify-content: center;
              padding-top: 40px;

              img {
                width: 250px;
                height: 100px;
              }
            }

            .detail-brand-name {
              padding-top: 40px;
              display: flex;
              justify-content: center;
              font-size: 20px;
              font-weight: 500;
            }

            .detail-category-shops {
              padding-top: 10px;
              display: flex;
              justify-content: center;
              font-size: 14px;

              .detail-category {
                &::after {
                  content: '·';
                  margin: 0 5px;
                }
              }
            }
          }

          .detail-body {
            padding: 40px 40px 0 40px;

            .detail-body-title {
              font-size: 18px;
              font-weight: 500;
              padding-bottom: 20px;
            }

            .detail-brand-info {
              display: flex;
              justify-content: space-between;
              font-size: 16px;
              padding-top: 20px;

              .value {
                font-weight: 500;
              }
            }
          }

          .detail-bottom {
            display: flex;
            justify-content: center;
            padding-top: 114px;
            .button-zone {
              width: 320px;
              .top {
                display: flex;
                justify-content: space-between;
                margin-bottom: 20px;

                .button {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  padding: 10px 30px;
                  width: 150px;
                  height: 40px;
                  font-size: 14px;
                  letter-spacing: -0.7px;
                  color: #353535;
                  border-radius: 5px;
                  border: solid 1px #dcdcdc;
                  background-color: #fff;
                  cursor: pointer;

                  .isCompare {
                    color: $primary;
                  }

                  .isFavorite {
                    color: #ffdc51;
                  }
                }
              }

              .bottom {
                margin-bottom: 30px;
                .question {
                  width: 320px;
                  height: 60px;
                  border: none;
                  border-radius: 10px;
                  background-color: $primary;
                  font-size: 20px;
                  letter-spacing: -1px;
                  color: $black;
                  margin-bottom: 10px;
                  color: #fff;
                }

                .move-company-info {
                  width: 320px;
                  height: 30px;
                  border: none;
                  border-radius: 10px;
                  background-color: #ffdc51;
                  font-size: 14px;
                  letter-spacing: -0.5px;
                  color: $black;
                }
              }

              .compare {
                display: flex;
                justify-content: space-between;
                align-items: center;

                img {
                  cursor: pointer;
                }
              }
            }
          }
        }

        .info-slide-button {
          position: absolute;
          top: 50%;
          left: 100%;
          cursor: pointer;
        }
      }
    }

    .right-map {
      flex-grow: 1;
    }
  }
}
</style>
