
const storage = {

  // LocalStorage methods

  removeAll: function () {
    localStorage.clear()
  },
  
  // User credentials methods

  getUserCredentials: function () {
    let userCredentials = localStorage['userCredentials']
    return userCredentials
  },

  setUserCredentials: function (userCredentials) {
    localStorage['userCredentials'] = userCredentials
  },
  
  removeUserCredentials: function () {
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
  
  removeRecordings: function () {
    localStorage.removeItem('recordings')
  },

}

export default storage