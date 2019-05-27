/**
 * @license MIT
 * @version 1.1.0
 * @author Trinca
 * @description User controller.
 */

import React from 'react'
import { connect } from 'react-redux'
import { F7App, View } from 'framework7-react'

import authService from '../../services/auth'
import insuranceService from '../../services/insurance'

import {
  checkBluetoothState,
  checkGpsState,
  watchBluetoothStateChanges,
  watchGpsStateChanges,
  enableBluetooth
} from '../../actions/hardware'

import { watchKeyboardVisibility } from '../../actions/virtualKeyboard'
import { readProfile } from '../../actions/user'
import { setUserDevices } from '../../actions/device'
import routes from '../../config/routes'

const isMobile = window.cordova

const f7params = {
  name: 'Argo Instant',
  id: 'com.argo.instant',
  touch: { fastClicks: true },
  routes
}

class MobileMain extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.fetchProfile()
    insuranceService.initialize()
    if (isMobile) {
      document.addEventListener('deviceready', () => {
        this.configHardware()
        this.configVirtualKeyboard()
      })
    }
  }

  configVirtualKeyboard() {
    this.props.watchVirtualKeyboard()
  }

  configHardware() {
    try {
      this.props.checkBluetoothState()
      this.props.watchBluetoothStateChanges()
      this.props.checkGpsState()
      this.props.watchGpsStateChanges()
    } catch (e) {
      console.log(e)
    }
  }

  fetchProfile() {
    if (authService.isLoggedIn()) {
      this.props.readUserProfile().then(user => {
        if (user.devices) this.props.setUserDevices(user.devices)
      })
    }
  }

  render() {
    const { isKeyboardUp } = this.props
    return (
      <F7App
        params={f7params}
        colorTheme="blue"
        className={`${isKeyboardUp ? 'device-keyboard-visible' : ''}`}>
        <View animate={false} main pushState pushStateSeparator="" />
      </F7App>
    )
  }
}

const mapStateToProps = state => ({
  isKeyboardUp: state.keyboard.isVisible,
  bluetooth: state.hardware.bluetooth,
  gps: state.hardware.gps
})

const mapDispatchToProps = dispatch => ({
  readUserProfile: () => dispatch(readProfile()),
  setUserDevices: devices => dispatch(setUserDevices(devices)),
  enableBluetooth: () => dispatch(enableBluetooth()),
  checkBluetoothState: () => dispatch(checkBluetoothState()),
  watchBluetoothStateChanges: () => dispatch(watchBluetoothStateChanges()),
  checkGpsState: () => dispatch(checkGpsState()),
  watchGpsStateChanges: () => dispatch(watchGpsStateChanges()),
  watchVirtualKeyboard: () => dispatch(watchKeyboardVisibility())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MobileMain)
