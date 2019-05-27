import userService from '../services/user'
import authService from '../services/auth'
import cameraService from '../services/camera'

/* --------- Create --------- */
export const CREATE_PROFILE_START = 'CREATE_PROFILE_START'
export const CREATE_PROFILE_ERROR = 'CREATE_PROFILE_ERROR'
export const CREATE_PROFILE_SUCCESS = 'CREATE_PROFILE_SUCCESS'
export const SAVE_PROFILE = 'SAVE_PROFILE'

export const createProfileStart = () => ({
  type: CREATE_PROFILE_START
})

export const createProfileError = () => ({
  type: CREATE_PROFILE_ERROR
})

export const createProfileSuccess = data => ({
  type: CREATE_PROFILE_SUCCESS,
  data
})

export const createProfile = data => dispatch => {
  dispatch(createProfileStart())
  return new Promise((resolve, reject) => {
    userService
      .create(data)
      .then(response => {
        dispatch(createProfileSuccess(response.data.data))
        resolve(response.data.data)
      })
      .catch(e => {
        dispatch(createProfileError(e))
        reject(e)
      })
  })
}

export const saveProfile = data => dispatch =>
  new Promise(resolve => {
    dispatch({ type: SAVE_PROFILE, data })
    resolve(data)
  })

/* --------- Read --------- */
export const READ_PROFILE_START = 'READ_PROFILE_START'
export const READ_PROFILE_ERROR = 'READ_PROFILE_ERROR'
export const READ_PROFILE_SUCCESS = 'READ_PROFILE_SUCCESS'

export const readProfileStart = () => ({
  type: READ_PROFILE_START
})

export const readProfileError = () => ({
  type: READ_PROFILE_ERROR
})

export const readProfileSuccess = data => ({
  type: READ_PROFILE_SUCCESS,
  data
})

export const readProfile = () => dispatch => {
  dispatch(readProfileStart())
  return new Promise((resolve, reject) => {
    userService
      .read()
      .then(response => {
        dispatch(readProfileSuccess(response.data.data))
        resolve(response.data.data)
      })
      .catch(e => {
        dispatch(readProfileError(e))
        reject(e)
      })
  })
}

export const verifyEmail = email => dispatch =>
  userService.getByEmail(email).then(response => response.data.data)

/* --------- Update --------- */
export const UPDATE_PROFILE_START = 'UPDATE_PROFILE_START'
export const UPDATE_PROFILE_ERROR = 'UPDATE_PROFILE_ERROR'
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS'

export const updateProfileStart = () => ({
  type: UPDATE_PROFILE_START
})

export const updateProfileError = () => ({
  type: UPDATE_PROFILE_ERROR
})

export const updateProfileSuccess = data => ({
  type: UPDATE_PROFILE_SUCCESS,
  data
})

export const updateProfile = data => dispatch => {
  dispatch(updateProfileStart())
  return new Promise((resolve, reject) => {
    userService
      .update(data)
      .then(response => {
        dispatch(updateProfileSuccess(data))
        resolve(data)
      })
      .catch(e => {
        dispatch(updateProfileError(e))
        reject(e)
      })
  })
}

/* --------- Delete --------- */
export const REMOVE_PROFILE = 'REMOVE_PROFILE'

export const removeProfile = () => ({
  type: REMOVE_PROFILE
})

export const logout = () => dispatch => authService.logout()

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
        dispatch(authenticateSuccess(response.data.data))
        resolve(response.data.data)
      })
      .catch(e => {
        dispatch(authenticateError(e))
        reject(e)
      })
  })
}

/* --------- Create --------- */
export const CREATE_RISK_FORM_START = 'CREATE_RISK_FORM_START'
export const CREATE_RISK_FORM_ERROR = 'CREATE_RISK_FORM_ERROR'
export const CREATE_RISK_FORM_SUCCESS = 'CREATE_RISK_FORM_SUCCESS'

export const createRiskFormStart = () => ({
  type: CREATE_RISK_FORM_START
})

export const createRiskFormError = () => ({
  type: CREATE_RISK_FORM_ERROR
})

export const createRiskFormSuccess = data => ({
  type: CREATE_RISK_FORM_SUCCESS,
  data
})

export const createRiskForm = data => dispatch => {
  dispatch(createRiskFormStart())
  return new Promise((resolve, reject) => {
    userService
      .createRiskForm(data)
      .then(response => {
        dispatch(createRiskFormSuccess(response.data.data))
        resolve(response.data.data)
      })
      .catch(e => {
        dispatch(createRiskFormError(e))
        reject(e)
      })
  })
}

