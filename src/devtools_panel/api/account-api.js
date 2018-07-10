import Vue from 'vue'

export default {
  getAccountIdentifiers () {
    return Vue.http.get('https://cf.r.kamihimeproject.dmmgames.com/v1/a_players/me?json=%7B%22id_numeric%22%3Atrue%7D')
      .then(response => {
        const khId = response.body.a_player_id
        const khName = response.body.name

        if (khId && khName) {
          return Promise.resolve({
            kh_id: khId,
            kh_name: khName
          })
        } else {
          console.log(response.body)
          return Promise.reject(new Error('Account not providing correct data'))
        }
      })
      .catch(error => Promise.reject(error))
  }
}
