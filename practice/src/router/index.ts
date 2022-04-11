import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Main',
    component: () => import('../views/main/Main.vue'),
  },
  {
    path: '/brand/detail/:id',
    name: 'BrandDetail',
    component: () => import('../views/brand/BrandDetail.vue'),
  },
  {
    path: '/brand/category',
    name: 'BrandCategory',
    component: () => import('../views/brand/BrandCategory.vue'),
  },
  {
    path: '/brand/promotion',
    name: 'BrandPromotion',
    component: () => import('../views/brand/BrandPromotion.vue'),
  },
  {
    path: '/brand/search',
    name: 'BrandSearch',
    component: () => import('../views/brand/BrandSearch.vue'),
  },
  {
    path: '/brand/theme/:type',
    name: 'BrandTheme',
    component: () => import('../views/brand/BrandTheme.vue'),
  },
  {
    path: '/brand/rank/sales',
    name: 'BrandRankSales',
    component: () => import('../views/brand/BrandRankSales.vue'),
  },
  {
    path: '/brand/rank/location',
    name: 'BrandRankLocation',
    component: () => import('../views/brand/BrandRankLocation.vue'),
  },
  {
    path: '/brand/rank/start',
    name: 'BrandRankStart',
    component: () => import('../views/brand/BrandRankStart.vue'),
  },
  // {
  //   path: '/brand/rank/shops',
  //   name: 'BrandRankShops',
  //   component: () => import('../views/brand/BrandRankShops.vue'),
  // },
  {
    path: '/company/login',
    name: 'CompanyLogin',
    component: () => import('../views/company/CompanyLogin.vue'),
  },
  {
    path: '/company/brand/info',
    name: 'CompanyBrandInfo',
    component: () => import('../views/company/CompanyBrandInfo.vue'),
  },
  {
    path: '/company/brand/qna',
    name: 'CompanyBrandQna',
    component: () => import('../views/company/CompanyBrandQna.vue'),
  },
  {
    path: '/company/brand/product',
    name: 'CompanyBrandProduct',
    component: () => import('../views/company/CompanyBrandProduct.vue'),
  },
  {
    path: '/company/product/shop',
    name: 'CompanyProductShop',
    component: () => import('../views/company/CompanyProductShop.vue'),
  },
  {
    path: '/company/product/payment',
    name: 'CompanyProductPayment',
    component: () => import('../views/company/CompanyProductPayment.vue'),
  },
  {
    path: '/calculator',
    name: 'Calculator',
    component: () => import('../views/calculator/Calculator.vue'),
  },
  {
    path: '/qna',
    name: 'QnaChat',
    component: () => import('../views/qna/QnaChat.vue'),
  },
  {
    path: '/naver/login',
    name: 'NaverLogin',
    component: () => import('../views/oauth/NaverLogin.vue'),
  },
  {
    path: '/kakao/login',
    name: 'KakaoLogin',
    component: () => import('../views/oauth/KakaoLogin.vue'),
  },
  {
    path: '/mypage/account',
    name: 'MyPage',
    component: () => import('../views/account/MyPage.vue'),
  },
  {
    path: '/maps',
    name: 'NaverMap',
    component: () => import('../views/map/NaverMap.vue'),
  },
  {
    path: '/:404(.*)',
    name: 'PageNotFound',
    component: () =>
      import(
        /* webpackChunkName: "pageNotFound" */ '../views/error/PageNotFound.vue'
      ),
  },
]

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { left: 0, top: 0 }
  },
  routes,
})

export default router
