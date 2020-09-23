

// Audio recording methods

const getRecordings = function () {
  let recordings = localStorage['recordings']

  if (recordings === undefined) {
    recordings = []
    localStorage.setItem('recordings', JSON.stringify(recordings))
  }
  else
    recordings = JSON.parse(recordings)
  
  return recordings
}

const addRecording = function (title, base64) {
  let recordings = localStorage['recordings']

  if (recordings === undefined)
    recordings = []

  recordings = JSON.parse(recordings)
  recordings.push({
    title: title,
    base64: base64
  })

  localStorage.setItem('recordings', JSON.stringify(recordings))
}

export { getRecordings, addRecording }