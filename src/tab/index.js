import Vue from 'vue'
import root from './root.vue'
Vue.config.productionTip = false

new Vue({ // eslint-disable-line no-new
  el: '#root',
  render: h => h(root)
})

// function ext () {
//   console.log('ext')
// }
// (function (XHR) {
//   'use strict'

//   var open = XHR.prototype.open
//   var send = XHR.prototype.send

//   XHR.prototype.open = function (method, url, async, user, pass) {
//     this._url = url
//     open.call(this, method, url, async, user, pass)
//   }

//   XHR.prototype.send = function (data) {
//     var self = this
//     var oldOnReadyStateChange
//     var url = this._url

//     function onReadyStateChange () {
//       if (self.readyState === 4 /* complete */) {
//         /* This is where you can put code that you want to execute post-complete */
//        //  URL is kept in this._url
//         console.log(url, data)
//         ext()
//       }

//       if (oldOnReadyStateChange) {
//         oldOnReadyStateChange()
//       }
//     }

//     /* Set xhr.noIntercept to true to disable the interceptor for a particular call */
//     if (!this.noIntercept) {
//       if (this.addEventListener) {
//         this.addEventListener('readystatechange', onReadyStateChange, false)
//       } else {
//         oldOnReadyStateChange = this.onreadystatechange
//         this.onreadystatechange = onReadyStateChange
//       }
//     }

//     send.call(this, data)
//   }
// })(XMLHttpRequest)
