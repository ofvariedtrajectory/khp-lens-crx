<template>
  <div>
    <div>
      <div v-if="kh_name">
        <p>
          You are currently using the <span class="bold" v-bind:title="kh_id">{{kh_name}} ({{kh_id}})</span> account.<br />
          Click Login if this is not the correct account.
        </p>
      </div>
      <button type="button" class="el-button el-button--primary" @click="login">
        <span>Login</span>
      </button>
    </div>
  </div>
</template>
<script>
  export default {
    data: () => ({
      kh_id: '',
      kh_name: ''
    }),
    computed: { },
    created () {
    },
    mounted () { },
    methods: {
      login () {
        const self = this
        const url = 'https://cf.r.kamihimeproject.dmmgames.com/v1/a_players/me?json=%7B%22id_numeric%22%3Atrue%7D'
        const httpObj = new XMLHttpRequest()
        httpObj.open('get', url, false)
        httpObj.onload = function () {
          const result = JSON.parse(this.responseText)
          self.kh_id = result.a_player_id
          self.kh_name = result.name
          console.log(result)
        }
        httpObj.send(null)
      }
    }
  }
</script>
<style lang="scss">
  div {
    color: blue
  }
  .bold {
    font-weight: bold;
  }
</style>
