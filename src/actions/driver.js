import userService from '../services/user'
import authService from '../services/auth'

/* --------- Create --------- */
export const CREATE_DRIVER_START = 'CREATE_DRIVER_START'
export const CREATE_DRIVER_ERROR = 'CREATE_DRIVER_ERROR'
export const CREATE_DRIVER_SUCCESS = 'CREATE_DRIVER_SUCCESS'

export const createDriverStart = () => ({
  type: CREATE_DRIVER_START
})

export const createDriverError = () => ({
  type: CREATE_DRIVER_ERROR
})

export const createDriverSuccess = data => ({
  type: CREATE_DRIVER_SUCCESS,
  data
})

export const createDriver = data => dispatch => {
  dispatch(createDriverStart())
  return new Promise((resolve, reject) => {
    userService
      .create(data)
      .then(response => {
        dispatch(createDriverSuccess(response.data))
        resolve(response.data)
      })
      .catch(e => {
        dispatch(createDriverError(e))
        reject(e)
      })
  })
}

/* --------- Read --------- */
export const READ_DRIVER_START = 'READ_DRIVER_START'
export const READ_DRIVER_ERROR = 'READ_DRIVER_ERROR'
export const READ_DRIVER_SUCCESS = 'READ_DRIVER_SUCCESS'

export const readDriverStart = () => ({
  type: READ_DRIVER_START
})

export const readDriverError = () => ({
  type: READ_DRIVER_ERROR
})

export const readDriverSuccess = data => ({
  type: READ_DRIVER_SUCCESS,
  data
})

export const readDriver = () => dispatch => {
  dispatch(readDriverStart())
  return new Promise((resolve, reject) => {
    userService
      .read()
      .then(response => {
        dispatch(readDriverSuccess(response.data))
        resolve(response.data)
      })
      .catch(e => {
        dispatch(readDriverError(e))
        reject(e)
      })
  })
}

/* --------- Update --------- */
export const UPDATE_DRIVER_START = 'UPDATE_DRIVER_START'
export const UPDATE_DRIVER_ERROR = 'UPDATE_DRIVER_ERROR'
export const UPDATE_DRIVER_SUCCESS = 'UPDATE_DRIVER_SUCCESS'

export const updateDriverStart = () => ({
  type: UPDATE_DRIVER_START
})

export const updateDriverError = () => ({
  type: UPDATE_DRIVER_ERROR
})

export const updateDriverSuccess = data => ({
  type: UPDATE_DRIVER_SUCCESS,
  data
})

export const updateDriver = data => dispatch => {
  dispatch(updateDriverStart())
  return new Promise((resolve, reject) => {
    userService
      .update(data)
      .then(response => {
        dispatch(updateDriverSuccess(response.data))
        resolve(response.data)
      })
      .catch(e => {
        dispatch(updateDriverError(e))
        reject(e)
      })
  })
}

/* --------- Delete --------- */
export const REMOVE_DRIVER = 'REMOVE_DRIVER'

export const removeDriver = () => ({
  type: REMOVE_DRIVER
})

export const logout = () => dispatch => {
  dispatch(removeDriver())

  return authService.logout()
}