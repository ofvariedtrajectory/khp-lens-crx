import account from '../../api/account-api'
import * as types from '../mutation-types'

const state = {
  account: {
    kh_id: null,
    kh_name: null,
    kh_lastcheck: null
  }
}

const config = {
  lastcheckTimeoutMs: 60 * 1000
}

const getters = {
  account: state => state.account
}

const actions = {
  async login ({ commit }) {
    try {
      const accountIdentifiers = await account.getAccountIdentifiers()
      commit(types.LOGIN, accountIdentifiers)
    } catch (error) {
      commit(types.LOGIN_FAILURE, error)
    }
  },
  async checkActiveAccount ({ commit, dispatch }) {
    if (state.account.kh_id !== null && state.account.kh_name !== null) {
      // Check lastcheck timestamp
      const lastcheck = state.account.kh_lastcheck
      if (lastcheck === null ||
        (lastcheck.getTime && lastcheck.getTime() + config.lastcheckTimeoutMs < (new Date()).getTime())
      ) {
        // Regen account
        await dispatch('login')
      }
    } else {
      await dispatch('login')
    }
    return state.account
  }
}

const mutations = {
  [types.LOGIN] (state, account) {
    state.account = account
    state.account.kh_lastcheck = new Date()
  },
  [types.LOGIN_FAILURE] (state, error) {
    console.log(error)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
