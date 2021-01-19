
const storage = {

  prodApiURL: 'https://mural.practice.uffs.cc/api/',
  testApiURL: 'https://qa.mural.practice.uffs.cc/api/',

  api: function () {
    const settings = storage.getSettings()

    if (settings.devMode && settings.testApi)
      return storage.testApiURL
    else
      return storage.prodApiURL
  },

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
    let seconds = Math.floor(difference/1000)
    let minutes = Math.floor(difference/(1000*60))
    let hours = Math.floor(difference/(1000*60*60))
    let days = Math.floor(difference/(1000*60*60*24))
    let months = Math.floor(difference/(1000*60*60*24*30))
    let years = Math.floor(difference/(1000*60*60*24*30*12))
    
    if (years > 0)
      return (years === 1 ? years+' ano' : years+' anos')
    else if (months > 0)
      return (months === 1 ? months+' mês' : months+' meses')
    else if (days > 0)
      return (days === 1 ? days+' dias' : days+' dia')
    else if (hours > 0)
      return (hours === 1 ? hours+' hora' : hours+' horas')
    else if (minutes > 0)
      return (minutes === 1 ? minutes+' minuto' : minutes+' minutos')
    else if (seconds > 0)
      return (seconds === 1 ? seconds+' segundo' : seconds+' segundos')
    else
      return "agora mesmo"
  },

  formatDate: function (date) {
    date = date.split(" ")
    date = new Date(Date.parse(date[2] + " " + date[1] + ", " + date[3]))

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    date = date.toLocaleDateString(undefined, options)

    return date.toUpperCase().charAt(0).toUpperCase() + date.slice(1)
  },

  processHTML: function (input) {
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
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
        // Dev options
        devMode: true,
        testApi: true,
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
    storage.app.request.promise.post(storage.api()+'auth/login', {username: username, password: password})
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
    storage.app.request.promise.post(storage.api()+'auth/logout')
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
    storage.app.request.promise.post(storage.api()+'auth/me')
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

  // News methods

  getNews: function (callback=()=>{}) {
    storage.app.request.promise.get('https://practice.uffs.cc/feed.xml')
    .then(function (res) {
      try {
        let xml_parser = require('fast-xml-parser');
        let obj = xml_parser.parse(res.data)
        let news = obj.rss.channel.item

        for (let i = 0; i < news.length; i++) {
          const content = storage.processHTML(news[i].content)
          news[i].content = content

          const pubDate = storage.formatDate(news[i].pubDate)
          news[i].pubDate = pubDate
        }

        callback(news)
      } catch (error) {
        callback(false)
      }
    })
    .catch(function (err) {
      callback(false)
    })
  },

  // Services methods

  getServiceSpecifications: function (callback=()=>{}) {
    storage.app.request.promise.get(storage.api()+'specifications')
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
      storage.app.request.promise.get(storage.api()+'services', { user_id: user_data.id })
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
    storage.app.request.promise.get(storage.api()+'locations')
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
      
      storage.app.request.promise.post(storage.api()+'services', service)
      .then(function (res) {
        callback(true)
      })
      .catch(function () {
        callback(false)
      })
    })
  },

  getServiceById: function (id, callback=()=>{}) {
    storage.getUserData(function (user_data) {
      storage.app.request.promise.get(storage.api()+'service/'+id)
      .then(function (res) {
        let service = JSON.parse(res.data)
        service.timestamp = storage.dateDifference(service.created_at)
        service.created_at = storage.formatDateDifference(service.timestamp)
        service.user_id = Number(service.user_id)
        service.category_id = Number(service.category_id)
        service.location_id = Number(service.location_id)
        service.specification_id = Number(service.specification_id)
        service.status = Number(service.status)
        service.type = Number(service.type)
        service.hidden = Number(service.hidden)
        service.user = user_data
        callback(service)
      })
      .catch(function () {
        callback(false)
      })
    })
  },

  getServiceComments: function (service_id, callback=()=>{}) {
    storage.app.request.promise.get(storage.api()+'service/'+service_id+'/comments')
    .then(function (res) {
      let comments = JSON.parse(res.data).data
      for (let i=0; i<comments.length; i++) {
        comments[i].timestamp = storage.dateDifference(comments[i].date)
        comments[i].date = storage.formatDateDifference(comments[i].timestamp)
      }
      callback(comments)
    })
    .catch(function () {
      callback(false)
    })
  },

  postCommentByServiceId: function (service_id, comment, callback=()=>{}) {
    storage.getUserData(function (user_data) {
      comment.user_id = user_data.id
      comment.user = user_data.username

      storage.app.request.promise.post(storage.api()+'service/'+service_id+'/comments', comment)
      .then(function (res) {
        callback(true)
      })
      .catch(function () {
        callback(false)
      })
    })
  },

}

export default storage