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

import Navbar from '../../components/Navbar'
import logo from '../../assets/vectors/logo.svg'

import phone from '../../assets/vectors/phone.svg'

import './Contact.scss'

class Contact extends React.Component {
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
    const pageTitle = 'Argo Instant: Contato'
    return (
      <Page className="contact-page">
        <Helmet title={pageTitle} />
        <Navbar className="home-page__navbar">
          <div className="app-navbar__left">
            <img src={logo} alt="Instant" />
          </div>
          <div className="app-navbar__center  app-navbar__title" />
          <div className="app-navbar__right" />
        </Navbar>
        <div className="contact-page__content">
          <div className="contact-page__phones__list">
            <div className="contact-page__phone__item">
              <div className="contact-page__phone__title">Sinistro</div>
              <div className="contact-page__phone__description">
                Contato para notificação de sinistro.
              </div>
              <div className="contact-page__phone__link">
                <img className="contact-page__phone__icon" src={phone} alt="" /> (88) 8888-8888
              </div>
            </div>
          </div>
        </div>
      </Page>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Contact)
