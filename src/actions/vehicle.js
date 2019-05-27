import vehicleService from '../services/vehicle'
import videoService from '../services/video'

/* --------- Create --------- */
export const CREATE_VEHICLE_START = 'CREATE_VEHICLE_START'
export const CREATE_VEHICLE_ERROR = 'CREATE_VEHICLE_ERROR'
export const CREATE_VEHICLE_SUCCESS = 'CREATE_VEHICLE_SUCCESS'
export const SAVE_VEHICLE = 'SAVE_VEHICLE'

export const createVehicleStart = () => ({
  type: CREATE_VEHICLE_START
})

export const createVehicleError = () => ({
  type: CREATE_VEHICLE_ERROR
})

export const createVehicleSuccess = data => ({
  type: CREATE_VEHICLE_SUCCESS,
  data
})

export const createVehicle = data => dispatch => {
  dispatch(createVehicleStart())
  return new Promise((resolve, reject) => {
    vehicleService
      .create(data)
      .then(response => {
        dispatch(createVehicleSuccess(response.data.data))
        resolve(response.data.data)
      })
      .catch(e => {
        dispatch(createVehicleError(e))
        reject(e)
      })
  })
}

export const saveVehicle = data => dispatch =>
  new Promise(resolve => {
    dispatch({ type: SAVE_VEHICLE, data })
    resolve(data)
  })

/* --------- Read --------- */
export const READ_VEHICLE_START = 'READ_VEHICLE_START'
export const READ_VEHICLE_ERROR = 'READ_VEHICLE_ERROR'
export const READ_VEHICLE_SUCCESS = 'READ_VEHICLE_SUCCESS'

export const readVehicleStart = () => ({
  type: READ_VEHICLE_START
})

export const readVehicleError = () => ({
  type: READ_VEHICLE_ERROR
})

export const readVehicleSuccess = data => ({
  type: READ_VEHICLE_SUCCESS,
  data
})

export const readVehicle = () => dispatch => {
  dispatch(readVehicleStart())
  return new Promise((resolve, reject) => {
    vehicleService
      .read()
      .then(response => {
        dispatch(readVehicleSuccess(response.data.data))
        resolve(response.data.data)
      })
      .catch(e => {
        dispatch(readVehicleError(e))
        reject(e)
      })
  })
}

/* --------- Update --------- */
export const UPDATE_VEHICLE_START = 'UPDATE_VEHICLE_START'
export const UPDATE_VEHICLE_ERROR = 'UPDATE_VEHICLE_ERROR'
export const UPDATE_VEHICLE_SUCCESS = 'UPDATE_VEHICLE_SUCCESS'

export const updateVehicleStart = () => ({
  type: UPDATE_VEHICLE_START
})

export const updateVehicleError = () => ({
  type: UPDATE_VEHICLE_ERROR
})

export const updateVehicleSuccess = data => ({
  type: UPDATE_VEHICLE_SUCCESS,
  data
})

export const updateVehicle = data => dispatch => {
  dispatch(updateVehicleStart())
  return new Promise((resolve, reject) => {
    vehicleService
      .update(data)
      .then(response => {
        dispatch(updateVehicleSuccess(response.data.data))
        resolve(response.data.data)
      })
      .catch(e => {
        dispatch(updateVehicleError(e))
        reject(e)
      })
  })
}

/* --------- Start recording video --------- */
export const START_360_VIDEO_PREVIEW_START = 'START_360_VIDEO_PREVIEW_START'
export const START_360_VIDEO_PREVIEW_ERROR = 'START_360_VIDEO_PREVIEW_ERROR'
export const START_360_VIDEO_PREVIEW_SUCCESS = 'START_360_VIDEO_PREVIEW_SUCCESS'

export const startVideoPreviewStart = () => ({
  type: START_360_VIDEO_PREVIEW_START
})

export const startVideoPreviewError = () => ({
  type: START_360_VIDEO_PREVIEW_ERROR
})

export const startVideoPreviewSuccess = data => ({
  type: START_360_VIDEO_PREVIEW_SUCCESS,
  data
})

