<template>
    <el-row>
      <el-col :span="10" :push="14">
        <!--
        <div class="grid-content bg-purple align-right">
          <div class="account-description" v-if="account.kh_id">
            You are currently using the <span class="bold" v-bind:title="account.kh_id">({{account.kh_id}})</span> account.<br />
          </div>
        </div>
      -->
      </el-col>
    </el-row>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    data: () => ({
      //
    }),
    computed: {
      ...mapGetters({
        account: 'account'
      })
    },
    methods: {
      //
    },
    components: {
      //
    },
    created () {
      //
    },
    mounted () { }
  }
</script>
<style lang="scss">
  .bold {
    font-weight: bold;
  }

  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .align-right {
    text-align: right;
  }
  .account-description {
    padding-left: 5px;
    padding-top: 4px;
    float: left;
  }
</style>
