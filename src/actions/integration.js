import integrationService from '../services/integration'

/* --------- Consult Plate --------- */
export const CONSULT_PLATE_START = 'CONSULT_PLATE_START'
export const CONSULT_PLATE_ERROR = 'CONSULT_PLATE_ERROR'
export const CONSULT_PLATE_SUCCESS = 'CONSULT_PLATE_SUCCESS'

export const consultPlateStart = () => ({
  type: CONSULT_PLATE_START
})

export const consultPlateError = () => ({
  type: CONSULT_PLATE_ERROR
})

export const consultPlateSuccess = data => ({
  type: CONSULT_PLATE_SUCCESS,
  data
})

export const consultPlate = data => dispatch => {
  dispatch(consultPlateStart())
  return new Promise((resolve, reject) => {
    integrationService
      .consultPlate(data)
      .then(response => {
        dispatch(consultPlateSuccess(response.data.data))
        resolve(response.data.data)
      })
      .catch(e => {
        dispatch(consultPlateError(e))
        reject(e)
      })
  })
}

/* --------- Quote --------- */
export const QUOTE_START = 'QUOTE_START'
export const QUOTE_ERROR = 'QUOTE_ERROR'
export const QUOTE_SUCCESS = 'QUOTE_SUCCESS'

export const quoteStart = () => ({
  type: QUOTE_START
})

export const quoteError = () => ({
  type: QUOTE_ERROR
})

export const quoteSuccess = data => ({
  type: QUOTE_SUCCESS,
  data
})

export const quote = data => dispatch => {
  dispatch(quoteStart())
  return new Promise((resolve, reject) => {
    integrationService
      .quote(data)
      .then(response => {
        dispatch(quoteSuccess(response.data.data))
        resolve(response.data.data)
      })
      .catch(e => {
        dispatch(quoteError(e))
        reject(e)
      })
  })
}

/* --------- Checkout --------- */
export const CHECKOUT_START = 'CHECKOUT_START'
export const CHECKOUT_ERROR = 'CHECKOUT_ERROR'
export const CHECKOUT_SUCCESS = 'CHECKOUT_SUCCESS'
export const SAVE_CHECKOUT = 'SAVE_CHECKOUT'

export const checkoutStart = () => ({
  type: CHECKOUT_START
})

export const checkoutError = () => ({
  type: CHECKOUT_ERROR
})

export const checkoutSuccess = data => ({
  type: CHECKOUT_SUCCESS,
  data
})

export const checkout = data => dispatch => {
  dispatch(checkoutStart())
  return new Promise((resolve, reject) => {
    integrationService
      .checkout(data)
      .then(response => {
        dispatch(checkoutSuccess(response.data.data))
        resolve(response.data.data)
      })
      .catch(e => {
        dispatch(checkoutError(e))
        reject(e)
      })
  })
}

export const saveCheckout = data => dispatch =>
  new Promise(resolve => {
    dispatch({ type: SAVE_CHECKOUT, data })
    resolve(data)
  })
