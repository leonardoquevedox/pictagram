import authService from '../services/auth'

/* --------- Authenticate --------- */
export const AUTHENTICATE_START = 'AUTHENTICATE_START'
export const AUTHENTICATE_ERROR = 'AUTHENTICATE_ERROR'
export const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS'

export const authenticateStart = () => ({
  type: AUTHENTICATE_START
})

export const authenticateError = () => ({
  type: AUTHENTICATE_ERROR
})

export const authenticateSuccess = data => ({
  type: AUTHENTICATE_SUCCESS,
  data
})

export const authenticate = data => dispatch => {
  dispatch(authenticateStart())
  return new Promise((resolve, reject) => {
    authService
      .login(data)
      .then(response => {
        dispatch(authenticateSuccess(response.data))
        resolve(response.data)
      })
      .catch(e => {
        dispatch(authenticateError(e))
        reject(e)
      })
  })
}

/* --------- Logout --------- */
export const REMOVE_PROFILE = 'REMOVE_PROFILE'

export const removeProfile = () => ({
  type: REMOVE_PROFILE
})

export const logout = () => dispatch => {
  dispatch(removeProfile())

  return authService.logout()
}