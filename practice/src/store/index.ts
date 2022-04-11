import { createStore, createLogger } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { AuthModuleState, authModule as auth } from './auth'
import { BrandModuleState, brandModule as brand } from './brand'
import { CartModuleState, cartModule as cart } from './cart'
import { FavoriteModuleState, favoriteModule as favorite } from './favorite'

export interface RootState {
  auth: AuthModuleState
  brand: BrandModuleState
  cart: CartModuleState
  favorite: FavoriteModuleState
}

export default createStore({
  modules: {
    auth,
    brand,
    cart,
    favorite,
  },
  plugins:
    process.env.NODE_ENV !== 'production'
      ? [
          createLogger(),
          createPersistedState({
            paths: [],
          }),
        ]
      : [
          createPersistedState({
            paths: [],
          }),
        ],
})
