<template>
  <div>
    <account-component></account-component>
    <div>
      <h1>Current Session Gacha Pulls</h1>
      <div v-for="(pulls, type) in gacha" :key="pulls.gacha_id">
        <h2>{{type}}</h2>
        <el-table
          :data="pulls"
          style="width: 100%"
          :row-class-name="tableRowClassName">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="obtained_info.length" label="Rolls"></el-table-column>
          <el-table-column prop="kh_id" label="Account ID"></el-table-column>
          <el-table-column prop="header_date" label="Timestamp"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import AccountComponent from './account-component.vue'
  import chromeUtils from './util/chrome'
  export default {
    data: () => ({
      //
    }),
    computed: {
      ...mapGetters({
        account: 'account',
        gacha: 'gacha'
      })
    },
    methods: {
      tableRowClassName ({ row, rowIndex }) {
        if (row.complete) {
          return 'completed-request'
        } else {
          return 'incomplete-request'
        }
      },
      ...mapActions([
        'pullGacha'
      ])
    },
    components: {
      AccountComponent
    },
    created () {
      const self = this
      chrome.storage.onChanged.addListener(function (changes, areaName) {
        const lens = changes.lens.newValue
        console.log('New item in storage', JSON.stringify(changes.lens.newValue))
        if (lens.gacha) {
          self.pullGacha(lens.gacha).then(function () {
            chromeUtils.promisifiedChromeStorageLocalSet({ lens: lens }).then(function () {
              console.log('updated storage from frontend gacha pull')
            })
          })
        }
      })
    },
    mounted () { }
  }
</script>
<style lang="scss">
  body {
    color: black;
  }
  .el-table__row.completed-request {
    background: #f0f9eb;
  }
  .el-table__row.incomplete-request {
    background: oldlace;
  }
</style>
