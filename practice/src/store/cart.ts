import { PayTermPrice } from '../types/pay'
import { Module } from 'vuex'
import { RootState } from '.'

export interface CartModuleState {
  selectTermPrice: PayTermPrice[]
}

export const cartModule: Module<CartModuleState, RootState> = {
  namespaced: true,

  state: () => ({
    selectTermPrice: [],
  }),

  mutations: {
    updateState(state: CartModuleState, payload: CartModuleState) {
      state['selectTermPrice'] = payload['selectTermPrice']
    },
  },
}
