
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

  requestUserCredentials: function (username, password, callback=()=>{}) {
    storage.app.request.promise.post('https://qa.mural.practice.uffs.cc/api/auth/login', {username: username, password: password})
    .then(function (res) {
      let data = JSON.parse(res.data)
      if (data.access_token) {
        storage.setUserCredentials(data)
        storage.requestUserData()
        callback(true)
      }
      else
        callback(false)
    })
    .catch(function (err) {
      callback(null)
    })
  },

  getUserCredentials: function () {
    let userCredentials = localStorage['userCredentials']

    if (userCredentials)
      userCredentials = JSON.parse(userCredentials)
      
    return userCredentials
  },

  setUserCredentials: function (userCredentials) {
    localStorage['userCredentials'] = JSON.stringify(userCredentials)
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

  // User data methods

  setUserData: function (user_data) {
    localStorage['userData'] = JSON.stringify(user_data)
  },

  getUserData: function (callback=()=>{}) {
    let user_data = localStorage['userData']

    if (!user_data)
      storage.requestUserData(function (res) {
        if (res)
          callback(res)
        else
          callback(false)
      })
    else
      callback(JSON.parse(user_data))
  },

  requestUserData: function (callback=()=>{}) {
    const access_token = storage.getUserCredentials().access_token
    
    storage.app.request.promise.post('https://qa.mural.practice.uffs.cc/api/auth/me', {token: access_token})
    .then(function (res) {
      const user_data = JSON.parse(res.data)
      storage.setUserData(user_data)
      callback(user_data)
    })
    .catch(function (err) {
      callback(false)
    })
  },

  // Services methods

  getServiceSpecifications: function (callback=()=>{}) {
    storage.app.request.promise.get('https://qa.mural.practice.uffs.cc/api/specifications')
    .then(function (res) {
      // Grouping services by category
      let service_specifications = JSON.parse(res.data)
      service_specifications = service_specifications.reduce(function(list, x) {
        (list[x['category_id']] = list[x['category_id']] || []).push(x)
        return list;
      }, {})
      callback(service_specifications)
    })
    .catch(function (err) {
      callback(false)
    })
  },

  getRequestedServices: function (callback=()=>{}) {
    storage.app.request.promise.get('https://qa.mural.practice.uffs.cc/api/services?user_id=1')
    .then(function (res) {
      callback(JSON.parse(res.data))
    })
    .catch(function (err) {
      callback(false)
    })
  },

  getLocations: function (callback=()=>{}) {
    storage.app.request.promise.get('https://qa.mural.practice.uffs.cc/api/locations')
    .then(function (res) {
      callback(JSON.parse(res.data))
    })
    .catch(function (err) {
      callback(false)
    })
  },

  postServiceRequest: function (service, callback=()=>{}) {
    service.user_id = 1
    storage.app.request.promise.post('https://qa.mural.practice.uffs.cc/api/services', service)
    .then(function (res) {
      callback(true)
    })
    .catch(function () {
      callback(false)
    })
  },

}

export default storage