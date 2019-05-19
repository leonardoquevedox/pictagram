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

import Navbar from '../../../../components/Navbar'
import bell from '../../../../assets/vectors/bell-icon.svg'

import './RidesList.scss'

class RidesList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  canGoBack() {
    const { f7router } = this.props
    const { history } = f7router
    return history.length > 0
  }

  render() {
    const pageTitle = 'Frete Fácil: Apólice'
    return (
      <Page className="rides-list-page">
        <Helmet title={pageTitle} />
        <Navbar className="home-page__navbar">
          <div className="app-navbar__left" />
          <div className="app-navbar__center  app-navbar__title">Apólice</div>
          <div className="app-navbar__right">
            <img src={bell} alt="Notificações" />
          </div>
        </Navbar>
        <div className="rides-list-page__content" />
      </Page>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RidesList)
