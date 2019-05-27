import creditService from '../services/credit'

/* --------- Create --------- */
export const CREATE_CREDIT_START = 'CREATE_CREDIT_START'
export const CREATE_CREDIT_ERROR = 'CREATE_CREDIT_ERROR'
export const CREATE_CREDIT_SUCCESS = 'CREATE_CREDIT_SUCCESS'

export const createCreditStart = () => ({
  type: CREATE_CREDIT_START
})

export const createCreditError = () => ({
  type: CREATE_CREDIT_ERROR
})

export const createCreditSuccess = data => ({
  type: CREATE_CREDIT_SUCCESS,
  data
})

export const createCredit = data => dispatch => {
  dispatch(createCreditStart())
  return new Promise((resolve, reject) => {
    creditService
      .addCredit(data)
      .then(response => {
        dispatch(createCreditSuccess(response.data.data))
        resolve(response.data.data)
      })
      .catch(e => {
        dispatch(createCreditError(e))
        reject(e)
      })
  })
}

/* --------- Read --------- */
export const READ_CREDIT_START = 'READ_CREDIT_START'
export const READ_CREDIT_ERROR = 'READ_CREDIT_ERROR'
export const READ_CREDIT_SUCCESS = 'READ_CREDIT_SUCCESS'

export const readCreditStart = () => ({
  type: READ_CREDIT_START
})

export const readCreditError = () => ({
  type: READ_CREDIT_ERROR
})

export const readCreditSuccess = data => ({
  type: READ_CREDIT_SUCCESS,
  data
})

export const readCredit = () => dispatch => {
  dispatch(readCreditStart())
  return new Promise((resolve, reject) => {
    creditService
      .read()
      .then(response => {
        dispatch(readCreditSuccess(response.data.data))
        resolve(response.data.data)
      })
      .catch(e => {
        dispatch(readCreditError(e))
        reject(e)
      })
  })
}

