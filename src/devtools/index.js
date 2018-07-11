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

Lens.initRequestListener = async function () {
  chrome.devtools.network.getHAR(function (result) {
    chrome.devtools.network.onRequestFinished.addListener(function (req) {
      if (req.response.content.mimeType === Lens.constants.mimeType) {
        req.getContent(function (content) {
          const parsed = JSON.parse(content)
          const url = req.request.url

          if (parsed.gacha_id) {
            for (let i = 0; i < req.response.headers.length; i++) {
              const header = req.response.headers[i]
              if (header.name === 'date') {
                parsed.header_date = header.value
                break
              }
            }
            Lens.gachaPulled(parsed)
          } else if (parsed.data &&
              parsed.data.length &&
              url.indexOf(Lens.constants.urlPatterns.selectableBaseFilter) === -1 &&
              url.indexOf(Lens.constants.urlPatterns.enhanceMaterials) === -1) {
            // console.log(req)
            if (parsed.data[0].a_weapon_id) {
              // https://cf.r.kamihimeproject.dmmgames.com/v1/a_weapons/?json=%7B%22page%22%3A1%2C%22per_page%22%3A18%7D
              console.log('You have', parsed.max_record_count, 'weapons.')
              Lens.updateWeapons(parsed.data)
            } else if (parsed.data[0].a_character_id) {
              console.log('You have', parsed.max_record_count, 'kamihime.')
              Lens.updateKamihime(parsed.data)
            } else if (parsed.data[0].a_summon_id) {
              console.log('You have', parsed.max_record_count, 'eidolon.')
              Lens.updateEidolon(parsed.data)
            }

            console.log(parsed.data)
          }
        })
      }
    })
  })
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
