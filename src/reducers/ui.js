/**
 * @license MIT
 * @version 1.1.0
 * @author Trinca
 * @description User controller.
 */

/* disable eslint */
import { OPEN_LOADING_DIALOG, CLOSE_LOADING_DIALOG } from '../actions/ui'

const initialState = {
  isLoadingDialogOpen: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_LOADING_DIALOG:
      return { ...state, isLoadingDialogOpen: true }
    case CLOSE_LOADING_DIALOG:
      return { ...state, isLoadingDialogOpen: false }
    default:
      return state
  }
}
