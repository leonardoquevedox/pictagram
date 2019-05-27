import {
  FIND_NEARBY_DEVICES_START,
  FIND_NEARBY_DEVICES_ERROR,
  FIND_NEARBY_DEVICES_SUCCESS,
  CLEAR_NEARBY_DEVICES_START,
  CLEAR_NEARBY_DEVICES_ERROR,
  CLEAR_NEARBY_DEVICES_SUCCESS,
  SELECT_DEVICE_START,
  SELECT_DEVICE_ERROR,
  SELECT_DEVICE_SUCCESS,
  ADD_DEVICE_START,
  ADD_DEVICE_ERROR,
  ADD_DEVICE_SUCCESS,
  ON_INSTANT_DEVICE_PROXIMITY,
  CLEAR_DEVICE_PROXIMITY,
  SET_USER_DEVICES
} from '../actions/device'

const initialState = {
  nearby: [],
  added: [],
  selected: {},
  isNearby: false,
  isConnecting: false,
  connected: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FIND_NEARBY_DEVICES_SUCCESS:
      return { ...state, nearby: action.devices }

    case CLEAR_NEARBY_DEVICES_SUCCESS:
      return { ...state, nearby: [], connected: {} }

    case SELECT_DEVICE_SUCCESS:
      return { ...state, selected: action.device }

    case ADD_DEVICE_SUCCESS:
      return { ...state, connected: (state.nearby || []).concat([action.device]) }

    case SET_USER_DEVICES:
      return { ...state, added: action.data }

    case ON_INSTANT_DEVICE_PROXIMITY:
      {
        const isUserDevice = state.added.filter(device => action.device.id === device.uuid)[0]
        console.log(isUserDevice)
        if (isUserDevice) return { ...state, isNearby: true, connected: action.device }
      }
      return state

    case CLEAR_DEVICE_PROXIMITY:
      return { ...state, isNearby: false }

    case FIND_NEARBY_DEVICES_START:
    case FIND_NEARBY_DEVICES_ERROR:
    case CLEAR_NEARBY_DEVICES_START:
    case CLEAR_NEARBY_DEVICES_ERROR:
    case SELECT_DEVICE_START:
    case SELECT_DEVICE_ERROR:
    case ADD_DEVICE_START:
    case ADD_DEVICE_ERROR:
    default:
      return state
  }
}
