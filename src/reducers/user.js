import {
  CREATE_PROFILE_START,
  CREATE_PROFILE_ERROR,
  CREATE_PROFILE_SUCCESS,
  READ_PROFILE_START,
  READ_PROFILE_ERROR,
  READ_PROFILE_SUCCESS,
  UPDATE_PROFILE_START,
  UPDATE_PROFILE_ERROR,
  UPDATE_PROFILE_SUCCESS,
  AUTHENTICATE_START,
  AUTHENTICATE_ERROR,
  AUTHENTICATE_SUCCESS,
  CREATE_RISK_FORM_START,
  CREATE_RISK_FORM_ERROR,
  CREATE_RISK_FORM_SUCCESS,
  TAKE_CNH_PICTURE_START,
  TAKE_CNH_PICTURE_ERROR,
  TAKE_CNH_PICTURE_SUCCESS,
  SAVE_CNH_PICTURE_START,
  SAVE_CNH_PICTURE_ERROR,
  SAVE_CNH_PICTURE_SUCCESS,
  REMOVE_PROFILE
} from '../actions/user'

const initialState = {
  profile: {},
  cnhPicture: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PROFILE_SUCCESS:
      return { ...state, profile: action.data }

    case READ_PROFILE_SUCCESS:
      return { ...state, profile: action.data }

    case UPDATE_PROFILE_SUCCESS:
      return { ...state, profile: action.data }

    case AUTHENTICATE_SUCCESS:
      return { ...state, profile: action.data }

    case REMOVE_PROFILE:
      return { ...state, profile: {} }

    case TAKE_CNH_PICTURE_SUCCESS:
      return { ...state, cnhPicture: action.data }

    case SAVE_CNH_PICTURE_SUCCESS:
      return { ...state, cnhPicture: '' }

    case CREATE_PROFILE_START:
    case CREATE_PROFILE_ERROR:
    case READ_PROFILE_START:
    case READ_PROFILE_ERROR:
    case UPDATE_PROFILE_START:
    case UPDATE_PROFILE_ERROR:
    case AUTHENTICATE_START:
    case AUTHENTICATE_ERROR:
    case CREATE_RISK_FORM_START:
    case CREATE_RISK_FORM_ERROR:
    case CREATE_RISK_FORM_SUCCESS:
    case TAKE_CNH_PICTURE_START:
    case TAKE_CNH_PICTURE_ERROR:
    case SAVE_CNH_PICTURE_START:
    case SAVE_CNH_PICTURE_ERROR:
    default:
      return state
  }
}
