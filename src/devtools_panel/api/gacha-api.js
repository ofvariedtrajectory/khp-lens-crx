import Vue from 'vue'

const KHP_DEVICE_LENS_HOSTNAME = 'https://khp-device-lens.net'
const KHP_DEVICE_LENS_API_PREFIX = KHP_DEVICE_LENS_HOSTNAME + '/v1'

export default {
  // /v1/{kh_id}/gacha/{type}
  async recordGachaPull (pull, type) {
    const khId = pull.kh_id
    try {
      const response = await Vue.http.post(KHP_DEVICE_LENS_API_PREFIX + '/' + khId + '/gacha/' + type, pull)
      console.log('recordGachaPull', response)
      return true
    } catch (error) {
      console.log('gacha.api error', error)
      return false
    }
  }
}
