/**
 * @license MIT
 * @version 1.1.0
 * @author Trinca
 * @description UI Actions.
 */

export const OPEN_LOADING_DIALOG = 'OPEN_LOADING_DIALOG'
export const CLOSE_LOADING_DIALOG = 'CLOSE_LOADING_DIALOG'

export const openLoadingDialog = () => ({
  type: OPEN_LOADING_DIALOG
})

export const closeLoadingDialog = () => ({
  type: CLOSE_LOADING_DIALOG
})
