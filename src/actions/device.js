import deviceService from '../services/device'
import beaconService from '../services/beacon'

export const FIND_NEARBY_DEVICES_START = 'FIND_NEARBY_DEVICES_START'
export const FIND_NEARBY_DEVICES_ERROR = 'FIND_NEARBY_DEVICES_ERROR'
export const FIND_NEARBY_DEVICES_SUCCESS = 'FIND_NEARBY_DEVICES_SUCCESS'

export const findNearbyDevicesStart = () => ({
  type: FIND_NEARBY_DEVICES_START
})

export const findNearbyDevicesError = () => ({
  type: FIND_NEARBY_DEVICES_ERROR
})

export const findNearbyDevicesSuccess = devices => ({
  type: FIND_NEARBY_DEVICES_SUCCESS,
  devices
})

export const findNearbyDevices = () => dispatch => {
  dispatch(findNearbyDevicesStart())
  return new Promise(resolve => {
    const SECONDS_TO_PERFORM_SEARCH = 10
    const devices = []
    beaconService.startScan(device => {
      devices.push(device)
    })
    setTimeout(() => {
      beaconService.stopScan()
      dispatch(findNearbyDevicesSuccess(devices))
      resolve(devices)
    }, SECONDS_TO_PERFORM_SEARCH * 1000)
  })
}

export const CLEAR_NEARBY_DEVICES_START = 'CLEAR_NEARBY_DEVICES_START'
export const CLEAR_NEARBY_DEVICES_ERROR = 'CLEAR_NEARBY_DEVICES_ERROR'
export const CLEAR_NEARBY_DEVICES_SUCCESS = 'CLEAR_NEARBY_DEVICES_SUCCESS'

export const clearNearbyDevicesStart = () => ({
  type: CLEAR_NEARBY_DEVICES_START
})

export const clearNearbyDevicesError = () => ({
  type: CLEAR_NEARBY_DEVICES_ERROR
})

export const clearNearbyDevicesSuccess = () => ({
  type: CLEAR_NEARBY_DEVICES_SUCCESS
})

export const clearNearbyDevices = () => dispatch => {
  dispatch(clearNearbyDevicesStart())
  dispatch(clearNearbyDevicesSuccess())
}

export const SELECT_DEVICE_START = 'SELECT_DEVICE_START'
export const SELECT_DEVICE_ERROR = 'SELECT_DEVICE_ERROR'
export const SELECT_DEVICE_SUCCESS = 'SELECT_DEVICE_SUCCESS'

export const selectDeviceStart = () => ({
  type: SELECT_DEVICE_START
})

export const selectDeviceError = () => ({
  type: SELECT_DEVICE_ERROR
})

export const selectDeviceSuccess = device => ({
  type: SELECT_DEVICE_SUCCESS,
  device
})

export const selectDevice = device => dispatch => {
  dispatch(selectDeviceStart(device))
  dispatch(selectDeviceSuccess(device))
}

export const ADD_DEVICE_START = 'ADD_DEVICE_START'
export const ADD_DEVICE_ERROR = 'ADD_DEVICE_ERROR'
export const ADD_DEVICE_SUCCESS = 'ADD_DEVICE_SUCCESS'

export const addDeviceStart = () => ({
  type: ADD_DEVICE_START
})

export const addDeviceError = () => ({
  type: ADD_DEVICE_ERROR
})

export const addDeviceSuccess = device => ({
  type: ADD_DEVICE_SUCCESS,
  device
})

export const addDevice = device => dispatch => {
  dispatch(addDeviceStart(device))
  return new Promise((resolve, reject) => {
    deviceService
      .create(device)
      .then(() => {
        dispatch(addDeviceSuccess(device))
        resolve(device)
      })
      .catch(e => {
        dispatch(addDeviceError(e))
        reject(e)
      })
  })
}

export const FETCH_USER_DEVICES_START = 'FETCH_USER_DEVICES_START'
export const FETCH_USER_DEVICES_ERROR = 'FETCH_USER_DEVICES_ERROR'
export const SET_USER_DEVICES = 'SET_USER_DEVICES'

export const fetchUserDevicesStart = () => ({
  type: FETCH_USER_DEVICES_START
})

export const fetchUserDevicesError = () => ({
  type: FETCH_USER_DEVICES_ERROR
})

export const setUserDevices = data => ({
  type: SET_USER_DEVICES,
  data
})

export const fetchUserDevices = () => dispatch => {
  dispatch(fetchUserDevicesStart())
  return new Promise((resolve, reject) => {
    deviceService
      .list()
      .then(response => {
        const devices = response.data.data || []
        dispatch(setUserDevices(devices))
        resolve(devices)
      })
      .catch(e => {
        dispatch(fetchUserDevicesError(e))
        reject(e)
      })
  })
}

export const WATCH_DEVICE_PROXIMITY_START = 'WATCH_DEVICE_PROXIMITY_START'
export const WATCH_DEVICE_PROXIMITY_ERROR = 'WATCH_DEVICE_PROXIMITY_ERROR'
export const WATCH_DEVICE_PROXIMITY_SUCCESS = 'WATCH_DEVICE_PROXIMITY_SUCCESS'

export const watchDeviceProximityStart = () => ({
  type: WATCH_DEVICE_PROXIMITY_START
})

export const watchDeviceProximityError = () => ({
  type: WATCH_DEVICE_PROXIMITY_ERROR
})

export const watchDeviceProximitySuccess = () => ({
  type: WATCH_DEVICE_PROXIMITY_SUCCESS
})

export const ON_INSTANT_DEVICE_PROXIMITY = 'ON_INSTANT_DEVICE_PROXIMITY'
export const CLEAR_DEVICE_PROXIMITY = 'CLEAR_DEVICE_PROXIMITY'

export const onInstantDeviceProximity = device => ({
  type: ON_INSTANT_DEVICE_PROXIMITY,
  device
})

export const clearDeviceProximity = () => ({
  type: CLEAR_DEVICE_PROXIMITY
})

export const checkDeviceProximity = () => dispatch =>
  new Promise(async (resolve) => {
    try {
      const devices = await dispatch(findNearbyDevices())
      devices.forEach(device => {
        // if (beaconService.isInstant(device)) dispatch(onInstantDeviceProximity(device))
        dispatch(onInstantDeviceProximity(device))
      })
      resolve()
    } catch (e) {
      console.log(e)
      resolve()
    }
  })

export const watchDeviceProximity = () => dispatch => {
  const MINUTES_TO_REFERESH_BEACON_PROXIMITY = 3
  dispatch(clearDeviceProximity())
  return new Promise(resolve => {
    setInterval(async () => {
      dispatch(checkDeviceProximity())
    }, MINUTES_TO_REFERESH_BEACON_PROXIMITY * 1000 * 60)
  })
}
