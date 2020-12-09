
const storage = {

  init: function (app) {
    storage.app = app
    app.storage = storage
  },

  // Value processing methods

  dateDifference: function (date) {
    date = new Date(date)
    const now = new Date()
    return now - date
  },

  formatDateDifference: function (difference) {
    // Seconds
    difference /= 1000
    if (difference < 60) {
      difference = Math.floor(difference)
      if (difference === 1)
        return difference + ' segundo'
      else if (difference === 0)
        return 'agora mesmo'
      else
        return difference + ' segundos'
    }
    // Minutes
    difference /= 60
    if (difference < 60) {
      difference = Math.floor(difference)
      if (difference === 1)
        return difference + ' minuto'
      else
        return difference + ' minutos'
    }
    // Hour
    difference /= 60
    if (difference < 24) {
      difference = Math.floor(difference)
      if (difference === 1)
        return difference + ' hora'
      else
        return difference + ' horas'
    }
    // Day
    difference /= 24
    if (difference < 30) {
      difference = Math.floor(difference)
      if (difference === 1)
        return difference + ' dia'
      else
        return difference + ' dias'
    }
    // Months
    difference /= 30
    if (difference < 12) {
      difference = Math.floor(difference)
      if (difference === 1)
        return difference + ' mês'
      else
        return difference + ' meses'
    }
    // Years
    difference /= 12
    difference = Math.floor(difference)
    if (difference === 1)
      return difference + ' ano'
    else
      return difference + ' anos'
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

  requestLogin: function (username, password, callback=()=>{}) {
    storage.app.request.promise.post('https://qa.mural.practice.uffs.cc/api/auth/login', {username: username, password: password})
    .then(function (res) {
      let data = JSON.parse(res.data)
      if (data.access_token) {
        storage.setUserCredentials(data)
        callback(true)
        storage.app.request.setup({
          headers: {
            Authorization: 'Bearer '+data.access_token
          }
        })
        storage.requestUserData()
      }
      else
        callback(false)
    })
    .catch(function (err) {
      if (err.status == 401)
        callback(false)
      else
        callback(null)
    })
  },

  requestLogout: function (callback=()=>{}) {
    storage.app.request.promise.post('https://qa.mural.practice.uffs.cc/api/auth/logout')
    .then(function (res) {
      if (res.data) {
        storage.clearUserCredentials()
        storage.app.request.setup({
          headers: {
            Authorization: ''
          }
        })
        callback(true)
      }
      else
        callback(false)
    })
    .catch(function (err) {
      callback(null)
    })
  },

  getUserCredentials: function (callback=()=>{}) {
    let userCredentials = localStorage['userCredentials']

    if (userCredentials)
      callback(JSON.parse(userCredentials))
    else
      callback(false)  
  },

  setUserCredentials: function (userCredentials) {
    localStorage['userCredentials'] = JSON.stringify(userCredentials)
  },
  
  clearUserCredentials: function () {
    localStorage.removeItem('userCredentials')
  },

  // User data methods

  requestUserData: function (callback=()=>{}) {
    storage.app.request.promise.post('https://qa.mural.practice.uffs.cc/api/auth/me')
    .then(function (res) {
      const user_data = JSON.parse(res.data)
      storage.setUserData(user_data)
      callback(user_data)
    })
    .catch(function (err) {
      callback(false)
    })
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

  setUserData: function (user_data) {
    localStorage['userData'] = JSON.stringify(user_data)
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
    storage.getUserData(function (user_data) {
      storage.app.request.promise.get('https://qa.mural.practice.uffs.cc/api/services', { user_id: user_data.id })
      .then(function (res) {
        let services = JSON.parse(res.data).data
        for (let i=0; i<services.length; i++) {
          services[i].timestamp = storage.dateDifference(services[i].created_at)
          services[i].created_at = storage.formatDateDifference(services[i].timestamp)
          services[i].user_id = Number(services[i].user_id)
          services[i].category_id = Number(services[i].category_id)
          services[i].location_id = Number(services[i].location_id)
          services[i].specification_id = Number(services[i].specification_id)
          services[i].status = Number(services[i].status)
        }
        services.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1)
        callback(services)
      })
      .catch(function (err) {
        callback(false)
      })
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
    storage.getUserData(function (user_data) {
      service.user_id = user_data.id
      
      storage.app.request.promise.post('https://qa.mural.practice.uffs.cc/api/services', service)
      .then(function (res) {
        console.log(res)
        callback(true)
      })
      .catch(function () {
        callback(false)
      })
    })
  },

}

export default storage