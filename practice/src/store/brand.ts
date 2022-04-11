import { BrandDetail, BrandList } from '../types/brand'
import { CurrentProduct, PayStatus } from '../types/pay'
import { Module } from 'vuex'
import { RootState } from '.'
import api from '../config/axios.config'

export interface BrandModuleState {
  brandList: BrandList[]
  payList: PayStatus[]
  productList: CurrentProduct[]
  watchBrand: BrandList[]
  compareBrand: BrandDetail[]
}

export const brandModule: Module<BrandModuleState, RootState> = {
  // module
  namespaced: true,

  // data
  state: () => ({
    brandList: [],
    payList: [],
    productList: [],
    watchBrand: [],
    compareBrand: [],
  }),

  mutations: {
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    updateState(state: any, payload: any) {
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key]
      })
    },
  },

  actions: {
    async getPayList(
      { commit },
      payload: { brandId: string; startMonthDay?: string; endMonthDay?: string }
    ) {
      try {
        const date = new Date()

        if (
          payload.startMonthDay === undefined &&
          payload.endMonthDay === undefined
        ) {
          payload.startMonthDay = `${date.getFullYear()}-${
            date.getMonth() + 1
          }-01`
          payload.endMonthDay = `${date.getFullYear()}-${
            date.getMonth() + 2
          }-01`
        }

        const payListResult = await api.get(
          `/pay/list/${payload.brandId}?startDate=${payload.startMonthDay}&endDate=${payload.endMonthDay}`
        )

        if (payListResult.data.success) {
          commit('updateState', {
            payList: payListResult.data.payStatus,
          })
        } else {
          console.log(payListResult.data.errorMessage)
        }
      } catch (err) {
        console.log(err.response.data.message)
      }
    },

    async getProductList({ commit }, payload: { brandId: string }) {
      try {
        const productListResult = await api.get(
          `/pay/list/product/${payload.brandId}`
        )

        if (productListResult.data.success) {
          commit('updateState', {
            productList: productListResult.data.currentProduct,
          })
        } else {
          console.log(productListResult.data.errorMessage)
        }
      } catch (err) {
        console.log(err.response.data.message)
      }
    },
  },
}
