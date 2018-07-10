import Vue from 'vue'
import rootPanel from './root_panel.vue'
import ElementUI from 'element-ui'
import VueResource from 'vue-resource'
import 'element-ui/lib/theme-chalk/index.css'

import store from './store'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueResource)

new Vue({ // eslint-disable-line no-new
  el: '#root',
  store,
  render: h => h(rootPanel)
})
