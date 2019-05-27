import { TOGGLE_INSURANCE_START, TOGGLE_INSURANCE_ERROR, TOGGLE_INSURANCE_SUCCESS } from '../actions/insurance'

const initialState = {
  isEnabled: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_INSURANCE_SUCCESS:
      return { ...state, isEnabled: !state.isEnabled }

    case TOGGLE_INSURANCE_START:
    case TOGGLE_INSURANCE_ERROR:
    default:
      return state
  }
}
