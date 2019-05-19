import virtualKeyboardService from '../services/virtualKeyboard'

/* --------- Watch for Keyboard Changes --------- */
export const CLEAR_KEYBOARD_STATE = 'CLEAR_KEYBOARD_STATE'
export const ON_VIRTUAL_KEYBOARD_SHOW = 'ON_VIRTUAL_KEYBOARD_SHOW'
export const ON_VIRTUAL_KEYBOARD_HIDE = 'ON_VIRTUAL_KEYBOARD_HIDE'

export const onKeyboardShow = () => ({
  type: ON_VIRTUAL_KEYBOARD_SHOW
})

export const onKeyboardHide = () => ({
  type: ON_VIRTUAL_KEYBOARD_HIDE
})

export const clearKeyboardState = () => ({
  type: CLEAR_KEYBOARD_STATE
})

export const watchKeyboardVisibility = () => dispatch => {
  dispatch(clearKeyboardState())
  virtualKeyboardService.watchVisibility(
    () => {
      dispatch(onKeyboardShow())
    },
    () => {
      dispatch(onKeyboardHide())
    }
  )
}
