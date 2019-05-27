const watchVisibility = (onKeyboardShow, onKeyboardHide) => {
  window.addEventListener('keyboardDidHide', () => {
    onKeyboardHide()
  })
  window.addEventListener('keyboardDidShow', event => {
    onKeyboardShow()
  })
}

export default { watchVisibility }
