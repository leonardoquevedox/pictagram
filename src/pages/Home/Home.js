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
    const pageTitle = 'Pictagram'
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
        <div className="home-page__content" />
      </Page>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
