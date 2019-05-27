import {
  CONSULT_PLATE_START,
  CONSULT_PLATE_ERROR,
  CONSULT_PLATE_SUCCESS,
  QUOTE_START,
  QUOTE_ERROR,
  QUOTE_SUCCESS,
  CHECKOUT_START,
  CHECKOUT_ERROR,
  CHECKOUT_SUCCESS,
  SAVE_CHECKOUT
} from '../actions/integration'

const initialState = {
  plateInfo: {},
  quote: {},
  checkout: {},
  savedCheckout: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CONSULT_PLATE_SUCCESS:
      return { ...state, plateInfo: action.data }

    case QUOTE_SUCCESS:
      return { ...state, quote: action.data }

    case CHECKOUT_SUCCESS:
      return { ...state, checkout: action.data }

    case SAVE_CHECKOUT:
      return { ...state, savedCheckout: action.data }

    case CONSULT_PLATE_START:
    case CONSULT_PLATE_ERROR:
    case QUOTE_START:
    case QUOTE_ERROR:
    case CHECKOUT_START:
    case CHECKOUT_ERROR:
    default:
      return state
  }
}
