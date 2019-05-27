/**
 * @license MIT
 * @version 1.1.0
 * @author Trinca
 * @description User controller.
 */

import { advertising } from 'ble-utils'

import { INSTANT_BEACON_VENDOR_ID } from '../config/consts'

const checkPermission = () =>
  new Promise((resolve, reject) => {
    const { permissions } = window.cordova.plugins
    if (!permissions) return resolve()
    permissions.requestPermissions(
      [permissions.ACCESS_COARSE_LOCATION],
      status => {
        if (status.hasPermission) resolve()
        else reject()
      },
      () => {
        reject()
      }
    )
  })

const isInstant = device =>
  (device.id && device.id.indexOf(INSTANT_BEACON_VENDOR_ID) > -1) ||
  (device.advertising &&
    device.advertising[1] &&
    device.advertising[1].data &&
    device.advertising[1].data.indexOf('AT Beacon') > -1)

const parseDevice = device => {
  if (device.advertising) device.advertising = advertising.parse(device.advertising)
  return device
}

const startScan = callback => {
  const { ble } = window
  if (ble) {
    try {
      checkPermission()
    } catch (e) {
      console.log(e)
    }
    ble.startScan(
      [],
      device => {
        const parsed = parseDevice(device)
        if (isInstant(parsed)) {
          parsed.name = 'Argo Instant'
        }
        if (device.name) callback(parsed)
      },
      e => {
        console.log(e)
      }
    )
  } else {
    callback({
      name: 'Argo Instant',
      id: 'E0:18:9F:0B:5F:AC',
      rssi: -79
    })
  }
}

const stopScan = () => {
  const { ble } = window
  if (ble) ble.stopScan()
}

export default { startScan, stopScan, isInstant }
