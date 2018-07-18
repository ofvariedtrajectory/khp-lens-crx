const Lens = function () {
  // a
}

Lens.constants = {
  mimeType: 'application/json',
  urlPatterns: {
    enhanceMaterials: 'enhance_materials',
    selectableBaseFilter: 'selectable_base_filter'
  },
  gacha_ids: {
    6: {
      name: 'jewel1'
    },
    7: {
      name: 'jewel10'
    },
    8: {
      name: 'gem1'
    },
    9: {
      name: 'gem10'
    },
    /* 10 is gem1free */
    10: {
      name: 'gem1'
    },
    11: {
      name: 'premiumticket1'
    }
  }
}

Lens.init = function () {
  Lens.initRequestListener()
  Lens.initPanel()
}

/**
 * Only need to use devtools to record POST gacha JSON requests
 */
Lens.checkRequestRelevancy = function (req) {
  const checkMimeType = req.response.content.mimeType === Lens.constants.mimeType
  const checkRequestMethod = req.request.method.toUpperCase() === 'POST'
  return checkMimeType && checkRequestMethod
}

Lens.initRequestListener = async function () {
  chrome.devtools.network.getHAR(function (result) {
    chrome.devtools.network.onRequestFinished.addListener(function (req) {
      if (Lens.checkRequestRelevancy(req)) {
        req.getContent(function (content) {
          console.log('req', req)
          const parsed = JSON.parse(content)

          if (parsed.gacha_id) {
            for (let i = 0; i < req.response.headers.length; i++) {
              const header = req.response.headers[i]
              if (header.name === 'date') {
                parsed.header_date = header.value
              } else if (header.name === 'kh-player-id') {
                parsed.kh_id = header.value
              }

              if (Lens.allHeadersFound(parsed)) {
                break
              }
            }
            Lens.gachaPulled(parsed)
          }
        })
      }
    })
  })
}

Lens.allHeadersFound = function (parsed) {
  return parsed.header_date !== undefined && parsed.kh_id !== undefined
}

Lens.initPanel = function () {
  chrome.devtools.panels.create('KHP Lens', 'none.png', 'pages/devtools_panel.html', function () {
    console.log('panel initialized')

    chrome.storage.local.set({
      lens: {
        weapons: {},
        kamihime: {},
        eidolons: {},
        gacha: {}
      }
    }, function () {
      console.log('Initialized lens data storage')
    })
  })
}

Lens.gachaPulled = async function (gacha) {
  console.log('gacha pull', gacha)
  chrome.storage.local.get(['lens'], async function (result) {
    console.log('[g]Value currently is ', result.lens)

    const gachaType = Lens.constants.gacha_ids[gacha.gacha_id]
    if (gachaType !== undefined) {
      console.log('gacha type', gachaType)
      if (result.lens.gacha[gachaType.name] === undefined) {
        result.lens.gacha[gachaType.name] = []
      }
      result.lens.gacha[gachaType.name].push(gacha)

      chrome.storage.local.set({
        lens: result.lens
      }, function () {
        console.log('Updated gacha')
      })
    }
  })
}

Lens.updateWeapons = function (weapons) {
  chrome.storage.local.get(['lens'], function (result) {
    console.log('[w]Value currently is ', result.lens.weapons)
    result.lens.weapons = weapons
    chrome.storage.local.set({
      lens: result.lens
    }, function () {
      console.log('Updated weapons')
    })
  })
}

Lens.updateKamihime = function (kamihime) {
  // TODO
}

Lens.updateEidolon = function (eidolon) {
  // TODO
}

Lens.init()
