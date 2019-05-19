import axios from 'axios'
import config from '../config'
import authService from './auth'
import utilsService from './utils'

const create = params =>
  axios.post(`${config.baseUrl}/user`, params, {
    headers: {
      Authorization: authService.getAuthorizationHeader()
    }
  })

const read = () =>
  axios.get(`${config.baseUrl}/user`, {
    headers: {
      Authorization: authService.getAuthorizationHeader()
    }
  })

const update = params =>
  axios.put(`${config.baseUrl}/user`, params, {
    headers: {
      Authorization: authService.getAuthorizationHeader()
    }
  })

const createRiskForm = params =>
  axios.post(`${config.baseUrl}/risk_analysis`, params, {
    headers: {
      Authorization: authService.getAuthorizationHeader()
    }
  })

const saveCnhPicture = async (base64, onSuccess, onError, onProgress) => {
  try {
    const formData = new FormData()
    console.log(utilsService.base64ToFile(base64))
    const filename = 'cnh.base64'
    formData.append('file', utilsService.base64ToFile(base64, filename))
    const response = await axios.post(`${config.baseUrl}/cnh`, formData, {
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

export default { create, read, update, createRiskForm, saveCnhPicture }
