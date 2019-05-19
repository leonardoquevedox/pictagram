import userService from '../services/user'
import authService from '../services/auth'
import cameraService from '../services/camera'

/* --------- Create --------- */
export const CREATE_PROFILE_START = 'CREATE_PROFILE_START'
export const CREATE_PROFILE_ERROR = 'CREATE_PROFILE_ERROR'
export const CREATE_PROFILE_SUCCESS = 'CREATE_PROFILE_SUCCESS'

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
        dispatch(createProfileSuccess(response.data))
        resolve(response.data)
      })
      .catch(e => {
        dispatch(createProfileError(e))
        reject(e)
      })
  })
}

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
        dispatch(readProfileSuccess(response.data))
        resolve(response.data)
      })
      .catch(e => {
        dispatch(readProfileError(e))
        reject(e)
      })
  })
}

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
        dispatch(updateProfileSuccess(response.data))
        resolve(response.data)
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

export const logout = () => dispatch => {
  dispatch(removeProfile())

  return authService.logout()
}

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
        dispatch(createRiskFormSuccess(response.data))
        resolve(response.data)
      })
      .catch(e => {
        dispatch(createRiskFormError(e))
        reject(e)
      })
  })
}

/* --------- Create --------- */
export const TAKE_CNH_PICTURE_START = 'TAKE_CNH_PICTURE_START'
export const TAKE_CNH_PICTURE_ERROR = 'TAKE_CNH_PICTURE_ERROR'
export const TAKE_CNH_PICTURE_SUCCESS = 'TAKE_CNH_PICTURE_SUCCESS'

export const takeCnhPictureStart = () => ({
  type: TAKE_CNH_PICTURE_START
})

export const takeCnhPictureError = () => ({
  type: TAKE_CNH_PICTURE_ERROR
})

export const takeCnhPictureSuccess = data => ({
  type: TAKE_CNH_PICTURE_SUCCESS,
  data
})

export const takeCnhPicture = () => dispatch => {
  dispatch(takeCnhPictureStart())
  return new Promise((resolve, reject) => {
    cameraService
      .takePicture()
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
export const SAVE_CNH_PICTURE_START = 'SAVE_CNH_PICTURE_START'
export const SAVE_CNH_PICTURE_ERROR = 'SAVE_CNH_PICTURE_ERROR'
export const SAVE_CNH_PICTURE_PROGRESS = 'SAVE_CNH_PICTURE_PROGRESS'
export const SAVE_CNH_PICTURE_SUCCESS = 'SAVE_CNH_PICTURE_SUCCESS'

export const saveCnhPictureStart = () => ({
  type: SAVE_CNH_PICTURE_START
})

export const saveCnhPictureError = () => ({
  type: SAVE_CNH_PICTURE_ERROR
})

export const saveCnhPictureSuccess = data => ({
  type: SAVE_CNH_PICTURE_SUCCESS,
  data
})

export const saveCnhPictureProgress = data => ({
  type: SAVE_CNH_PICTURE_PROGRESS,
  data
})

export const saveCnhPicture = data => dispatch => {
  dispatch(saveCnhPictureStart())
  return new Promise((resolve, reject) => {
    userService.saveCnhPicture(
      data,
      response => {
        dispatch(saveCnhPictureSuccess(response.data))
        resolve(response.data)
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
