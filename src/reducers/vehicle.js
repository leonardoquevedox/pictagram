import {
  CREATE_VEHICLE_START,
  CREATE_VEHICLE_ERROR,
  CREATE_VEHICLE_SUCCESS,
  READ_VEHICLE_START,
  READ_VEHICLE_ERROR,
  READ_VEHICLE_SUCCESS,
  UPDATE_VEHICLE_START,
  UPDATE_VEHICLE_ERROR,
  UPDATE_VEHICLE_SUCCESS,
  STOP_RECORDING_360_VIDEO_SUCCESS
} from '../actions/vehicle'

const initialState = {
  video: {},
  current: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_VEHICLE_SUCCESS:
      return { ...state, current: action.data }

    case READ_VEHICLE_SUCCESS:
      return { ...state, current: action.data }

    case UPDATE_VEHICLE_SUCCESS:
      return { ...state, current: action.data }

    case STOP_RECORDING_360_VIDEO_SUCCESS:
      return { ...state, video: action.data }

    case CREATE_VEHICLE_START:
    case CREATE_VEHICLE_ERROR:
    case READ_VEHICLE_START:
    case READ_VEHICLE_ERROR:
    case UPDATE_VEHICLE_START:
    case UPDATE_VEHICLE_ERROR:
    default:
      return state
  }
}
