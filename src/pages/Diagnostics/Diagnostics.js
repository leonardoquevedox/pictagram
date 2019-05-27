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
import moment from 'moment-mini'

import Navbar from '../../components/Navbar'

import logo from '../../assets/vectors/logo.svg'
import bell from '../../assets/vectors/bell-icon.svg'

import './Diagnostics.scss'
import geolocation from '../../services/geolocation'

class Diagnostics extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.getLocations()
  }

  getLocations() {
    this.setState({ locations: geolocation.getLocalStorageList() })
  }

  canGoBack() {
    const { f7router } = this.props
    const { history } = f7router
    return history.length > 0
  }

  render() {
    const pageTitle = 'Argo Instant: Utilização'
    const { locations } = this.state
    return (
      <Page className="diagnostics-page">
        <Helmet title={pageTitle} />
        <Navbar className="home-page__navbar">
          <div className="app-navbar__left">
            <img src={logo} alt="Instant" />
          </div>
          <div className="app-navbar__center app-navbar__title" />
          <div className="app-navbar__right">
            <img src={bell} alt="Notificações" />
          </div>
        </Navbar>
        <div className="diagnostics-page__content">
          <div className="diagnostics-page__geolocation-list">
            {locations &&
              locations.map(
                location =>
                  location &&
                  location.vehicleName && (
                    <div className="diagnostics-page__item" key={location.timestamp}>
                      <div className="diagnostics-page__item__left">
                        <div className="diagnostics-page__item__title">{location.device}</div>
                        <div className="diagnostics-page__item__description">
                          {location.vehicle}
                        </div>
                      </div>
                      <div className="diagnostics-page__item__right">
                        <div className="diagnostics-page__item__time">
                          {moment(location.timestamp).format('DD/MM/YY - hh:mm:ss')}
                        </div>
                      </div>
                    </div>
                  )
              )}
          </div>
        </div>
      </Page>
    )
  }
}

const mapStateToProps = state => ({
  locations: state.user.profile.utilizations
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Diagnostics)
