import { User } from '../types/user'
import { Module } from 'vuex'
import { RootState } from '.'
import api from '../config/axios.config'

export interface AuthModuleState {
  user: User
  isLogin: boolean
  brand: string
  email: string
}

export const authModule: Module<AuthModuleState, RootState> = {
  // module
  namespaced: true,

  // data
  state: () => ({
    user: {} as User,
    isLogin: false,
    brand: '',
    email: '',
  }),

  // computed
  getters: {},

  // setState
  mutations: {
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    updateState(state: any, payload: any) {
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key]
      })
    },
  },

  actions: {
    async userSignin(
      _,
      payload: { email: string; password: string; role: string }
    ) {
      return api.post('/auth/signin', payload)
    },
  },
}
