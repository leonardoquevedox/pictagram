import {
  CREATE_CHECKOUT_START,
  CREATE_CHECKOUT_ERROR,
  CREATE_CHECKOUT_SUCCESS,
  READ_CHECKOUT_START,
  READ_CHECKOUT_ERROR,
  READ_CHECKOUT_SUCCESS,
  SET_CURRENT_CHECKOUT_SUCCESS
} from '../actions/checkout'

const initialState = {
  current: {},
  list: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CHECKOUT_SUCCESS:
      return { ...state, current: action.data }

    case SET_CURRENT_CHECKOUT_SUCCESS:
      return { ...state, current: action.data }

    case READ_CHECKOUT_SUCCESS:
      return { ...state, list: action.data }

    case CREATE_CHECKOUT_START:
    case CREATE_CHECKOUT_ERROR:
    case READ_CHECKOUT_START:
    case READ_CHECKOUT_ERROR:
    default:
      return state
  }
}