export const startVideoPreview = videoElement => dispatch => {
  dispatch(startVideoPreviewStart())
  return new Promise((resolve, reject) => {
    videoService
      .startLivePreview(videoElement)
      .then(() => {
        dispatch(startVideoPreviewSuccess())
        resolve()
      })
      .catch(e => {
        dispatch(startVideoPreviewError(e))
        reject(e)
      })
  })
}

/* --------- Start recording video --------- */
export const START_RECORDING_360_VIDEO_START = 'START_RECORDING_360_VIDEO_START'
export const START_RECORDING_360_VIDEO_ERROR = 'START_RECORDING_360_VIDEO_ERROR'
export const START_RECORDING_360_VIDEO_SUCCESS = 'START_RECORDING_360_VIDEO_SUCCESS'

export const startRecordingVehicleVideoStart = () => ({
  type: START_RECORDING_360_VIDEO_START
})

export const startRecordingVehicleVideoError = () => ({
  type: START_RECORDING_360_VIDEO_ERROR
})

export const startRecordingVehicleVideoSuccess = data => ({
  type: START_RECORDING_360_VIDEO_SUCCESS,
  data
})

export const startRecordingVehicleVideo = videoElement => dispatch => {
  dispatch(startRecordingVehicleVideoStart())
  return new Promise((resolve, reject) => {
    videoService
      .startRecording(videoElement)
      .then(() => {
        dispatch(startRecordingVehicleVideoSuccess())
        resolve()
      })
      .catch(e => {
        dispatch(startRecordingVehicleVideoError(e))
        reject(e)
      })
  })
}

/* --------- Start recording video --------- */
export const STOP_RECORDING_360_VIDEO_STOP = 'STOP_RECORDING_360_VIDEO_STOP'
export const STOP_RECORDING_360_VIDEO_ERROR = 'STOP_RECORDING_360_VIDEO_ERROR'
export const STOP_RECORDING_360_VIDEO_SUCCESS = 'STOP_RECORDING_360_VIDEO_SUCCESS'

export const stopRecordingVehicleVideoStart = () => ({
  type: STOP_RECORDING_360_VIDEO_STOP
})

export const stopRecordingVehicleVideoError = () => ({
  type: STOP_RECORDING_360_VIDEO_ERROR
})

export const stopRecordingVehicleVideoSuccess = data => ({
  type: STOP_RECORDING_360_VIDEO_SUCCESS,
  data
})

export const stopRecordingVehicleVideo = videoElement => dispatch => {
  dispatch(stopRecordingVehicleVideoStart())
  return new Promise((resolve, reject) => {
    videoService
      .stopRecording(videoElement)
      .then(video => {
        dispatch(stopRecordingVehicleVideoSuccess(video))
        console.log(video)
        resolve(video)
      })
      .catch(e => {
        dispatch(stopRecordingVehicleVideoError(e))
        reject(e)
      })
  })
}

/* --------- Create --------- */
export const SAVE_VEHICLE_VIDEO_START = 'SAVE_VEHICLE_VIDEO_START'
export const SAVE_VEHICLE_VIDEO_ERROR = 'SAVE_VEHICLE_VIDEO_ERROR'
export const SAVE_VEHICLE_VIDEO_PROGRESS = 'SAVE_VEHICLE_VIDEO_PROGRESS'
export const SAVE_VEHICLE_VIDEO_SUCCESS = 'SAVE_VEHICLE_VIDEO_SUCCESS'

export const saveVideoStart = () => ({
  type: SAVE_VEHICLE_VIDEO_START
})

export const saveVideoError = () => ({
  type: SAVE_VEHICLE_VIDEO_ERROR
})

export const saveVideoSuccess = data => ({
  type: SAVE_VEHICLE_VIDEO_SUCCESS,
  data
})

export const saveVideoProgress = data => ({
  type: SAVE_VEHICLE_VIDEO_PROGRESS,
  data
})

export const saveVideo = (id, video) => dispatch => {
  dispatch(saveVideoStart())
  return new Promise((resolve, reject) => {
    vehicleService.saveVideo(
      id,
      video,
      response => {
        dispatch(saveVideoSuccess(response.data.data))
        resolve(response.data.data)
      },
      e => {
        dispatch(saveVideoError(e))
        reject(e)
      },
      progress => {
        dispatch(saveVideoProgress())
      }
    )
  })
}
