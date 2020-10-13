// User credentials

const getUserCredentials = function () {
  let userCredentials = localStorage['userCredentials']
  return userCredentials
}

const setUserCredentials = function (userCredentials) {
  localStorage['userCredentials'] = userCredentials
}

const removeUserCredentials = function () {
  localStorage.removeItem('userCredentials')
}

export { getUserCredentials, setUserCredentials, removeUserCredentials }

// Audio recording methods

const getRecordings = function () {
  let recordings = localStorage['recordings']

  if (!recordings) {
    recordings = []
    localStorage['recordings'] = JSON.stringify(recordings)
  }
  else
    recordings = JSON.parse(recordings)
  
  return recordings
}

const addRecording = function (recording) {
  let recordings = localStorage['recordings']

  if (!recordings)
    recordings = []

  recordings = JSON.parse(recordings)
  recordings.push(recording)

  localStorage['recordings'] = JSON.stringify(recordings)
}

const removeRecordings = function () {
  localStorage.removeItem('recordings')
}

export { getRecordings, addRecording, removeRecordings }