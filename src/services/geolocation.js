/**
 * @license MIT
 * @version 1.1.0
 * @author Trinca
 * @description User controller.
 */

import { Plugins } from '@capacitor/core'
import axios from 'axios'
import config from '../config'
import authService from './auth'
import localStorageService from './localstorage'

const { Geolocation } = Plugins

const upload = params =>
  axios.post(`${config.baseUrl}/geolocation`, params, {
    headers: {
      Authorization: authService.getAuthorizationHeader()
    }
  })

const getFromGPS = () =>
  new Promise(async (resolve, reject) => {
    try {
      const coordinates = await Geolocation.getCurrentPosition({
        maximumAge: 60000,
        timeout: 5000,
        enableHighAccuracy: true
      })
      resolve(coordinates)
    } catch (e) {
      reject(e)
    }
  })

const getLocalStorageList = () => {
  const state = localStorageService.getState()
  if (state.geolocation) {
    const geolocationState = JSON.parse(state.geolocation)
    return geolocationState.list || []
  }
  return []
}

const setLocalStorageList = list => {
  const state = localStorageService.getState()
  localStorageService.setState({ ...state, list })
}

const add = location => {
  const geolocationList = getLocalStorageList()
  geolocationList.push(location)
  setLocalStorageList(geolocationList)
}

export default { getFromGPS, add, upload }
