
const storage = {

  init: function (app) {
    storage.app = app
    app.storage = storage
  },

  // LocalStorage methods

  clearAll: function () {
    localStorage.clear()
  },

  // Settings methods

  getSettings: function () {
    let settings = localStorage['settings']

    if (!settings) {
      settings = {
        offlineStorage: true,
        betaFunctions: false
      }
      localStorage['settings'] = JSON.stringify(settings)
    }
    else
      settings = JSON.parse(settings)
    
    return settings
  },

  setSettings: function (settings) {
    localStorage['settings'] = JSON.stringify(settings)
  },
  
  // User credentials methods

  authorizeUser: function (user, password, callback=()=>{}) {
    storage.app.request.promise.post('https://api.uffs.cc/v0/auth', {user: user, password: password})
    .then(function (res) {
      let data = JSON.parse(res.data)
      if (data.token) {
        storage.setUserCredentials(data)
        callback(true)
      }
      else
        callback(false)
    })
  },

  getUserCredentials: function () {
    let userCredentials = localStorage['userCredentials']
    return userCredentials
  },

  setUserCredentials: function (userCredentials) {
    localStorage['userCredentials'] = userCredentials
  },
  
  clearUserCredentials: function () {
    localStorage.removeItem('userCredentials')
  },
  
  // Audio recording methods
  
  getRecordings: function () {
    let recordings = localStorage['recordings']
  
    if (!recordings) {
      recordings = []
      localStorage['recordings'] = JSON.stringify(recordings)
    }
    else
      recordings = JSON.parse(recordings)
    
    return recordings
  },
  
  addRecording: function (recording) {
    let recordings = localStorage['recordings']
  
    if (!recordings)
      recordings = []
  
    recordings = JSON.parse(recordings)
    recordings.push(recording)
  
    localStorage['recordings'] = JSON.stringify(recordings)
  },
  
  clearRecordings: function () {
    localStorage.removeItem('recordings')
  },

}

export default storage