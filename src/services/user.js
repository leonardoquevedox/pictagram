import axios from 'axios'
import config from '../config'
import authService from './auth'
import utilsService from './utils'

const create = params =>
  axios.post(`${config.baseUrl}/user`, params)

const read = () =>
  axios.get(`${config.baseUrl}/user`, {
    headers: {
      Authorization: authService.getAuthorizationHeader()
    }
  })

const getByEmail = email =>
  axios.get(`${config.baseUrl}/user/${email}`)

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

const requestPassword = params =>
  axios.post(`${config.baseUrl}/request_password`, params, {
    headers: {
      Authorization: authService.getAuthorizationHeader()
    }
  })

const saveCnhPicture = async (base64, onSuccess, onError, onProgress) => {
  try {
    const formData = new FormData()
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

export default { create, read, getByEmail, update, createRiskForm, saveCnhPicture, requestPassword }
