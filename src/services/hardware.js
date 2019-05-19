/**
 * @license MIT
 * @version 1.1.0
 * @author Leonardo Quevedo
 * @description User controller.
 */

const onBluetoothStateChange = onChange => {
  if (window.cordova && window.cordova.plugins) {
    const { diagnostic } = window.cordova.plugins
    diagnostic.registerBluetoothStateChangeHandler(onChange)
  }
}

const checkBluetoothState = () =>
  new Promise(resolve => {
    if (window.cordova && window.cordova.plugins) {
      const { diagnostic } = window.cordova.plugins
      diagnostic.isBluetoothEnabled(
        enabled => {
          console.log(`Bluetooth is ${enabled ? 'enabled' : 'disabled'}.`)
          resolve(enabled)
        },
        error => {
          console.log(error)
          resolve(false)
        }
      )
    } else {
      resolve(false)
    }
  })

const isBluetoothEnabledState = state => {
  if (window.cordova && window.cordova.plugins) {
    const { diagnostic } = window.cordova.plugins
    return state === diagnostic.bluetoothState.POWERED_ON
  }
  return false
}

const onGpsStateChange = onChange => {
  if (window.cordova && window.cordova.plugins) {
    const { diagnostic } = window.cordova.plugins
    diagnostic.registerLocationStateChangeHandler(onChange)
  }
}

const checkGpsState = () =>
  new Promise(resolve => {
    if (window.cordova && window.cordova.plugins) {
      const { diagnostic } = window.cordova.plugins
      diagnostic.isLocationEnabled(
        enabled => {
          resolve(enabled)
        },
        error => {
          console.log(error)
          resolve(false)
        }
      )
    } else {
      resolve(false)
    }
  })

const isGpsEnabledState = state => {
  if (window.cordova && window.cordova.plugins) {
    const { diagnostic } = window.cordova.plugins
    return state === diagnostic.locationState.POWERED_ON
  }
  return false
}

export default {
  onBluetoothStateChange,
  checkBluetoothState,
  isBluetoothEnabledState,
  onGpsStateChange,
  checkGpsState,
  isGpsEnabledState
}
