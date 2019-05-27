import {
  CHECK_BLUETOOTH_STATE_START,
  CHECK_BLUETOOTH_STATE_ERROR,
  CHECK_BLUETOOTH_STATE_SUCCESS,
  ON_BLUETOOTH_STATE_CHANGE_START,
  ON_BLUETOOTH_STATE_CHANGE_ERROR,
  ON_BLUETOOTH_STATE_CHANGE_SUCCESS,
  ENABLE_BLUETOOTH_START,
  ENABLE_BLUETOOTH_ERROR,
  CHECK_GPS_STATE_START,
  CHECK_GPS_STATE_ERROR,
  CHECK_GPS_STATE_SUCCESS,
  ON_GPS_STATE_CHANGE_START,
  ON_GPS_STATE_CHANGE_ERROR,
  ON_GPS_STATE_CHANGE_SUCCESS
} from '../actions/hardware'

const initialState = {
  bluetooth: { isEnabling: false, isEnabled: true },
  gps: { isEnabled: true }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CHECK_BLUETOOTH_STATE_SUCCESS:
      return { ...state, bluetooth: { ...state.bluetooth, isEnabled: action.isEnabled } }

    case ON_BLUETOOTH_STATE_CHANGE_START:
      return { ...state, bluetooth: { ...state.bluetooth, isEnabling: true } }

    case ON_BLUETOOTH_STATE_CHANGE_SUCCESS:
      return {
        ...state,
        bluetooth: { ...state.bluetooth, isEnabling: false, isEnabled: action.isEnabled }
      }

    case ON_BLUETOOTH_STATE_CHANGE_ERROR:
      return { ...state, bluetooth: { ...state.bluetooth, isEnabling: false } }

    case CHECK_GPS_STATE_SUCCESS:
      return { ...state, gps: { ...state.gps, isEnabled: action.isEnabled } }

    case ON_GPS_STATE_CHANGE_SUCCESS:
      return { ...state, gps: { ...state.gps, isEnabled: action.isEnabled } }

    case CHECK_BLUETOOTH_STATE_START:
    case CHECK_BLUETOOTH_STATE_ERROR:
    case ENABLE_BLUETOOTH_START:
    case ENABLE_BLUETOOTH_ERROR:
    case CHECK_GPS_STATE_START:
    case CHECK_GPS_STATE_ERROR:
    case ON_GPS_STATE_CHANGE_START:
    case ON_GPS_STATE_CHANGE_ERROR:
    default:
      return state
  }
}
