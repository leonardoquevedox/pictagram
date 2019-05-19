/**
 * @license MIT
 * @version 1.1.0
 * @author Leonardo Quevedo
 * @description User information page.
 */

import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Page } from 'framework7-react'

import bell from '../../../../assets/vectors/bell-icon.svg'

import Navbar from '../../../../components/Navbar'

import {
  checkGpsState,
  watchGpsStateChanges
} from '../../../../actions/hardware'

import './Home.scss'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {}

  componentDidMount() {}

  initHardwareIndicators() {
    this.props.checkBluetoothState()
    this.props.watchBluetoothStateChanges()
    this.props.checkGpsState()
    this.props.watchGpsStateChanges()
  }

  canGoBack() {
    const { f7router } = this.props
    const { history } = f7router
    return history.length > 0
  }

  render() {
    const pageTitle = 'Frete Fácil: Home'
    return (
      <Page className="home-page">
        <Helmet title={pageTitle} />
        <Navbar className="home-page__navbar">
          <div className="app-navbar__left" />
          <div className="app-navbar__center" />
          <div className="app-navbar__right">
            <img src={bell} alt="Notificações" />
          </div>
        </Navbar>
        <div className="home-page__content" />
      </Page>
    )
  }
}

const mapStateToProps = state => ({
  gps: state.hardware.gps
})

const mapDispatchToProps = dispatch => ({
  checkGpsState: dispatch(checkGpsState()),
  watchGpsStateChanges: dispatch(watchGpsStateChanges())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
