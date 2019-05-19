const KEYBOARD_MIN_SIZE = 100
let heightDifference = 0

const watchVisibility = (onKeyboardShow, onKeyboardHide) => {
  const initialViewHeight = window.innerHeight
  window.addEventListener('resize', () => {
    heightDifference = Math.abs(initialViewHeight - window.innerHeight)
    if (!(heightDifference > 0)) return false
    if (heightDifference > KEYBOARD_MIN_SIZE) {
      onKeyboardHide()
    } else {
      onKeyboardShow()
    }
  })
}

export default { watchVisibility }
