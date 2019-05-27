import {
  CREATE_CREDIT_START,
  CREATE_CREDIT_ERROR,
  CREATE_CREDIT_SUCCESS,
  READ_CREDIT_START,
  READ_CREDIT_ERROR,
  READ_CREDIT_SUCCESS
} from '../actions/credit'

const initialState = {
  current: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CREDIT_SUCCESS:
    case READ_CREDIT_SUCCESS:
      return { ...state, current: action.data }

    case CREATE_CREDIT_START:
    case CREATE_CREDIT_ERROR:
    case READ_CREDIT_START:
    case READ_CREDIT_ERROR:
    default:
      return state
  }
}
