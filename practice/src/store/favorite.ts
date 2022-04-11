import { Favorite } from '../types/favorite'
import { Module } from 'vuex'
import { RootState } from '.'

export interface FavoriteModuleState {
  favorite: Favorite[]
}

export const favoriteModule: Module<FavoriteModuleState, RootState> = {
  namespaced: true,
  state: () => ({
    favorite: [],
  }),

  mutations: {
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    updateState(state: any, payload: any) {
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key]
      })
    },
  },
}
