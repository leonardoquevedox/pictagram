import axios from 'axios'
import config from '../config'
import authService from './auth'
import localStorageService from './localstorage'

const create = params =>
  axios.post(`${config.baseUrl}/device`, params, {
    headers: {
      Authorization: authService.getAuthorizationHeader()
    }
  })

const read = () =>
  axios.get(`${config.baseUrl}/device`, {
    headers: {
      Authorization: authService.getAuthorizationHeader()
    }
  })

const update = params =>
  axios.put(`${config.baseUrl}/device`, params, {
    headers: {
      Authorization: authService.getAuthorizationHeader()
    }
  })

const remove = params =>
  axios.delete(`${config.baseUrl}/device`, params, {
    headers: {
      Authorization: authService.getAuthorizationHeader()
    }
  })

const list = () =>
  axios.get(`${config.baseUrl}/devices`, {
    headers: {
      Authorization: authService.getAuthorizationHeader()
    }
  })

const getConnectedDevice = () => {
  const state = localStorageService.getState()
  if (state.device) {
    const deviceState = JSON.parse(state.device)
    return deviceState.connected || {}
  }
  return {}
}

export default { create, read, update, remove, list, getConnectedDevice }
