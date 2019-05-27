import checkoutService from '../services/checkout'

/* --------- Create --------- */
export const CREATE_CHECKOUT_START = 'CREATE_CHECKOUT_START'
export const CREATE_CHECKOUT_ERROR = 'CREATE_CHECKOUT_ERROR'
export const CREATE_CHECKOUT_SUCCESS = 'CREATE_CHECKOUT_SUCCESS'

export const createCheckoutStart = () => ({
  type: CREATE_CHECKOUT_START
})

export const createCheckoutError = () => ({
  type: CREATE_CHECKOUT_ERROR
})

export const createCheckoutSuccess = data => ({
  type: CREATE_CHECKOUT_SUCCESS,
  data
})

export const createCheckout = data => dispatch => {
  dispatch(createCheckoutStart())
  return new Promise((resolve, reject) => {
    checkoutService
      .create(data)
      .then(response => {
        dispatch(createCheckoutSuccess(response.data.data))
        resolve(response.data.data)
      })
      .catch(e => {
        dispatch(createCheckoutError(e))
        reject(e)
      })
  })
}

/* --------- Read --------- */
export const READ_CHECKOUT_START = 'READ_CHECKOUT_START'
export const READ_CHECKOUT_ERROR = 'READ_CHECKOUT_ERROR'
export const READ_CHECKOUT_SUCCESS = 'READ_CHECKOUT_SUCCESS'

export const readCheckoutStart = () => ({
  type: READ_CHECKOUT_START
})

export const readCheckoutError = () => ({
  type: READ_CHECKOUT_ERROR
})

export const readCheckoutSuccess = data => ({
  type: READ_CHECKOUT_SUCCESS,
  data
})

export const readCheckout = () => dispatch => {
  dispatch(readCheckoutStart())
  return new Promise((resolve, reject) => {
    checkoutService
      .read()
      .then(response => {
        dispatch(readCheckoutSuccess(response.data.data))
        resolve(response.data.data)
      })
      .catch(e => {
        dispatch(readCheckoutError(e))
        reject(e)
      })
  })
}

/* --------- Set current --------- */
export const SET_CURRENT_CHECKOUT_START = 'SET_CURRENT_CHECKOUT_START'
export const SET_CURRENT_CHECKOUT_ERROR = 'SET_CURRENT_CHECKOUT_ERROR'
export const SET_CURRENT_CHECKOUT_SUCCESS = 'SET_CURRENT_CHECKOUT_SUCCESS'

export const setCurrentCheckoutStart = () => ({
  type: SET_CURRENT_CHECKOUT_START
})

export const setCurrentCheckoutError = () => ({
  type: SET_CURRENT_CHECKOUT_ERROR
})

export const setCurrentCheckoutSuccess = data => ({
  type: SET_CURRENT_CHECKOUT_SUCCESS,
  data
})

export const setCurrentCheckout = checkout => dispatch => {
  dispatch(setCurrentCheckoutSuccess(checkout))
}
