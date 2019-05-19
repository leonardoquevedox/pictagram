/**
 * @license MIT
 * @version 1.1.0
 * @author Trinca
 * @description User controller.
 */

/* disable eslint */
import {
  ON_VIRTUAL_KEYBOARD_SHOW,
  ON_VIRTUAL_KEYBOARD_HIDE,
  CLEAR_KEYBOARD_STATE
} from '../actions/virtualKeyboard'

const initialState = {
  isVisible: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ON_VIRTUAL_KEYBOARD_SHOW:
      return { ...state, isVisible: true }

    case ON_VIRTUAL_KEYBOARD_HIDE:
      return { ...state, isVisible: false }

    case CLEAR_KEYBOARD_STATE:
      return { ...state, isVisible: false }

    default:
      return state
  }
}
