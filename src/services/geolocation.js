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
import { INSTANT_LOCAL_GEOLOCATIONS } from '../config/consts'

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

const getLocalStorageList = () =>
  JSON.parse(localStorage.getItem(INSTANT_LOCAL_GEOLOCATIONS) || '[]')

const setLocalStorageList = list => {
  if (list && list.length) localStorage.setItem(INSTANT_LOCAL_GEOLOCATIONS, JSON.stringify(list))
}

const addToLocalstorage = location => {
  const geolocationList = getLocalStorageList()
  geolocationList.push({ ...location, timestamp: new Date().toISOString() })
  setLocalStorageList(geolocationList)
}

const removeFromLocalstorage = location => {
  const geolocationList = getLocalStorageList()
  const locationIndex = geolocationList.findIndex(x => x.timestamp === location.timestamp)
  geolocationList.splice(locationIndex, 1)
  setLocalStorageList(geolocationList)
}

const sync = () => {
  const geolocationList = getLocalStorageList()
  if (navigator.onLine) {
    geolocationList.map(
      currentLocation =>
        new Promise(async resolveUpload => {
          try {
            const response = await upload(currentLocation)
            removeFromLocalstorage(currentLocation)
            resolveUpload(response)
          } catch (e) {
            console.log(e)
          }
        })
    )
  }
}

export default { getFromGPS, getLocalStorageList, addToLocalstorage, sync }
