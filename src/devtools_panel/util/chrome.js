export default {
  promisifiedChromeStorageLocalSet (data) {
    return new Promise(function (resolve, reject) {
      chrome.storage.local.set(data, function () {
        resolve()
      })
    })
  }
}
