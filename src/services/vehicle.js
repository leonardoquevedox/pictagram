import axios from 'axios'
import config from '../config'
import authService from './auth'
import localStorageService from './localstorage'
import utilsService from './utils'

const create = params =>
  axios.post(`${config.baseUrl}/vehicle`, params, {
    headers: {
      Authorization: authService.getAuthorizationHeader()
    }
  })

const read = () =>
  axios.get(`${config.baseUrl}/vehicle`, {
    headers: {
      Authorization: authService.getAuthorizationHeader()
    }
  })

const update = params =>
  axios.put(`${config.baseUrl}/vehicle`, params, {
    headers: {
      Authorization: authService.getAuthorizationHeader()
    }
  })

const remove = params =>
  axios.delete(`${config.baseUrl}/vehicle`, params, {
    headers: {
      Authorization: authService.getAuthorizationHeader()
    }
  })

const saveVideo = async (id, video, onSuccess, onError, onProgress) => {
  try {
    const formData = new FormData()
    formData.append('video', utilsService.blobToFile(video))
    const response = await axios.post(`${config.baseUrl}/vehicle/${id}/video`, formData, {
      headers: {
        Authorization: authService.getAuthorizationHeader()
      },
      onUploadProgress: progressEvent => {
        const percentage = Math.floor((progressEvent.loaded * 100) / progressEvent.total)
        onProgress(percentage)
      }
    })
    onSuccess(response)
  } catch (e) {
    onError(e)
  }
}

const getCurrentVehicle = () => {
  const state = localStorageService.getState()
  if (state.vehicle) {
    const vehicleState = JSON.parse(state.vehicle)
    return vehicleState.current || {}
  }
  return {}
}

export default { create, read, update, remove, saveVideo, getCurrentVehicle }
