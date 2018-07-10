import Vue from 'vue'
import Vuex from 'vuex'

import account from './modules/account'
import gacha from './modules/gacha'

import createLogger from '../util/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    account,
    gacha
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
