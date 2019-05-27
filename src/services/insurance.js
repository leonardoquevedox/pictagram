/**
 * @license MIT
 * @version 1.1.0
 * @author Trinca
 * @description Insurance service.
 */

import localStorageService from './localstorage'
import geolocationService from './geolocation'
import deviceService from './device'
import vehicleService from './vehicle'
import authService from './auth'

/* const keepRunningOnBackground = () => {
  if (window.cordova && window.cordova.plugins) {
    const { backgroundMode } = window.cordova.plugins
    if (backgroundMode) backgroundMode.enable()
  }
} */

const getInsuranceState = () => {
  const state = localStorageService.getState()
  if (state.insurance) {
    const insuranceState = JSON.parse(state.insurance)
    return insuranceState || {}
  }
  return {}
}

const initialize = () => {
  const GEOLOCATION_REFRESH_INTERVAL_IN_SECONDS = 30
  setInterval(async () => {
    if (authService.isLoggedIn()) {
      const position = await geolocationService.getFromGPS()
      const beacon = deviceService.getConnectedDevice()
      const vehicle = vehicleService.getCurrentVehicle()
      const insurance = getInsuranceState()
      if (beacon && beacon.id && insurance.isEnabled) {
        geolocationService.addToLocalstorage({
          device: beacon.id,
          vehicle: vehicle.id,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
        geolocationService.sync()
      }
    }
  }, GEOLOCATION_REFRESH_INTERVAL_IN_SECONDS * 1000)
  // keepRunningOnBackground()
}

export default { initialize }
