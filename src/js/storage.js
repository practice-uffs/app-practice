
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
    .catch(function () {
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

  // Services methods

  getServiceOptions: function (callback=()=>{}) {
    callback([
      {
        name: 'Cartilha',
        type: 'Texto',
        image: '../static/images/cartilha.png',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet tellus cras adipiscing enim eu turpis. Aliquam ultrices sagittis orci a scelerisque purus semper eget.',
        deadline: 7,
      },
      {
        name: 'Manual',
        type: 'Texto',
        image: '../static/images/manual.png',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet tellus cras adipiscing enim eu turpis. Aliquam ultrices sagittis orci a scelerisque purus semper eget.',
        deadline: 7,
      },
      {
        name: 'Identidade visual',
        type: 'Imagem',
        image: '../static/images/imagem.png',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet tellus cras adipiscing enim eu turpis. Aliquam ultrices sagittis orci a scelerisque purus semper eget.',
        deadline: 15,
      },
      {
        name: 'Podcast',
        type: 'Mídia',
        image: '../static/images/podcast.png',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet tellus cras adipiscing enim eu turpis. Aliquam ultrices sagittis orci a scelerisque purus semper eget.',
        deadline: 15,
      },
    ])
    return
    storage.app.request.promise.get('https://qa.mural.practice.uffs.cc/api/specifications')
    .then(function (res) {
      callback(JSON.parse(res.data))
    })
    .catch(function (err) {
      callback(false)
    })
  },

  getRequestedServices: function (callback=()=>{}) {
    storage.app.request.promise.get('https://qa.mural.practice.uffs.cc/api/services?user_id=2')
    .then(function (res) {
      callback(JSON.parse(res.data))
    })
    .catch(function (err) {
      callback(false)
    })
  }

}

export default storage