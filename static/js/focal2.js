console.log('focal2')

// var XHR = window.XMLHttpRequest
// var open = XHR.prototype.open
// var send = XHR.prototype.send

// XHR.prototype.open = function (method, url, async, user, pass) {
//   this._url = url
//   console.log('open', url);
//   open.call(this, method, url, async, user, pass)
// }

// XHR.prototype.send = function (data) {
//   var self = this
//   var oldOnReadyStateChange
//   var url = this._url
//   console.log('url', url, data)

//   function onReadyStateChange () {
//     console.log(self)
//     if (self.readyState === 4 /* complete */) {
//       // This is where you can put code that you want to execute post-complete 
//       /* URL is kept in this._url */
//       console.log(url, self.responseText)
//     }

//     if (oldOnReadyStateChange) {
//       oldOnReadyStateChange()
//     }
//   }

//   if (self.addEventListener) {
//     console.log('aaaa')
//     self.addEventListener('readystatechange', onReadyStateChange, false)
//   } else {
//     console.log('bbbb')
//     oldOnReadyStateChange = self.onreadystatechange
//     self.onreadystatechange = onReadyStateChange
//   }
//   console.log('j', self.responseText)
//   send.call(self, data)
// }
// window.tbd = [];
// ;(function (send) {
//     XMLHttpRequest.prototype.send = function(body) {
//         console.log('body', body);
//         window.tbd.push(body)
//         send.call(this, body)
//    }
// })(XMLHttpRequest.prototype.send)

// function bindResponse(request, response) {
//   request.__defineGetter__("responseText", function() {
//     console.warn('Something tried to get the responseText');
//     console.debug(response);
//     return response;
//   })
// }

// function processResponse(request,caller,method,path) {
//   bindResponse(request, request.responseText);
// }

// var proxied = window.XMLHttpRequest.prototype.open;
// window.XMLHttpRequest.prototype.open = function(method, path, async) {
//   var caller = arguments.callee.caller;
//   this.addEventListener('readystatechange', function() {
//     if (this.readyState === 4) {
//       console.log('self', this);
//       processResponse(this,caller,method,path);
//     }
//   }, true);
//   return proxied.apply(this, [].slice.call(arguments));
// };
