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
      for (const type of Object.keys(gachaPulls)) {
        console.log(type + ': ', gachaPulls[type])
        // Set account for gacha pulls that are missing that data
        // Not exactly a great scalable solution, as this is O(n*m) but it's good enough for now
        for (let i = 0; i < gachaPulls[type].length; i++) {
          const pull = gachaPulls[type][i]
          if (!pull.complete) {
            pull.complete = await gacha.recordGachaPull(pull, type)
          }
        }
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
