/**
 * @license MIT
 * @version 1.1.0
 * @author Trinca
 * @description User information page.
 */

import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Page } from 'framework7-react'

import logo from '../../assets/vectors/logo.svg'

import Navbar from '../../components/Navbar'
import InsuranceToggle from '../../components/InsuranceToggle'
import HardwareIndicator from '../../components/HardwareIndicator'
import UtilizationCard from '../../components/UtilizationCard'
import AvailableCreditsCard from '../../components/AvailableCreditsCard'

import { readCredit } from '../../actions/credit'
import { checkDeviceProximity, watchDeviceProximity } from '../../actions/device'
import {
  checkBluetoothState,
  checkGpsState,
  watchBluetoothStateChanges,
  watchGpsStateChanges
} from '../../actions/hardware'

import './Home.scss'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    this.props.readCredit()
  }

  componentDidMount() {}

  initHardwareIndicators() {
    this.props.checkBluetoothState()
    this.props.watchBluetoothStateChanges()
    this.props.checkGpsState()
    this.props.watchGpsStateChanges()
    this.props.checkDeviceProximity.then(() => {
      this.props.watchDeviceProximity()
    })
  }

  canGoBack() {
    const { f7router } = this.props
    const { history } = f7router
    return history.length > 0
  }

  render() {
    const { device, bluetooth, gps, user } = this.props
    const pageTitle = 'Argo Instant: Home'
    return (
      <Page className="home-page">
        <Helmet title={pageTitle} />
        <Navbar className="home-page__navbar">
          <div className="app-navbar__left">
            <img src={logo} alt="Instant" />
          </div>
          <div className="app-navbar__center" />
          <div className="app-navbar__right" />
        </Navbar>
        <div className="home-page__content">
          <div className="home-page__toggle-container">
            <InsuranceToggle isActive={false} />
          </div>
          <div className="home-page__indicators-container">
            <HardwareIndicator
              label="Bluetooth"
              active={bluetooth && bluetooth.isEnabled ? 1 : 0}
            />
            <HardwareIndicator label="GPS" active={gps && gps.isEnabled ? 1 : 0} />
            <HardwareIndicator label="Device" active={device && device.isNearby ? 1 : 0} />
          </div>
          <div className="home-page__cards-container">
            <AvailableCreditsCard
              value={this.props.credit.quantity}
              onClick={() => this.$f7router.navigate({ name: 'Credits' })}
            />
            <UtilizationCard
              value={user && user.utilizations ? user.utilizations.length : ''}
              onClick={() => this.$f7router.navigate({ name: 'Utilization' })}
            />
          </div>
        </div>
      </Page>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.profile,
  device: state.device,
  bluetooth: state.hardware.bluetooth,
  gps: state.hardware.gps,
  credit: state.credit.current
})

const mapDispatchToProps = dispatch => ({
  checkBluetoothState: dispatch(checkBluetoothState()),
  watchBluetoothStateChanges: dispatch(watchBluetoothStateChanges()),
  checkGpsState: dispatch(checkGpsState()),
  watchGpsStateChanges: dispatch(watchGpsStateChanges()),
  checkDeviceProximity: dispatch(checkDeviceProximity()),
  watchDeviceProximity: dispatch(watchDeviceProximity()),
  readCredit: () => dispatch(readCredit())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
