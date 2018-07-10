import gacha from '../../api/gacha-api'
import * as types from '../mutation-types'

const state = {
  gacha: {}
}

const getters = {
  gacha: state => state.gacha
}

const actions = {
  async pullGacha ({ commit, dispatch }, gachaPulls) {
    try {
      const account = await dispatch('checkActiveAccount')

      if (account.kh_id && account.kh_name) {
        for (const type of Object.keys(gachaPulls)) {
          console.log(type + ': ', gachaPulls[type])
          // Set account for gacha pulls that are missing that data
          // Not exactly a great scalable solution, as this is O(n*m) but it's good enough for now
          for (let i = 0; i < gachaPulls[type].length; i++) {
            const pull = gachaPulls[type][i]
            if (pull.kh_id === undefined) {
              pull.kh_id = account.kh_id
              pull.kh_name = account.kh_name
            }
            if (!pull.complete) {
              pull.complete = await gacha.recordGachaPull(pull, type)
            }
          }
        }
      } else {
        console.log('error in pullGacha, no account information available')
      }
    } catch (e) {
      console.log('error in pullGacha', e)
    }

    return commit(types.GACHA_PULL, gachaPulls)
  }
}

const mutations = {
  [types.GACHA_PULL] (state, gacha) {
    state.gacha = gacha
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