/* --------- Create --------- */
export const START_CURRENT_PICTURE_PREVIEW_START = 'START_CURRENT_PICTURE_PREVIEW_START'
export const START_CURRENT_PICTURE_PREVIEW_ERROR = 'START_CURRENT_PICTURE_PREVIEW_ERROR'
export const START_CURRENT_PICTURE_PREVIEW_SUCCESS = 'START_CURRENT_PICTURE_PREVIEW_SUCCESS'

export const startCnhPicturePreviewStart = () => ({
  type: START_CURRENT_PICTURE_PREVIEW_START
})

export const startCnhPicturePreviewError = () => ({
  type: START_CURRENT_PICTURE_PREVIEW_ERROR
})

export const startCnhPicturePreviewSuccess = data => ({
  type: START_CURRENT_PICTURE_PREVIEW_SUCCESS,
  data
})

export const startCnhPicturePreview = videoElement => dispatch => {
  dispatch(startCnhPicturePreviewStart())
  return new Promise((resolve, reject) => {
    cameraService
      .startLivePreview(videoElement)
      .then(() => {
        dispatch(startCnhPicturePreviewSuccess())
        resolve()
      })
      .catch(e => {
        dispatch(startCnhPicturePreviewError(e))
        reject(e)
      })
  })
}

/* --------- Create --------- */
export const TAKE_CURRENT_PICTURE_START = 'TAKE_CURRENT_PICTURE_START'
export const TAKE_CURRENT_PICTURE_ERROR = 'TAKE_CURRENT_PICTURE_ERROR'
export const TAKE_CURRENT_PICTURE_SUCCESS = 'TAKE_CURRENT_PICTURE_SUCCESS'

export const takeCnhPictureStart = () => ({
  type: TAKE_CURRENT_PICTURE_START
})

export const takeCnhPictureError = () => ({
  type: TAKE_CURRENT_PICTURE_ERROR
})

export const takeCnhPictureSuccess = data => ({
  type: TAKE_CURRENT_PICTURE_SUCCESS,
  data
})

export const takeCnhPicture = videoElement => dispatch => {
  dispatch(takeCnhPictureStart())
  return new Promise((resolve, reject) => {
    cameraService
      .takePicture(videoElement)
      .then(picture => {
        dispatch(takeCnhPictureSuccess(picture))
        resolve(picture)
      })
      .catch(e => {
        dispatch(takeCnhPictureError(e))
        console.log(e)
        reject(e)
      })
  })
}

/* --------- Create --------- */
export const SAVE_CURRENT_PICTURE_START = 'SAVE_CURRENT_PICTURE_START'
export const SAVE_CURRENT_PICTURE_ERROR = 'SAVE_CURRENT_PICTURE_ERROR'
export const SAVE_CURRENT_PICTURE_PROGRESS = 'SAVE_CURRENT_PICTURE_PROGRESS'
export const SAVE_CURRENT_PICTURE_SUCCESS = 'SAVE_CURRENT_PICTURE_SUCCESS'

export const saveCnhPictureStart = () => ({
  type: SAVE_CURRENT_PICTURE_START
})

export const saveCnhPictureError = () => ({
  type: SAVE_CURRENT_PICTURE_ERROR
})

export const saveCnhPictureSuccess = data => ({
  type: SAVE_CURRENT_PICTURE_SUCCESS,
  data
})

export const saveCnhPictureProgress = data => ({
  type: SAVE_CURRENT_PICTURE_PROGRESS,
  data
})

export const saveCnhPicture = data => dispatch => {
  dispatch(saveCnhPictureStart())
  return new Promise((resolve, reject) => {
    userService.saveCnhPicture(
      data,
      response => {
        dispatch(saveCnhPictureSuccess(response.data.data))
        resolve(response.data.data)
      },
      e => {
        dispatch(saveCnhPictureError(e))
        reject(e)
      },
      progress => {
        dispatch(saveCnhPictureProgress())
      }
    )
  })
}

export const REQUEST_NEW_PASSWORD_START = 'REQUEST_NEW_PASSWORD_START'
export const REQUEST_NEW_PASSWORD_ERROR = 'REQUEST_NEW_PASSWORD_ERROR'
export const REQUEST_NEW_PASSWORD_SUCCESS = 'REQUEST_NEW_PASSWORD_SUCCESS'

export const requestNewPasswordStart = () => ({
  type: REQUEST_NEW_PASSWORD_START
})

export const requestNewPasswordError = () => ({
  type: REQUEST_NEW_PASSWORD_ERROR
})

export const requestNewPasswordSuccess = data => ({
  type: REQUEST_NEW_PASSWORD_SUCCESS,
  data
})

export const requestNewPassword = data => dispatch => {
  dispatch(requestNewPasswordStart())
  return userService
    .requestPassword(data)
    .then(response => {
      dispatch(requestNewPasswordSuccess(response.data.data))
      return response.data.data
    })
    .catch(e => {
      dispatch(requestNewPasswordError())
    })
}
