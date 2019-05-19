import { UPDATE_RIDE_IN_CREATION_START } from '../actions/ride'

const initialState = {
  inCreation: {},
  current: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_RIDE_IN_CREATION_START: {
      const updated = Object.assign(state.inCreation, action.data)
      return { ...state, inCreation: updated }
    }

    default:
      return state
  }
}
